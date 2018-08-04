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
    };

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

				let coord = handle.get_coordinate(x, y, w1, w2);

				if (handle.rotate) {
					coord.y += 2 * coord.h;					
				}

/*        if (coord.x < 0)
            cutLeft = -coord.x;

        if (coord.y < 0)
            cutTop = -coord.y;

        if (coord.x + coord.w > handle.reference_width)
            cutRight = coord.x + coord.w - handle.reference_width;

        if (coord.y + coord.h > handle.reference_height)
            cutBottom = coord.y + coord.h - handle.reference_height;*/

        if (cutLeft < coord.w
        && cutRight < coord.w
        && cutTop < coord.h
        && cutBottom < coord.h)
				{
					  let target_x = (coord.x + cutLeft) * handle.scaleFactor + handle.margin_left;
						let target_y = (coord.y + cutTop) * handle.scaleFactor + handle.margin_top;

						if (handle.rotate) {
							handle.ctx.save();
							handle.ctx.translate(target_x, target_y)
							handle.ctx.rotate(-Math.PI / 2);
							handle.ctx.translate(-target_x, -target_y)
						}

            handle.ctx.drawImage(
                sprite.imageSrc,
								sx + cutLeft,
								sy + cutTop,
								sprite.frame_width - cutLeft - cutRight,
								sprite.frame_height - cutTop - cutBottom,
                                target_x,
								target_y,
								(coord.w - cutLeft - cutRight) * handle.scaleFactor,
								(coord.h - cutTop - cutBottom) * handle.scaleFactor);

						if (handle.rotate) {
							handle.ctx.restore();
						}
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

    handle.text = function(str, x, y, s, r, g, b) {
        handle.ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ', 1)';
        handle.ctx.font = (s * handle.scaleFactor) + 'px inconsola, monospace';

        let coord = handle.get_coordinate(x, y + s, 0, 0);

        coord.x = handle.margin_left + coord.x * handle.scaleFactor;
        coord.y = handle.margin_top + coord.y * handle.scaleFactor;
        coord.w = coord.w * handle.scaleFactor;
        coord.h = coord.h * handle.scaleFactor;

        handle.ctx.fillText(str, coord.x, coord.y);
    };

    handle.clear = function(r, g, b) {
        handle.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
				//handle.ctx.fillRect(0, 0, handle.window_width, handle.window_height);

        // Left band
				//handle.ctx.fillStyle = 'rgba(255, 0, 0, 1)';
				handle.ctx.fillRect(0, 0, handle.margin_left, handle.window_height);
        // Top band
				//handle.ctx.fillStyle = 'rgba(255, 255, 0, 1)';
				handle.ctx.fillRect(handle.margin_left, 0, handle.window_width - handle.margin_right - handle.margin_left, handle.margin_top);
        // Right band
				//handle.ctx.fillStyle = 'rgba(255, 0, 255, 1)';
        handle.ctx.fillRect(handle.window_width - handle.margin_right, 0, handle.margin_right, handle.window_height, 255, 0, 255);
        // Bottom band
				//handle.ctx.fillStyle = 'rgba(0, 255, 255, 1)';
        handle.ctx.fillRect(handle.margin_left, handle.window_height - handle.margin_bottom, handle.window_width - handle.margin_right - handle.margin_left, handle.margin_bottom);

				handle.ctx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', 1)';
				handle.ctx.fillRect(handle.margin_left, handle.margin_top, handle.window_width - handle.margin_left - handle.margin_right, handle.window_height - handle.margin_bottom - handle.margin_top);
    };

    return handle;
};
