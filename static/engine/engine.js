"use strict";

function fullscreen() {
    var canvas = document.getElementById('canvas');

    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
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

Engine.new = function(descriptor) {
    var handle = {
        canvas: document.getElementById(descriptor.canvasId),
        reference_width: 256,
        reference_height: 240 // NES resolution
    };

    handle.audio = WebAudio.new();

    if (!handle.audio) {
        console.log('Failed to initialize WebAudio.');

        return {
            error: 'Could not initialize WebAudio.'
        };
    }

    handle.graphics = Canvas2D.new(handle.canvas, handle.reference_width, handle.reference_height);

    if (!handle.graphics) {
        console.log('Failed to load Canvas2D.');

        return {
            error: 'Could not load Canvas2D graphics.'
        };
    }

    handle.sprites = [];
    handle.world = new p2.World({ gravity: [0, 0] });

    // This allows to only detect collisions from the top
    handle.world.on('beginContact', function(event) {
/*        var b1 = event.bodyA;
        var b2 = event.bodyB;

        var s1 = b1.sprite;
        var s2 = b2.sprite;

        if (b1.position[1] - s1.frame_height <= b2.position[1] - s2.frame_height) {
            s1.can_jump = true;
        }

        if (b2.position[1] - s2.frame_height <= b1.position[1] - s1.frame_height) {
            s2.can_jump = true;
        }*/
    });

    // This prevents from jumping after we have fallen in a pit
    handle.world.on('endContact', function(event) {
        if (event.bodyA.type === p2.Body.STATIC) {
//            event.bodyB.sprite.can_jump = false;
        }

        if (event.bodyB.type === p2.Body.STATIC) {
  //          event.bodyA.sprite.can_jump = false;
        }
    });

    handle.clear = function(r, g, b) {
        handle.graphics.clear(r, g, b);
    };

    handle.load_font = function(descriptor) {
        var imageSrc = new Image();
        imageSrc.src = descriptor.url;

        var font = {
            imageSrc: imageSrc,
            frame_count: descriptor.frame_count,
            frame_current: 0,
            frame_width: 0,
            frame_height: 0,
            render: function() {}
        };

        imageSrc.onload = function() { 
            font.frame_width = imageSrc.width / font.frame_count;
            font.frame_height = imageSrc.height;

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
        };

        return font;
    };

    handle.load_image = function(descriptor) {
        var imageSrc = new Image();
        imageSrc.src = descriptor.url;

        var sprite = {
            imageSrc: imageSrc,
            frame_current: 0,
            frame_count: descriptor.frame_count,
            frame_width: 0,
            frame_height: 0,
            x: descriptor.x,
            y: descriptor.y,
            render: function() {}
        };

        imageSrc.onload = function() { 
            sprite.frame_width = imageSrc.width / sprite.frame_count;
            sprite.frame_height = imageSrc.height;

            sprite.render = function(frame) {
                sprite.frame_current = frame;
                handle.graphics.render(sprite, sprite.x, sprite.y);
            };

            sprite.move = function(dx, dy) {
                sprite.x += dx;
                sprite.y += dy;
            }
        };

        return sprite;  
    };

    handle.load_model = function(descriptor) {
        var imageSrc = new Image();
        imageSrc.src = descriptor.url;

        var sprite = {
            imageSrc: imageSrc,
            frame_current: 0,
            frame_count: descriptor.frame_count,
            frame_timer: 0,
            frame_duration: descriptor.frame_duration,
            frame_width: 0,
            frame_height: 0,
            body: null,
            can_jump: false,
            move: function() {}
        };

        imageSrc.onload = function() { 
            sprite.frame_width = imageSrc.width / sprite.frame_count;
            sprite.frame_height = imageSrc.height;

            var x = descriptor.x + sprite.frame_width / 2;
            var y = descriptor.y + sprite.frame_height / 2;

            var shape = new p2.Box({ width: sprite.frame_width, height: sprite.frame_height });
            sprite.body = new p2.Body({ mass: descriptor.mass, position:[x, y], fixedRotation: true });
            sprite.body.damping = 0.95; // To decelerate / air friction
            sprite.body.sprite = sprite; // A helper to be able to find the sprite from the body.
            sprite.body.addShape(shape);
            handle.world.addBody(sprite.body);

            sprite.move = function(dx, dy, max) {
                var vx = sprite.body.velocity[0] + dx;
                var vy = sprite.body.velocity[1] + dy;

                vx = Math.max(-max, Math.min(vx, max));
                vy = Math.max(-max, Math.min(vy, max));

                sprite.body.velocity[0] = vx;
                sprite.body.velocity[1] = vy;
            };

             // TODO: REMOVE
             handle.sprites.push(sprite);
        };

        return sprite;  
    };

    handle.load_sound = function(descriptor) {
        handle.audio.load(descriptor);
    };

    handle.play = function(descriptor) {
        handle.audio.play(descriptor);
    };

    handle.stop = function(descriptor) {
        handle.audio.stop(descriptor);
    };

    handle.resize = function(width, height) {
        var zoom_x = width / handle.reference_width;
        var zoom_y = height / handle.reference_height;

        var zoom = zoom_x;

        if (zoom_y < zoom)
            zoom = zoom_y;

        if (zoom < 1)
            zoom = 1;

        zoom = Math.floor(zoom);

        var borderx = Math.floor((width - handle.reference_width * zoom) / 2);
        var bordery = Math.floor((height - handle.reference_height * zoom) / 2);
        var ajustementx = Math.floor(width - handle.reference_width * zoom - borderx * 2);
        var ajustementy = Math.floor(height - handle.reference_height * zoom - bordery * 2);

        var safety_margin = 6; // If we don't put this margin on the height of the canvas, we often get a scrollbar
        handle.canvas.width = width;
        handle.canvas.height = height - safety_margin;
        handle.graphics.resize(zoom, borderx + ajustementx, borderx, bordery + ajustementy, bordery, width, height);
    };

    // TODO: REMOVE
    handle.render = function() {
        handle.sprites.forEach(function(sprite) {
            var x = sprite.body.position[0] - sprite.frame_width / 2;
            var y = sprite.body.position[1] - sprite.frame_height / 2;

            handle.graphics.render(sprite, x, y);
        });
    };

    // TODO: REMOVE
    handle.step = function(dt) {
        handle.sprites.forEach(function(sprite) {
            sprite.frame_timer += dt;

            if (sprite.frame_timer >= sprite.frame_duration) {
                sprite.frame_current = (sprite.frame_current + 1) % sprite.frame_count;
                sprite.frame_timer -= sprite.frame_duration;
            }            
        });

        handle.world.step(dt);
    };

    return {
        handle: handle,
        error: undefined
    }
};


