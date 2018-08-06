"use strict";

function isfullscreen()
{
    return document.fullscreenElement || document.mozFullScreenElement ||document.webkitFullscreenElement;
}

function fullscreen()
{
    const canvas = document.getElementById('canvas');

    if (!isfullscreen())
    {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
    else
    {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

let Engine = {};

Engine.new = function(descriptor, click)
{
    // Default NES resolution
    if (descriptor.width === undefined)
      descriptor.width = 256;

    if (descriptor.height === undefined)
      descriptor.height = 240;

    let handle = {
        canvas: document.getElementById(descriptor.canvasId),
        reference_width: descriptor.width,
        reference_height: descriptor.height,
        allow_rotate: false,
        rotate: false
    };

    handle.canvas.focus();
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

    handle.load_image = function(descriptor, onload, onfailure) {
        let imageSrc = new Image();
        imageSrc.src = descriptor.url;

        let sprite = {
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

    handle.clear = handle.graphics.clear;
    handle.rect = handle.graphics.rect;
    handle.text = handle.graphics.text;
    handle.load_sound = handle.audio.load;
    handle.play = handle.audio.play;
    handle.stop = handle.audio.stop;

    function get_zoom(width, height, reference_width, reference_height)
    {
        let zoom_x = width / reference_width;
        let zoom_y = height / reference_height;
        let zoom = zoom_x;

        if (zoom_y < zoom)
            zoom = zoom_y;

        return zoom;
    }

    handle.resize = function(width, height)
    {
        let zoom;

        let zoom_h = get_zoom(width, height, handle.reference_width, handle.reference_height);
        let zoom_v = get_zoom(width, height, handle.reference_height, handle.reference_width);

        if (zoom_v > zoom_h)
            zoom = Math.floor(zoom_v);
        else
            zoom = Math.floor(zoom_h);

        if (zoom < 1)
          zoom = 1;

        let borderx = Math.floor((width - handle.reference_width * zoom) / 2),
            bordery = Math.floor((height - handle.reference_height * zoom) / 2),
            ajustementx = Math.floor(width - handle.reference_width * zoom - borderx * 2),
            ajustementy = Math.floor(height - handle.reference_height * zoom - bordery * 2);

        handle.canvas.width = width;
        handle.canvas.height = height;
        handle.graphics.resize(zoom, borderx + ajustementx, borderx, bordery + ajustementy, bordery, width, height);
    };

    return {
        handle: handle,
        error: undefined
    }
};
