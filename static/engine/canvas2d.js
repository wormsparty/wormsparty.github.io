"use strict";

let Canvas2D = {};

Canvas2D.new = function(canvas, reference_width, reference_height, click)
{
	let handle = {
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
        let x = (event.pageX - handle.margin_left) / handle.scaleFactor;
        let y = (event.pageY - handle.margin_top) / handle.scaleFactor;

        /*if (x >= handle.reference_width - 16 && x <= handle.reference_width
         && y >= handle.reference_height - 16 && y <= handle.reference_height) {
            fullscreen();
        }*/

        if (click != null)
            click(x, y);
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
        handle.ctx.msImageSmoothingEnabled     = false;
        handle.ctx.oImageSmoothingEnabled      = false;
    };

    handle.render = function(sprite, pos) {
        let sx = sprite.frame_width * sprite.frame_current;
        let sy = sprite.frame_height * sprite.variant_current;
        let w = sprite.frame_width;
        let h = sprite.frame_height;

        let cutLeft = 0;
        let cutRight = 0;
        let cutTop = 0;
        let cutBottom = 0;

        if (pos.x !== Math.floor(pos.x))
            console.error("x should be an integer! x=" + pos.x);

        if (pos.y !== Math.floor(pos.y))
            console.error("y should be an integer! y=" + pos.y);

        if (pos.x < 0)
            cutLeft = -pos.x;

        if (pos.y < 0)
            cutTop = -pos.y;

        if (pos.x + w > handle.reference_width)
            cutRight = pos.x + w - handle.reference_width;

        if (pos.y + h > handle.reference_height)
            cutBottom = pos.y + h - handle.reference_height;

        if (cutLeft < w
        && cutRight < w
        && cutTop < h
        && cutBottom < h)
        {
            let target_x = (pos.x + cutLeft) * handle.scaleFactor + handle.margin_left;
            let target_y = (pos.y + cutTop) * handle.scaleFactor + handle.margin_top;

            handle.ctx.drawImage(
                sprite.imageSrc,
                sx + cutLeft,
                sy + cutTop,
                sprite.frame_width - cutLeft - cutRight,
                sprite.frame_height - cutTop - cutBottom,
                target_x,
                target_y,
                (pos.w - cutLeft - cutRight) * handle.scaleFactor,
                (pos.h - cutTop - cutBottom) * handle.scaleFactor);
        }
    };

    handle.rect = function(pos, w, h, color) {
        handle.ctx.fillStyle = color;

        let x = pos.x;
        let y = pos.y;

        if (x < 0)
        {
            w += x;
            x = 0;
        }

        if (y < 0)
        {
            h += y;
            y = 0;
        }

        if (x >= handle.reference_width)
        {
            w -= x - handle.reference_width;
            x = handle.reference_width - 1;
        }

        if (y >= handle.reference_height)
        {
            h -= y - handle.reference_height;
            y = handle.reference_height - 1;
        }

        if (w <= 0 || h <= 0)
            return;

        handle.ctx.fillRect(
            handle.margin_left + x * handle.scaleFactor,
            handle.margin_top + y * handle.scaleFactor,
            w * handle.scaleFactor,
            h * handle.scaleFactor);
    };

    handle.text = function(str, pos, s, color)
    {
        handle.ctx.fillStyle = color;
        handle.ctx.font = s + 'px Inconsolata, monospace';

        // TODO: Don't draw text outside
        let x = pos.x;
        let y = pos.y + s - 2;

        handle.ctx.save();
        handle.ctx.translate(handle.margin_left, handle.margin_top);
        handle.ctx.scale(handle.scaleFactor, handle.scaleFactor);

        handle.ctx.fillText(str, x, y);
        handle.ctx.restore();
    };

    handle.clear = function(color) {
        handle.ctx.fillStyle = 'rgba(5, 5, 5, 1)';
        //handle.ctx.fillRect(0, 0, handle.window_width, handle.window_height);

        // Left band
        //handle.ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        handle.ctx.fillRect(0, 0, handle.margin_left, handle.window_height);
        // Top band
        //handle.ctx.fillStyle = 'rgba(255, 255, 0, 1)';
        handle.ctx.fillRect(handle.margin_left, 0, handle.window_width - handle.margin_right - handle.margin_left, handle.margin_top);
        // Right band
        //handle.ctx.fillStyle = 'rgba(255, 0, 255, 1)';
        handle.ctx.fillRect(handle.window_width - handle.margin_right, 0, handle.margin_right, handle.window_height);
        // Bottom band
        //handle.ctx.fillStyle = 'rgba(0, 255, 255, 1)';
        handle.ctx.fillRect(handle.margin_left, handle.window_height - handle.margin_bottom, handle.window_width - handle.margin_right - handle.margin_left, handle.margin_bottom);

        handle.ctx.fillStyle = color;
        handle.ctx.fillRect(handle.margin_left, handle.margin_top, handle.window_width - handle.margin_left - handle.margin_right, handle.window_height - handle.margin_bottom - handle.margin_top);
    };

    handle.get_char_width = function() {
        return 8;//handle.ctx.measureText('\t').width;
    };

    return handle;
};
