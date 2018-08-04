"use strict";

function isfullscreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        return false;
    }

    return true;
}

function fullscreen() {
    var canvas = document.getElementById('canvas');

    if (!isfullscreen()) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

var Engine = {};

Engine.new = function(descriptor, click) {
    // Default NES resolution
    if (descriptor.width == undefined)
      descriptor.width = 256;

    if (descriptor.height == undefined)
      descriptor.height = 240;

    var handle = {
        canvas: document.getElementById(descriptor.canvasId),
        reference_width: descriptor.width,
        reference_height: descriptor.height,
        allow_rotate: false,
        rotate: false
    };

    handle.audio = WebAudio.new();

    if (!handle.audio) {
        console.log('Failed to initialize WebAudio.');

        return {
            error: 'Could not initialize WebAudio.'
        };
    }

    handle.graphics = Canvas2D.new(handle.canvas, handle.reference_width, handle.reference_height, click);

    if (!handle.graphics) {
        console.log('Failed to load Canvas2D.');

        return {
            error: 'Could not load Canvas2D graphics.'
        };
    }

    handle.clear = function(r, g, b) {
        handle.graphics.clear(r, g, b);
    };

    handle.load_font = function(descriptor, onload, onfailure) {
        var imageSrc = new Image();
        imageSrc.src = descriptor.url;

        var font = {
            imageSrc: imageSrc,
            frame_count: descriptor.frame_count,
            frame_current: 0,
            frame_width: 0,
            frame_height: 0,
            variant_count: descriptor.variant_count,
            variant_current: 0,
            render: function() {},
            variant: function(v) {
                font.variant_current = v;
            }
        };

        imageSrc.onload = function() {
            font.frame_width = imageSrc.width / font.frame_count;
            font.frame_height = imageSrc.height / font.variant_count;

            font.render = function(text, x, y) {
                var current_x = x;

                for (var i = 0, len = text.length; i < len; i++) {
                    if (text.charCodeAt(i) === 10) { // newline
                        y += font.frame_height + 2;
                        current_x = x;
                    } else {
                        font.frame_current = text.charCodeAt(i) - 32; // space = 32
                        handle.graphics.render(font, current_x, y);
                        current_x += font.frame_width;
                    }
                }
            };

            onload(descriptor.url);
        };

        imageSrc.onerror = function() {
            onfailure();
        };

        return font;
    };

    handle.load_image = function(descriptor, onload, onfailure) {
        var imageSrc = new Image();
        imageSrc.src = descriptor.url;

        var sprite = {
            imageSrc: imageSrc,
            frame_current: 0,
            frame_count: descriptor.frame_count,
            frame_width: 0,
            frame_height: 0,
            variant_count: 1, // TODO: We leave one variant for images for now
            variant_current: 0,
            x: descriptor.x,
            y: descriptor.y,
            render: function() {},
            move: function() {}
        };

        imageSrc.onload = function() {
            sprite.frame_width = imageSrc.width / sprite.frame_count;
            sprite.frame_height = imageSrc.height / sprite.variant_count;

            sprite.render = function(frame) {
                sprite.frame_current = frame;
                handle.graphics.render(sprite, sprite.x, sprite.y);
            };

            sprite.move = function(dx, dy) {
                sprite.x += dx;
                sprite.y += dy;
            };

            onload(descriptor.url);
        };

        imageSrc.onerror = function() {
            onfailure();
        };

        return sprite;
    };

    handle.rect = function(x, y, w, h, r, g, b) {
        handle.graphics.rect(x, y, w, h, r, g, b);
    };

    handle.load_sound = function(descriptor, onload, onfailure) {
        handle.audio.load(descriptor, onload, onfailure);
    };

    handle.play = function(descriptor) {
        handle.audio.play(descriptor);
    };

    handle.stop = function(descriptor) {
        handle.audio.stop(descriptor);
    };

    handle.get_coordinate = function(x, y, w, h) {
      return handle.graphics.get_coordinate(x, y, w, h);
    };

    function get_zoom(width, height, reference_width, reference_height)
    {
        var zoom_x = width / reference_width;
        var zoom_y = height / reference_height;
        var zoom = zoom_x;

        if (zoom_y < zoom)
            zoom = zoom_y;

        return zoom;
    }

    handle.resize = function(width, height) {
        var rotate = false;
        var zoom;

        var zoom_h = get_zoom(width, height, handle.reference_width, handle.reference_height);
        var zoom_v = get_zoom(width, height, handle.reference_height, handle.reference_width);

        if (zoom_v > zoom_h)
        {
            if (handle.allow_rotate)
              rotate = true;

            zoom = Math.floor(zoom_v);
        }
        else
        {
            zoom = Math.floor(zoom_h);
        }

        if (zoom < 1)
          zoom = 1;

        var borderx, bordery, ajustementx, ajustementy;

        if (rotate) {
          borderx = Math.floor((width - handle.reference_height * zoom) / 2);
          bordery = Math.floor((height - handle.reference_width * zoom) / 2);
          ajustementx = Math.floor(width - handle.reference_height * zoom - borderx * 2);
          ajustementy = Math.floor(height - handle.reference_width * zoom - bordery * 2);
        } else {
          borderx = Math.floor((width - handle.reference_width * zoom) / 2);
          bordery = Math.floor((height - handle.reference_height * zoom) / 2);
          ajustementx = Math.floor(width - handle.reference_width * zoom - borderx * 2);
          ajustementy = Math.floor(height - handle.reference_height * zoom - bordery * 2);
        }

        handle.rotate = rotate;
        handle.canvas.width = width;
        handle.canvas.height = height;
        handle.graphics.resize(zoom, rotate, borderx + ajustementx, borderx, bordery + ajustementy, bordery, width, height);
    };

    return {
        handle: handle,
        error: undefined
    }
};
