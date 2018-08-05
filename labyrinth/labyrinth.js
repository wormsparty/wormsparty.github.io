"use strict";

let Labyrinth = {};

let maps = {
    'outside': {
        map: '' +
            '                                                                   \n' +
            '#######                         #####################              \n' +
            '#.....#                         #   #...............#              \n' +
            '#.....#                         #   #...............#              \n' +
            '#.....# Jordils            Coop #   1...............###############\n' +
            '#.....#                         #   2...@.........................#\n' +
            '#.....#                         #   #.............................#\n' +
            '#.....#                         #   #.............................#\n' +
            '#.....###############################................####.........#\n' +
            '#.....#                             #................#EL#.........#\n' +
            '#.....#  Objectif: va à ton bureau  #................#CA#.........#\n' +
            '#.....#                             #................####.........#\n' +
            '#.....###############################.............................#\n' +
            '#.................................................................#\n' +
            '#................................................####34############\n' +
            '#####################################............#                 \n' +
            '                                    #............#                 \n' +
            '                                    #............#                 \n' +
            '                                    #............#                 \n' +
            '                                    #............#                 \n' +
            '                                    #............#                 \n' +
            '                                    #............####56############\n' +
            '                                    #..............~~~~~~~........#\n' +
            '                                    #...............~~~~..........#\n' +
            '                                    ###############################\n',
    },
    'coop': {
        map: '' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                               Coop                          \n' +
            '                                                             \n' +
            '                ####################################         \n' +
            '                #..................................#         \n' +
            '                #...............................@..1         \n' +
            '                #..................................2         \n' +
            '                #.....#.....#.....#.....#####......#         \n' +
            '                #.....#.....#.....#.....#..........# Caisse A\n' +
            '                #.....#.....#.....#.....#.......####         \n' +
            '                #.....#.....#.....#.....#.......#$$#         \n' +
            '                #.....#.....#.....#.....#.......####         \n' +
            '                #.....#.....#.....#.....#..........#         \n' +
            '                #..................................#         \n' +
            '                ####################################         \n',
    },
};

let initial_map = 'coop';

function parse_all_maps() {
    let all_teleports = {};
    let teleport_symbols = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    for (let key in maps) {
        let map = maps[key];
        let edited_map = map.map.split('');
        map.teleports = [];

        let splitted_map = map.map.split('\n');

        map.map_length = splitted_map[0].length;
        map.map_height = splitted_map.length;

        for(let y = 0; y < map.map_height; y++) {
            for(let x = 0; x < map.map_length; x++) {
                let chr = splitted_map[y][x];

                if (chr === '@') {
                    map.startx = x;
                    map.starty = y;
                    edited_map[y * (map.map_length + 1) + x] = '.';
                } else if (teleport_symbols.indexOf(chr) > -1) {
                    if (all_teleports[chr] === undefined) {
                        all_teleports[chr] = {
                            map: key,
                            x: x,
                            y: y
                        };
                    } else {
                        map.teleports.push({
                            sx: x,
                            sy: y,
                            map: all_teleports[chr].map,
                            ex: all_teleports[chr].x,
                            ey: all_teleports[chr].y,
                        });

                        let other_map = maps[all_teleports[chr].map];

                        other_map.teleports.push({
                            sx: all_teleports[chr].x,
                            sy: all_teleports[chr].y,
                            map: key,
                            ex: x,
                            ey: y,
                        });

                    }

                    edited_map[y * (map.map_length + 1) + x] = '.';
                }
            }
        }

        map.map = edited_map;
    }
}

Labyrinth.new = function(engine) {
    parse_all_maps();

    let handle = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        px: 0,
        py: 0,
        engine: engine,
        map_length: 0,
        map_height: 0,
        current_map: undefined
    };

    function change_map(map_name) {
        handle.current_map = maps[map_name];
        handle.px = handle.current_map.startx;
        handle.py = handle.current_map.starty;
        handle.map_length = handle.current_map.map_length;
        handle.map_height = handle.current_map.map_height;
    }

    change_map(initial_map);

    function test_new_position(newx, newy)
    {
        for(let i in handle.current_map.teleports) {
            let tp = handle.current_map.teleports[i];

            if (tp.sx === newx && tp.sy === newy
             || (tp.sx === handle.px && tp.sy === newy && handle.py !== newy)
             || (tp.sx === newx && tp.sy === handle.py && handle.px !== newx)) {
                return {
                    'success': true,
                    'newpx': tp.ex + (newx - handle.px),
                    'newpy': tp.ey + (newy - handle.py),
                    'newmap': tp.map
                };
            }
        }

        if (newx === handle.px && newy === handle.py) {
            return {
                'success': false
            }
        }

        if (newx >= 0 && newx < handle.map_length
         && newy >= 0 && newy < handle.map_height)
        {
            let newval = handle.current_map.map[newy * (handle.map_length + 1) + newx];

            if (newval !== '#') {
                return {
                    'success': true,
                    'newpx': newx,
                    'newpy': newy
                };
            }
        }

        if (newx >= 0 && newx < handle.map_length
         && handle.py >= 0 && handle.py < handle.map_height)
        {
            let newval = handle.current_map.map[handle.py * (handle.map_length + 1) + newx];

            if (newval !== '#') {
                return {
                    'success': true,
                    'newpx': newx,
                    'newpy': handle.py
                };
            }
        }

        if (handle.px >= 0 && handle.px < handle.map_length
         && newy >= 0 && newy < handle.map_height)
        {
            let newval = handle.current_map.map[newy * (handle.map_length + 1) + handle.px];

            if (newval !== '#') {
                return {
                    'success': true,
                    'newpx': handle.px,
                    'newpy': newy
                };
            }
        }

        return {
            'success': false
        }
    }

    handle.update = function() {
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

        let ret = test_new_position(newpx, newpy);

        if (ret.success) {
            if (typeof ret.newmap !== 'undefined') {
                change_map(ret.newmap);
            }

            handle.px = ret.newpx;
            handle.py = ret.newpy;
        }
    };

    handle.draw = function() {
        for(let y = 0; y < handle.map_height; y++)
        {
            for(let x = 0; x < handle.map_length;)
            {
                let length = 0;
                let val = handle.current_map.map[y * (handle.map_length + 1) + x];
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

                    if (handle.current_map.map[y * (handle.map_length + 1) + x + length] !== val)
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
    };
/*
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
        }
    }*/

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
