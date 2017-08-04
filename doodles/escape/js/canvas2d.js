"use strict";

var Canvas2D = {};

Canvas2D.new = function(canvas, reference_width, reference_height) {
	var handle = {
		ctx: canvas.getContext('2d'),
        scaleFactor: 1,
        margin_left: 0,
        margin_right: 0,
        margin_top: 0,
        margin_bottom: 0,
        window_width: 0,
        window_height: 0,
        reference_width: reference_width,
        reference_height: reference_height
	};

    canvas.addEventListener('click', function(event) { 
        var x = (event.pageX - handle.margin_left) / handle.scaleFactor;
        var y = (event.pageY - handle.margin_top) / handle.scaleFactor;

        if (x >= handle.reference_width - 16 && x <= handle.reference_width
         && y >= handle.reference_height - 16 && y <= handle.reference_height) {
            fullscreen();
        }
    }, false);

    handle.resize = function(scaleFactor, margin_left, margin_right, margin_top, margin_bottom, window_width, window_height) {
        handle.scaleFactor = scaleFactor;
        handle.margin_left = margin_left;
        handle.margin_right = margin_right;
        handle.margin_top = margin_top;
        handle.margin_bottom = margin_bottom;
        handle.window_width = window_width;
        handle.window_height = window_height;

        // This needs to be done at each resizing!
        handle.ctx.imageSmoothingEnabled       = false;
        handle.ctx.webkitImageSmoothingEnabled = false;
        handle.ctx.mozImageSmoothingEnabled    = false;
        handle.ctx.msImageSmoothingEnabled     = false;
        handle.ctx.oImageSmoothingEnabled      = false;
    };

    handle.render = function(sprite, x, y) {
        var sx = sprite.frame_width * sprite.frame_current;
        var w1 = sprite.frame_width;
        var w2 = sprite.frame_height;

        var cutLeft = 0;
        var cutRight = 0;
        var cutTop = 0;
        var cutBottom = 0;

        if (x < 0) {
            cutLeft = -x;
        }

        if (y < 0) {
            cutTop = -y;
        }

        if (x + w1 > handle.reference_width) {
            cutRight = x + w1 - handle.reference_width;
        }

        if (y + w2 > handle.reference_height) {
            cutBottom = y + w2 - handle.reference_height;
        }

        if (cutLeft <= w1
        && cutRight <= w1
        && cutTop <= w2
        && cutBottom <= w2){
            handle.ctx.drawImage(
                sprite.imageSrc, sx + cutLeft, cutTop, sprite.frame_width - cutLeft - cutRight, sprite.frame_height - cutTop - cutBottom, 
                (x + cutLeft) * handle.scaleFactor + handle.margin_left, (y + cutTop) * handle.scaleFactor + handle.margin_top, (w1 - cutLeft - cutRight) * handle.scaleFactor, (w2 - cutTop - cutBottom) * handle.scaleFactor);            
        }
	};

    handle.clear = function(r, g, b) {
        handle.ctx.fillStyle = 'rgba(0, 0, 0, 1)';

        // Left band
    	handle.ctx.fillRect(0, 0, handle.margin_left, handle.window_height);
        // Top band
        handle.ctx.fillRect(handle.margin_left, 0, handle.window_width - handle.margin_right - handle.margin_left, handle.margin_top);
        // Right band
        handle.ctx.fillRect(handle.window_width - handle.margin_right, 0, handle.margin_right, handle.window_height);
        // Bottom band
        handle.ctx.fillRect(handle.margin_left, handle.window_height - handle.margin_bottom, handle.window_width - handle.margin_right - handle.margin_left, handle.margin_bottom);

        handle.ctx.fillStyle = 'rgba(' + (r * 255) + ',' + (g * 255) + ',' + (b * 255) + ', 1)';
        handle.ctx.fillRect(handle.margin_left, handle.margin_top, handle.window_width - handle.margin_left - handle.margin_right, handle.window_height - handle.margin_bottom - handle.margin_top);
    };

    return handle;
};