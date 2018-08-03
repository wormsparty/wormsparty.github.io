"use strict";

let Labyrinth = {};

let world_map = [
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [ 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1 ],
    [ 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
    [ 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0 ,0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1 ],
    [ 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 1, 1 ,0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0 ,0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1 ],
    [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4 ,0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1 ],
    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ,0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1 ],
    [ 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
    [ 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0 ,0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1 ],
    [ 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1 ,0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0 ,0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1 ],
    [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4 ,0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1 ],
    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ,0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1 ],
    [ 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
    [ 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0 ,0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1 ],
    [ 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1 ,0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
];

let btn_up   =  [118, 207, 9, 10],
    btn_down =  [118, 217, 9, 10],
    btn_right = [128, 217, 9, 10],
    btn_left =  [108, 217, 9, 10];

function mark_map(handle, newpx, newpy)
{
    handle.map_visitations[newpy][newpx] = true;

    let depth_of_view = 2;

    for(let y = 1; y <= depth_of_view; y++)
    {
        if (newpy + y < world_map.length)
            handle.map_visitations[newpy+y][newpx] = true;

        if (newpy - y >= 0)
            handle.map_visitations[newpy-y][newpx] = true;
    }

    for(let x = 1; x <= depth_of_view; x++)
    {
      if (newpx + x < world_map[0].length)
          handle.map_visitations[newpy][newpx+x] = true;

      if (newpx - x >= 0)
          handle.map_visitations[newpy][newpx-x] = true;

      for(let y = 1; y <= depth_of_view; y++)
      {
        if (newpy + y < world_map.length)
        {
            if (newpx + x < world_map[0].length)
                handle.map_visitations[newpy+y][newpx+x] = true;

            if (newpx - x >= 0)
                handle.map_visitations[newpy+y][newpx-x] = true;
        }

        if (newpy - y >= 0)
        {
          if (newpx + x < world_map[0].length)
              handle.map_visitations[newpy-y][newpx+x] = true;

          if (newpx - x >= 0)
              handle.map_visitations[newpy-y][newpx-x] = true;
        }
      }
    }
}

Labyrinth.new = function(engine) {
    let handle = {
        was_up: 0,
        up: 0,
        was_down: 0,
        down: 0,
        was_left: 0,
        left: 0,
        was_right: 0,
        right: 0,
        px: 0,
        py: 0,
        map_visitations: Array.from(Array(world_map[0].length), () => new Array(world_map.length)),
        engine: engine
    };

    for(let y = 0; y < world_map.length; y++)
    {
        for(let x = 0; x < world_map[y].length; x++)
        {
            handle.map_visitations[x][y] = false;

            if (world_map[y][x] === 2) {
                handle.px = x;
                handle.py = y;
            }
        }
    }

    mark_map(handle, handle.px, handle.py);

    function test_new_position(newpx, newpy)
    {
        if (newpx !== handle.px || newpy !== handle.py)
        {
            if (newpx >= 0 && newpx < world_map[0].length
             && newpy >= 0 && newpy < world_map.length)
            {
                let newval = world_map[newpy][newpx];

                if (newval === 0 || newval === 2)
                    return true;
            }
        }

        return false;
    }

    handle.update = function(dt) {
        let newpx = handle.px;
        let newpy = handle.py;

        if (handle.up && !handle.was_up)
            newpy -= 1;

        if (handle.down && !handle.was_down)
            newpy += 1;

        if (handle.left && !handle.was_left)
            newpx -= 1;

        if (handle.right && !handle.was_right)
            newpx += 1;

        if (test_new_position(newpx, newpy)) {
            handle.px = newpx;
            handle.py = newpy;
            mark_map(handle, newpx, newpy);
        }

        handle.was_up = handle.up;
        handle.was_down = handle.down;
        handle.was_left = handle.left;
        handle.was_right = handle.right;
    };

    handle.draw = function(font) {
        let number_of_visible_blocs = 10;
        let max_x = world_map[0].length;
        let max_y = world_map.length;

        for(let y = -number_of_visible_blocs; y < number_of_visible_blocs; y++)
        {
            for(let x = -number_of_visible_blocs; x < number_of_visible_blocs; x++)
            {
                let px = x + handle.px;
                let py = y + handle.py;

                if (px < 0 || px >= max_x
                 || py < 0 || py >= max_y) {
                   continue;
                }

                let val = world_map[py][px];
                let xx = handle.engine.reference_width / 2 + 10 * (px - handle.px) - 5;
                let yy = handle.engine.reference_height / 2 + 10 * (py - handle.py) - 5;

                if (px === handle.px && py === handle.py)
                    handle.engine.rect(xx, yy, 10, 10, 256, 256, 256);
                else if (!handle.map_visitations[py][px])
                    handle.engine.rect(xx, yy, 10, 10, 20, 20, 20);
                else if (val === 0 || val === 2)
                    handle.engine.rect(xx, yy, 10, 10, 100, 100, 100);
                else if (val === 1)
                    handle.engine.rect(xx, yy, 10, 10, 50, 50, 50);
                else if (val === 3)
                    handle.engine.rect(xx, yy, 10, 10, 0, 256, 0);
                else if (val === 4)
                    handle.engine.rect(xx, yy, 10, 10, 256, 0.0, 0.0);
            }
        }

        handle.engine.rect(btn_up[0], btn_up[1], btn_up[2], btn_up[3], 5, 5, 5);
        font.render('^', btn_up[0] + 2, btn_up[1] + 3);
        handle.engine.rect(btn_right[0], btn_right[1], btn_right[2], btn_right[3], 5, 5, 5);
        font.render('>', btn_right[0] + 2, btn_right[1] + 2);
        handle.engine.rect(btn_down[0], btn_down[1], btn_down[2], btn_down[3], 5, 5, 5);
        font.render('v', btn_down[0] + 2, btn_down[1] + 2);
        handle.engine.rect(btn_left[0], btn_left[1], btn_left[2], btn_left[3], 5, 5, 5);
        font.render('<', btn_left[0] + 2, btn_left[1] + 2);
    };

    function is_inside(handle, x, y, btn) {
        let coord = engine.get_coordinate(btn[0], btn[1], btn[2], btn[3]);

        if (coord.x <= x && x <= coord.x + coord.w
         && coord.y <= y && y <= coord.y + coord.h) {
            return true;
        }

        return false;
    }

    function try_move(x, y) {
        if (test_new_position(x, y)) {
            handle.px = x;
            handle.py = y;
            mark_map(handle, x, y);
        }
    }

    handle.click = function(x, y) {
        if (is_inside(handle, x, y, btn_left))
            try_move(handle.px - 1, handle.py);
        else if (is_inside(handle, x, y, btn_right))
            try_move(handle.px + 1, handle.py);
        else if (is_inside(handle, x, y, btn_down))
            try_move(handle.px, handle.py + 1);
        else if (is_inside(handle, x, y, btn_up))
            try_move(handle.px, handle.py - 1);
    };

    return handle;
};
