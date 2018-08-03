"use strict";

var Canvas2D = {};

Canvas2D.new = function(canvas, reference_width, reference_height, click) {
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

        /*if (x >= handle.reference_width - 16 && x <= handle.reference_width
         && y >= handle.reference_height - 16 && y <= handle.reference_height) {
            fullscreen();
        }*/

        if (click != null)
					click(x, y);
    }, false);

    handle.resize = function(scaleFactor, rotate, margin_left, margin_right, margin_top, margin_bottom, window_width, window_height) {
        handle.scaleFactor = scaleFactor;
        handle.margin_left = margin_left;
        handle.margin_right = margin_right;
        handle.margin_top = margin_top;
        handle.margin_bottom = margin_bottom;
        handle.window_width = window_width;
        handle.window_height = window_height;
        handle.rotate = rotate;

        // This needs to be done at each resizing!
        handle.ctx.imageSmoothingEnabled       = false;
        handle.ctx.webkitImageSmoothingEnabled = false;
        handle.ctx.msImageSmoothingEnabled     = false;
        handle.ctx.oImageSmoothingEnabled      = false;
    };

    handle.get_coordinate = function(x, y, w, h) {
        if (!handle.rotate) {
            return {
                x: x,
                y: y,
                w: w,
                h: h
            };
        }

        let nx = x - handle.reference_width / 2;

        return {
						x: y,
						y: x - 2 * nx + w,
            w: h,
            h: w
        };
    }

    handle.render = function(sprite, x, y) {
        var sx = sprite.frame_width * sprite.frame_current;
        var sy = sprite.frame_height * sprite.variant_current;
        var w1 = sprite.frame_width;
        var w2 = sprite.frame_height;

        var cutLeft = 0;
        var cutRight = 0;
        var cutTop = 0;
        var cutBottom = 0;

        if (x !== Math.floor(x))
            console.error("x should be an integer! x=" + x);

        if (y !== Math.floor(y))
            console.error("y should be an integer! y=" + y);

        if (x < 0)
            cutLeft = -x;

        if (y < 0)
            cutTop = -y;

        if (x + w1 > handle.reference_width)
            cutRight = x + w1 - handle.reference_width;

        if (y + w2 > handle.reference_height)
            cutBottom = y + w2 - handle.reference_height;

        if (cutLeft < w1
        && cutRight < w1
        && cutTop < w2
        && cutBottom < w2) {
            handle.ctx.drawImage(
                sprite.imageSrc, sx + cutLeft, sy + cutTop, sprite.frame_width - cutLeft - cutRight, sprite.frame_height - cutTop - cutBottom,
                (x + cutLeft) * handle.scaleFactor + handle.margin_left, (y + cutTop) * handle.scaleFactor + handle.margin_top, (w1 - cutLeft - cutRight) * handle.scaleFactor, (w2 - cutTop - cutBottom) * handle.scaleFactor);
        }
    };

    handle.rect = function(x, y, w, h, r, g, b) {
        handle.ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ', 1)';
				let coord = handle.get_coordinate(x, y, w, h);

				coord.x = handle.margin_left + coord.x * handle.scaleFactor;
				coord.y = handle.margin_top + coord.y * handle.scaleFactor;
				coord.w = coord.w * handle.scaleFactor;
				coord.h = coord.h * handle.scaleFactor;

				// TODO: Handle out-of-frame case
				handle.ctx.fillRect(coord.x, coord.y, coord.w, coord.h);
    };

    handle.clear = function(r, g, b) {
        handle.ctx.fillStyle = 'rgba(255, 0, 0, 1)';
				//handle.ctx.fillRect(0, 0, handle.window_width, handle.window_height);

        // Left band
				handle.ctx.fillStyle = 'rgba(255, 0, 0, 1)';
				handle.ctx.fillRect(0, 0, handle.margin_left, handle.window_height);
        // Top band
				handle.ctx.fillStyle = 'rgba(255, 255, 0, 1)';
				handle.ctx.fillRect(handle.margin_left, 0, handle.window_width - handle.margin_right - handle.margin_left, handle.margin_top);
        // Right band
				handle.ctx.fillStyle = 'rgba(255, 0, 255, 1)';
        handle.ctx.fillRect(handle.window_width - handle.margin_right, 0, handle.margin_right, handle.window_height, 255, 0, 255);
        // Bottom band
				handle.ctx.fillStyle = 'rgba(0, 255, 255, 1)';
        handle.ctx.fillRect(handle.margin_left, handle.window_height - handle.margin_bottom, handle.window_width - handle.margin_right - handle.margin_left, handle.margin_bottom);

				handle.ctx.fillStyle = 'rgba(' + r + ', ' + g + 50 + ', ' + b + ', 1)';
				handle.ctx.fillRect(handle.margin_left, handle.margin_top, handle.window_width - handle.margin_left - handle.margin_right, handle.window_height - handle.margin_bottom - handle.margin_top);
    };

    return handle;
};
