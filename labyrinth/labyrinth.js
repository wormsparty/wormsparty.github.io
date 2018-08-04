"use strict";

let Labyrinth = {};

let world_map = "" +
    '    #######                         ########################              \n' +
    '    #.....#                         #   #..................#              \n' +
    '  J #.....#                         # C #..................#              \n' +
    '  o #.....#                         # o ...................###############\n' +
    '  r #..@..#                         # o .................................#\n' +
    '  d #.....#                         # p #................................#\n' +
    '  i #.....#                         #   #................................#\n' +
    '  l #.....###############################...................####.........#\n' +
    '  s #.....#                             #...................#EL#.........#\n' +
    '    #.....#  Objectif: va à ton bureau  #...................#CA#.........#\n' +
    '    #.....#                             #...................####.........#\n' +
    '    #.....###############################................................#\n' +
    '    #....................................................................#\n' +
    '    #...................................................####..############\n' +
    '    #####################################...............#                 \n' +
    '                                        #...............#                 \n' +
    '                                        #...............#                 \n' +
    '                                        #...............#                 \n' +
    '                                        #...............#                 \n' +
    '                                        #...............#                 \n' +
    '                                        #...............####..############\n' +
    '                                        #.................~~~~~~~........#\n' +
    '                                        #..................~~~~..........#\n' +
    '                                        ##################################\n';

let btn_up   =  [118, 207, 9, 10],
    btn_down =  [118, 217, 9, 10],
    btn_right = [128, 217, 9, 10],
    btn_left =  [108, 217, 9, 10];

function mark_map(handle, newpx, newpy)
{
    handle.map_visitations[newpy * handle.map_length + newpx] = true;

    let depth_of_view = 8;

    for(let y = 1; y <= depth_of_view; y++)
    {
        if (newpy + y < world_map.length)
            handle.map_visitations[(newpy+y) * handle.map_length + newpx] = true;

        if (newpy - y >= 0)
            handle.map_visitations[(newpy-y) * handle.map_length + newpx] = true;
    }

    for(let x = 1; x <= depth_of_view; x++)
    {
      if (newpx + x < handle.map_length)
          handle.map_visitations[newpy * handle.map_length + newpx+x] = true;

      if (newpx - x >= 0)
          handle.map_visitations[newpy * handle.map_length + newpx-x] = true;

      for(let y = 1; y <= depth_of_view; y++)
      {
        if (newpy + y < handle.map_height)
        {
            if (newpx + x < handle.map_length)
                handle.map_visitations[(newpy+y) * handle.map_length + newpx+x] = true;

            if (newpx - x >= 0)
                handle.map_visitations[(newpy+y) * handle.map_length + newpx-x] = true;
        }

        if (newpy - y >= 0)
        {
          if (newpx + x < handle.map_length)
              handle.map_visitations[(newpy-y) * handle.map_length + newpx+x] = true;

          if (newpx - x >= 0)
              handle.map_visitations[(newpy-y) * handle.map_length + newpx-x] = true;
        }
      }
    }
}

Labyrinth.new = function(engine) {
    let splitted_map = world_map.split('\n');

    let map_length = splitted_map[0].length,
        map_height = splitted_map.length;

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
        map_visitations: new Array(map_length * map_height),
        engine: engine,
        map_length: map_length,
        map_height: map_height
    };

    for(let y = 0; y < map_height; y++)
    {
        for(let x = 0; x < map_length; x++)
        {
            handle.map_visitations[y * map_length + x] = false;

            if (world_map[y * (map_length + 1) + x] === '@') {
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
            if (newpx >= 0 && newpx < map_length
             && newpy >= 0 && newpy < map_height)
            {
                let newval = world_map[newpy * (map_length + 1) + newpx];

                if (newval !== '#')
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

    handle.draw = function() {
        let number_of_visible_blocs = 10;

        for(let y = -number_of_visible_blocs; y < number_of_visible_blocs; y++)
        {
            for(let x = -number_of_visible_blocs; x < number_of_visible_blocs; x++)
            {
                let px = x + handle.px;
                let py = y + handle.py;

                if (px < 0 || px >= map_length
                 || py < 0 || py >= map_height) {
                   continue;
                }

                let val = world_map[py * (map_length + 1) + px];
                let xx = handle.engine.reference_width / 2 + 10 * (px - handle.px) - 5;
                let yy = handle.engine.reference_height / 2 + 16 * (py - handle.py) - 5;

                if (val === '@')
                    val = '.';

                if (px === handle.px && py === handle.py)
                    handle.engine.text('@', xx, yy, 16, 256, 0, 0);
//                else if (!handle.map_visitations[py * map_length + px])
  //                  handle.engine.tex(xx, yy, 10, 10, 20, 20, 20);
                else if (val === '#')
                    handle.engine.text(val, xx, yy, 16, 100, 100, 100);
                else if (val === '.')
                    handle.engine.text(val, xx, yy, 16, 100, 100, 100);
                else if (val === '~')
                    handle.engine.text(val, xx, yy, 16, 200, 200, 200);
                else
                    handle.engine.text(val, xx, yy, 16, 255, 0, 255);
            }
        }

        handle.engine.rect(btn_up[0], btn_up[1], btn_up[2], btn_up[3], 5, 5, 5);
        handle.engine.text('^', btn_up[0] + 2, btn_up[1] + 3, 16, 255, 0, 0);
        handle.engine.rect(btn_right[0], btn_right[1], btn_right[2], btn_right[3], 5, 5, 5);
        handle.engine.text('>', btn_right[0] + 2, btn_right[1] + 2, 16, 0, 255, 0);
        handle.engine.rect(btn_down[0], btn_down[1], btn_down[2], btn_down[3], 5, 5, 5);
        handle.engine.text('v', btn_down[0] + 2, btn_down[1] + 2, 16, 0, 0, 255);
        handle.engine.rect(btn_left[0], btn_left[1], btn_left[2], btn_left[3], 5, 5, 5);
        handle.engine.text('<', btn_left[0] + 2, btn_left[1] + 2, 16, 255, 0, 255);

        handle.engine.text("###<>@123[]{}~==", 0, 0, 16, 255, 255, 255);
        handle.engine.text("###<>@123[]{}~==", 0, 16, 16, 0, 0, 0);
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
