"use strict";

let Labyrinth = {};

let outside_map = "" +
    '#######                         ########################              \n' +
    '#.....#                         #   #..................#              \n' +
    '#.....#                         # C #..................#              \n' +
    '#.....#                         # o ...................###############\n' +
    '#.....# Jordils                 # o .................................#\n' +
    '#.....#                         # p #................................#\n' +
    '#.....#                         #   #................................#\n' +
    '#.....###############################...................####.........#\n' +
    '#.....#                             #...................#EL#.........#\n' +
    '#.....#  Objectif: va à ton bureau  #...................#CA#.........#\n' +
    '#.....#                             #...................####.........#\n' +
    '#.....###############################................................#\n' +
    '#....................................................................#\n' +
    '#...................................................####..############\n' +
    '#####################################...............#                 \n' +
    '                                    #...............#                 \n' +
    '                                    #...............#                 \n' +
    '                                    #...............#                 \n' +
    '                                    #...............#                 \n' +
    '                                    #...............#                 \n' +
    '                                    #...............####..############\n' +
    '                                    #.................~~~~~~~........#\n' +
    '                                    #..................~~~~..........#\n' +
    '                                    ##################################\n';

let coop_map = "" +
    '               Coop                          \n' +
    '####################################         \n' +
    '#...................................         \n' +
    '#...................................         \n' +
    '#.....#.....#.....#.....#####......#         \n' +
    '#.....#.....#.....#.....#..........#         \n' +
    '#.....#.....#.....#.....#.......####         \n' +
    '#.....#.....#.....#.....#.......#$$# Caisse 1\n' +
    '#.....#.....#.....#.....#.......####         \n' +
    '#.....#.....#.....#.....#..........#         \n' +
    '#.....#.....#.....#.....#.......####         \n' +
    '#.....#.....#.....#.....#.......#$$# Caisse 2\n' +
    '#.....#.....#.....#.....#.......####         \n' +
    '#..................................#         \n' +
    '#..................................#         \n' +
    '####################################         \n';

let current_map = coop_map;

/*let btn_up   =  [118, 207, 9, 10],
    btn_down =  [118, 217, 9, 10],
    btn_right = [128, 217, 9, 10],
    btn_left =  [108, 217, 9, 10];*/

Labyrinth.new = function(engine) {
    let splitted_map = current_map.split('\n');

    let map_length = splitted_map[0].length,
        map_height = splitted_map.length;

    let handle = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        px: 0,
        py: 0,
        engine: engine,
        map_length: map_length,
        map_height: map_height
    };

    handle.px = 3;
    handle.py = 4;

    function test_new_position(newpx, newpy)
    {
        if (newpx !== handle.px || newpy !== handle.py)
        {
            if (newpx >= 0 && newpx < map_length
             && newpy >= 0 && newpy < map_height)
            {
                let newval = current_map[newpy * (map_length + 1) + newpx];

                if (newval !== '#')
                    return true;
            }
        }

        return false;
    }

    handle.update = function(dt) {
        let newpx = handle.px;
        let newpy = handle.py;

        if (handle.up)
            newpy -= 1;

        if (handle.down)
            newpy += 1;

        if (handle.left)
            newpx -= 1;

        if (handle.right)
            newpx += 1;

        if (test_new_position(newpx, newpy)) {
            handle.px = newpx;
            handle.py = newpy;
        } else if (test_new_position(newpx, handle.py) && newpx !== handle.px) {
            handle.px = newpx;
        } else if (test_new_position(handle.px, newpy) && newpy !== handle.py) {
            handle.py = newpy;
        }
    };

    handle.draw = function() {
        for(let y = 0; y < handle.map_height; y++)
        {
            for(let x = 0; x < handle.map_length;)
            {
                let length = 0;
                let val = current_map[y * (map_length + 1) + x];
                let str = "";

                if (val === undefined)
                {
                    x++;
                    continue;
                }

                while(true)
                {
                    length++;
                    str += val;

                    if (x === handle.px && y === handle.py
                     || x + length === handle.px && y === handle.py)
                        break;

                    if (current_map[y * (map_length + 1) + x + length] !== val)
                        break;
                }

                let xx = 9.6 * x;
                let yy = 16 * y;

                if (x === handle.px && y === handle.py)
                    handle.engine.text('@', xx, yy, 16, 255, 0, 0);
                else if (val === '#')
                    handle.engine.text(str, xx, yy, 16, 100, 100, 100);
                else if (val === '.')
                    handle.engine.text(str, xx, yy, 16, 100, 100, 100);
                else if (val === '~')
                    handle.engine.text(str, xx, yy, 16, 200, 200, 200);
                else if (val === '$')
                    handle.engine.text(str, xx, yy, 16, 200, 200, 0);
                else
                    handle.engine.text(str, xx, yy, 16, 255, 0, 255);

                x += length;
            }
        }

        /*     handle.engine.rect(btn_up[0], btn_up[1], btn_up[2], btn_up[3], 5, 5, 5);
        handle.engine.text('^', btn_up[0] + 2, btn_up[1] + 3, 16, 255, 0, 0);
        handle.engine.rect(btn_right[0], btn_right[1], btn_right[2], btn_right[3], 5, 5, 5);
        handle.engine.text('>', btn_right[0] + 2, btn_right[1] + 2, 16, 0, 255, 0);
        handle.engine.rect(btn_down[0], btn_down[1], btn_down[2], btn_down[3], 5, 5, 5);
        handle.engine.text('v', btn_down[0] + 2, btn_down[1] + 2, 16, 0, 0, 255);
        handle.engine.rect(btn_left[0], btn_left[1], btn_left[2], btn_left[3], 5, 5, 5);
        handle.engine.text('<', btn_left[0] + 2, btn_left[1] + 2, 16, 255, 0, 255);*/
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
/*        if (is_inside(handle, x, y, btn_left))
            try_move(handle.px - 1, handle.py);
        else if (is_inside(handle, x, y, btn_right))
            try_move(handle.px + 1, handle.py);
        else if (is_inside(handle, x, y, btn_down))
            try_move(handle.px, handle.py + 1);
        else if (is_inside(handle, x, y, btn_up))
            try_move(handle.px, handle.py - 1);*/
    };

    return handle;
};
