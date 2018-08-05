"use strict";

let Labyrinth = {};

let maps = {
    'outside': {
        map: '' +
            '                                                                   \n' +
            '#######                      ########################              \n' +
            '#.....#                      #      #...............#              \n' +
            '#.....#                      #      #...............#              \n' +
            '#.....# Jordils         Coop #      ................###############\n' +
            '#.....#                      #      ..............................#\n' +
            '#.....#                      #      #.............................#\n' +
            '#.....#                      #      #.............................#\n' +
            '#.....###############################................####.........#\n' +
            '#.....#                             #................#EL#.........#\n' +
            '#.....#  Objectif: va à ton bureau  #................#CA#.........#\n' +
            '#.....#                             #................####.........#\n' +
            '#.....###############################.............................#\n' +
            '#.................................................................#\n' +
            '#................................................####..############\n' +
            '#####################################............#                 \n' +
            '                                    #............#                 \n' +
            '                                    #............#                 \n' +
            '                                    #............#                 \n' +
            '                                    #............#                 \n' +
            '                                    #............#                 \n' +
            '                                    #............####..############\n' +
            '                                    #..............~~~~~~~........#\n' +
            '                                    #...............~~~~..........#\n' +
            '                                    ###############################\n',
        meta: '' +
            '                                                                   \n' +
            '#######                      ########################              \n' +
            '#     #                      #      #               #              \n' +
            '#     #                      #      #               #              \n' +
            '#     #                      #      1               ###############\n' +
            '#     #                      #      2   @                         #\n' +
            '#     #                      #      #                             #\n' +
            '#     #                      #      #                             #\n' +
            '#     ###############################mmmm            ####         #\n' +
            '#     #                             #mmmm            #  #         #\n' +
            '#     #                             #mmmm            #  #         #\n' +
            '#     #                             #mmmm            ####         #\n' +
            '#     ###############################                             #\n' +
            '#                                                                 #\n' +
            '#                                                ####34############\n' +
            '#####################################            #                 \n' +
            '                                    #            #                 \n' +
            '                                    #            #                 \n' +
            '                                    #            #                 \n' +
            '                                    #            #                 \n' +
            '                                    #            #                 \n' +
            '                                    #            ####56############\n' +
            '                                    #                             #\n' +
            '                                    #                             #\n' +
            '                                    ###############################\n',
    },
    'rez': {
        map: '' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                               ELCA Rez                      \n' +
            '                                                             \n' +
            '                #####..#############################         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                #.....########.....................#         \n' +
            '                #............#.....................#         \n' +
            '                #............#.....................#         \n' +
            '                #............#.....................#         \n' +
            '                #............#.....................#         \n' +
            '                ####################################         \n',
        meta: '' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                #####34#############################         \n' +
            '                #                                  #         \n' +
            '                #     @                            #         \n' +
            '                #                                  #         \n' +
            '                #                                  #         \n' +
            '                #                                  #         \n' +
            '                #      #######                     #         \n' +
            '                #      rrrrrr#                     #         \n' +
            '                #      rrrrrr#                     #         \n' +
            '                #      rrrrrr#                     #         \n' +
            '                #      rrrrrr#                     #         \n' +
            '                ####################################         \n',
    },
    '1e': {
        map: '' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                             ELCA premier                    \n' +
            '                                                             \n' +
            '                ####################################         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                #####..#############################         \n',
        meta: '' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                ####################################         \n' +
            '                #                                  #         \n' +
            '                #                                  #         \n' +
            '                #                                  #         \n' +
            '                #                                  #         \n' +
            '                #                JJJJJJJ           #         \n' +
            '                #                JJJJJJJ           #         \n' +
            '                #                JJJJJJJ           #         \n' +
            '                #     @                            #         \n' +
            '                #                                  #         \n' +
            '                #                                  #         \n' +
            '                #####56#############################         \n',
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
            '                #...................................         \n' +
            '                #...................................         \n' +
            '                #.....#.....#.....#.....#####......#         \n' +
            '                #.....#.....#.....#.....#..........# Caisse 1\n' +
            '                #.....#.....#.....#.....#.......####         \n' +
            '                #.....#.....#.....#.....#.......#$$#         \n' +
            '                #.....#.....#.....#.....#.......####         \n' +
            '                #..................................#         \n' +
            '                #..................................#         \n' +
            '                ####################################         \n',
        meta: '' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                                                             \n' +
            '                ####################################         \n' +
            '                #        vvvvvvvv                  #         \n' +
            '                #        vvvvvvvv              @   1         \n' +
            '                #        vvvvvvvv                  2         \n' +
            '                #     #     #     #     #####      #         \n' +
            '                #     #     #     #     #          #         \n' +
            '                #     #     #     #     #       ####         \n' +
            '                #     #     #     #     #       #  #         \n' +
            '                #     #     #     #     #       ####         \n' +
            '                #                                  #         \n' +
            '                #                                  #         \n' +
            '                ####################################         \n',
    },
};

let screens = {
    'inventory': {
        map: '' +
            '                                                           \n' +
            '                                                           \n' +
            '                                                           \n' +
            '      #####################################################\n' +
            '      #...................................................#\n' +
            '      #....................Inventaire.....................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #####################################################\n',
    },
    'journal': {
        map: '' +
            '                                                           \n' +
            '                                                           \n' +
            '                                                           \n' +
            '      #####################################################\n' +
            '      #...................................................#\n' +
            '      #.....................Journal.......................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #####################################################\n',
    },
    'aide': {
        map: '' +
            '                                                           \n' +
            '                                                           \n' +
            '                                                           \n' +
            '                                                           \n' +
            '                                                           \n' +
            '                                                           \n' +
            '      #####################################################\n' +
            '      #...................................................#\n' +
            '      #......................Aide.........................#\n' +
            '      #...................................................#\n' +
            '      #......Déplacement: flèche directionnelles..........#\n' +
            "      #......Utiliser: i, puis sélectionner l'objet.......#\n" +
            '      #......Prendre: p...................................#\n' +
            "      #......Déposer: d, puis sélectionner l'objet........#\n" +
            '      #......Parler: marcher vers le PNJ..................#\n' +
            '      #......Acheter: prendre les objets souhaités,.......#\n' +
            '      #...............puis poser la somme équivalente.....#\n' +
            '      #......Fermer cette aide: h.........................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #...................................................#\n' +
            '      #####################################################\n',
    },
};

let initial_map = 'coop';

function parse_all_maps() {
    let all_teleports = {};
    let teleport_symbols = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    for (let key in maps) {
        let current_map = maps[key];

        let visual_map = current_map.map.split('\n');
        let meta_map = current_map.meta.split('\n');

        current_map.teleports = [];
        current_map.map_length = visual_map[0].length;
        current_map.map_height = visual_map.length;
        current_map.pnj_positions = {};

        if (visual_map[0].length !== meta_map[0].length) {
            console.log('Carte META de largeur différente que la carte visuelle!!');
            return;
        }

        if (visual_map.length !== meta_map.length) {
            console.log('Carte META de hauteur différente que la carte visuelle!!');
            return;
        }

        for(let y = 0; y < current_map.map_height; y++) {
            for(let x = 0; x < current_map.map_length; x++) {
                let chr = meta_map[y][x];

                if (chr === '#')
                {
                    if (visual_map[y][x] !== '#') {
                        console.log('Les murs ne marchent pas en (' + x + ', ' + y + '), carte = ' + key);
                    }
                } else if (teleport_symbols.indexOf(chr) > -1) {
                    if (all_teleports[chr] === undefined) {
                        all_teleports[chr] = {
                            map: key,
                            x: x,
                            y: y
                        };
                    } else {
                        current_map.teleports.push({
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
                } else if (chr !== ' ' && chr !== undefined) {
                    if (chr === '@') {
                        current_map.start = {x: x, y: y};
                    } else {
                        if (current_map.pnj_positions[chr] === undefined) {
                            current_map.pnj_positions[chr] = []
                        }

                        current_map.pnj_positions[chr].push({x: x, y: y});
                    }

                }
            }
        }
    }
}

function parse_all_screens() {
    for (let key in screens) {
        let map = screens[key];
        let splitted_map = map.map.split('\n');

        map.map_length = splitted_map[0].length;
        map.map_height = splitted_map.length;
    }
}

Labyrinth.new = function(engine) {
    parse_all_maps();
    parse_all_screens();

    let handle = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        open_inventory: false,
        engine: engine,
        map_length: 0,
        map_height: 0,
        current_map: undefined
    };

    function change_map(map_name) {
        handle.current_map = maps[map_name];
        handle.map_length = handle.current_map.map_length;
        handle.map_height = handle.current_map.map_height;
        handle.pnjs = {};

        for(let chr in handle.current_map.pnj_positions) {
            let positions = handle.current_map.pnj_positions[chr];
            handle.pnjs[chr] = positions[Math.floor(Math.random() * positions.length)];
        }

        handle.pnjs['@'] = handle.current_map.start;
    }

    change_map(initial_map);

    function test_new_position(old_hero_pos, new_hero_pos)
    {
        for(let i in handle.current_map.teleports) {
            let tp = handle.current_map.teleports[i];

            if (tp.sx === new_hero_pos.x && tp.sy === new_hero_pos.y
             || (tp.sx === old_hero_pos.x && tp.sy === new_hero_pos.y && old_hero_pos.y !== new_hero_pos.y)
             || (tp.sx === new_hero_pos.x && tp.sy === old_hero_pos.y && old_hero_pos.x !== new_hero_pos.x)) {
                return {
                    'success': true,
                    'pos': {x: tp.ex + (new_hero_pos.x - old_hero_pos.x), y: tp.ey + (new_hero_pos.y - old_hero_pos.y)},
                    'newmap': tp.map
                };
            }
        }

        if (new_hero_pos.x === old_hero_pos.x && new_hero_pos.y === old_hero_pos.y) {
            return {
                'success': false
            }
        }

        if (new_hero_pos.x >= 0 && new_hero_pos.x < handle.map_length
         && new_hero_pos.y >= 0 && new_hero_pos.y < handle.map_height)
        {
            let newval = handle.current_map.map[new_hero_pos.y * (handle.map_length + 1) + new_hero_pos.x];

            if (newval !== '#') {
                return {
                    'success': true,
                    'pos': new_hero_pos
                };
            }
        }

        if (new_hero_pos.x >= 0 && new_hero_pos.x < handle.map_length
         && old_hero_pos.y >= 0 && old_hero_pos.y < handle.map_height)
        {
            let newval = handle.current_map.map[old_hero_pos.y * (handle.map_length + 1) + new_hero_pos.x];

            if (newval !== '#') {
                return {
                    'success': true,
                    'pos': { x: new_hero_pos.x, y: old_hero_pos.y },
                };
            }
        }

        if (old_hero_pos.x >= 0 && old_hero_pos.x < handle.map_length
         && new_hero_pos.y >= 0 && new_hero_pos.y < handle.map_height)
        {
            let newval = handle.current_map.map[new_hero_pos.y * (handle.map_length + 1) + old_hero_pos.x];

            if (newval !== '#') {
                return {
                    'success': true,
                    'pos': {x: old_hero_pos.x, y: new_hero_pos.y },
                };
            }
        }

        return {
            'success': false
        }
    }

    function update_on_map(handle) {
        for (let p in handle.pnjs) {
            let pnj = handle.pnjs[p];

            if (p === '@')
                continue;

            let new_pnj = {x: pnj.x, y: pnj.y};
            let r = Math.floor(Math.random() * 8);

            if (r === 0) {
                new_pnj.x++;
            } else if (r === 1) {
                new_pnj.x--;
            } else if (r === 2) {
                new_pnj.y++;
            } else if (r === 3) {
                new_pnj.y--;
            } else if (r === 4) {
                new_pnj.x++;
                new_pnj.y++;
            } else if (r === 5) {
                new_pnj.x--;
                new_pnj.y++;
            } else if (r === 6) {
                new_pnj.x++;
                new_pnj.y--;
            } else if (r === 7) {
                new_pnj.x--;
                new_pnj.y--;
            }

            if (handle.current_map.map[new_pnj.y * (handle.current_map.map_length + 1) + new_pnj.x] === '.')
                handle.pnjs[p] = new_pnj;
        }

        let hero_pos = handle.pnjs['@'];
        let new_pos = {x: hero_pos.x, y: hero_pos.y };

        if (handle.up)
            new_pos.y--;

        if (handle.down)
            new_pos.y++;

        if (handle.left)
            new_pos.x--;

        if (handle.right)
            new_pos.x++;

        let ret = test_new_position(hero_pos, new_pos);

        if (ret.success) {
            if (typeof ret.newmap !== 'undefined') {
                change_map(ret.newmap);
            }

            handle.pnjs['@'] = ret.pos;
        }
    }

    function update_on_inventory(handle) {
        // TODO
    }

    handle.update = function() {
        if (handle.open_inventory) {
            update_on_inventory(handle);
        } else {
            update_on_map(handle);
        }
    };

    function draw_map(handle) {
        for(let y = 0; y < handle.map_height; y++)
        {
            for(let x = 0; x < handle.map_length;)
            {
                let length = 0;
                let val = handle.current_map.map[y * (handle.map_length + 1) + x];
                let xx = 9.6 * x;
                let yy = 16 * y;
                let str = "";
                let pnj_found = false;

                if (val === undefined)
                {
                    x++;
                    continue;
                }

                for (let p in handle.pnjs) {
                    let pnj = handle.pnjs[p];

                    if (x === pnj.x && y === pnj.y) {
                        if (p === '@') {
                            handle.engine.text(p, xx, yy, 16, 255, 0, 0);
                        } else if (p === 'J') {
                            handle.engine.text(p, xx, yy, 16, 0, 255, 255);
                        } else if (p === 'm') {
                            handle.engine.text(p, xx, yy, 16, 155, 155, 155);
                        } else if (p === 'v') {
                            handle.engine.text(p, xx, yy, 16, 0, 0, 255);
                        } else if (p === 'r') {
                            handle.engine.text(p, xx, yy, 16, 255, 0, 255);
                        } else {
                            handle.engine.text(p, xx, yy, 16, 255, 255, 255);
                        }

                        pnj_found = true;
                        break;
                    }
                }

                if (pnj_found)
                {
                    x++;
                    continue;
                }

                while(true)
                {
                    length++;
                    str += val;

                    for (let p in handle.pnjs) {
                        let pnj = handle.pnjs[p];

                        if (x + length === pnj.x && y === pnj.y)
                        {
                            pnj_found = true;
                            break;
                        }
                    }

                    if (pnj_found || handle.current_map.map[y * (handle.map_length + 1) + x + length] !== val)
                        break;
                }

                if (val === '#')
                    handle.engine.text(str, xx, yy, 16, 100, 100, 100);
                else if (val === '.')
                    handle.engine.text(str, xx, yy, 16, 100, 100, 100);
                else if (val === '~')
                    handle.engine.text(str, xx, yy, 16, 200, 200, 200);
                else if (val === '$')
                    handle.engine.text(str, xx, yy, 16, 200, 200, 0);
                else
                    handle.engine.text(str, xx, yy, 16, 255, 255, 255);

                x += length;
            }
        }
    }

    function draw_inventory(handle)
    {
        let inventory = screens['inventory'];

        for(let y = 0; y < inventory.map_height; y++) {
            for (let x = 0; x < inventory.map_length; x++) {
                let start = y * (inventory.map_length + 1);
                handle.engine.text(inventory.map.substring(start, start + inventory.map_length), 0, y * 16, 16, 100, 100, 100);
            }
        }
    }

    handle.draw = function() {
        if (handle.open_inventory) {
            draw_inventory(handle);
        } else {
            draw_map(handle);
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
