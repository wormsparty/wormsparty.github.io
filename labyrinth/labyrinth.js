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
            '#.....#                      ########................####.........#\n' +
            '#.....#                             #................#EL#.........#\n' +
            '#.....#                             #................#CA#.........#\n' +
            '#.....#                             #................####.........#\n' +
            '#.....###############################.............................#\n' +
            '#.................................................................#\n' +
            '#................................................####..############\n' +
            '#####################################............#                 \n' +
            '                                    #............#                 \n' +
            '          h : aide                  #............#                 \n' +
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
            '#  @  #                      #      1               ###############\n' +
            '#     #                      #      2                             #\n' +
            '#     #                      #      #                             #\n' +
            '#     #                      #      #                             #\n' +
            '#     #                      ########mmmm            ####         #\n' +
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
            '                #                        %         #         \n' +
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
            '                #####..#############################         \n' +
            '                                                             \n' +
            '                             p: prendre                      \n',
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
            '                # $$$$$                            #         \n' +
            '                # $$$$$                            #         \n' +
            '                #                                  #         \n' +
            '                #                JJJJJJJ           #         \n' +
            '                #                JJJJJJJ           #         \n' +
            '                #                JJJJJJJ           #         \n' +
            '                #     @                            #         \n' +
            '                #                                  #         \n' +
            '                #                                  #         \n' +
            '                #####56#############################         \n' +
            '                                                             \n' +
            '                                                             \n',
    },
    'coop': {
        map: '' +
            '                                                                   \n' +
            '                                                                   \n' +
            '                                                                   \n' +
            '                               Coop                                \n' +
            '                                                                   \n' +
            '                ####################################               \n' +
            '                #..................................#               \n' +
            '                #...................................               \n' +
            '                #...................................               \n' +
            '                #.....#.....#.....#.....#####......#               \n' +
            '                #.....#.....#.....#.....#...#......#               \n' +
            '                #.....#.....#.....#.....#...#......#               \n' +
            '                #.....#.....#.....#.....#...#......#               \n' +
            '                #.....#.....#.....#.....#####......#               \n' +
            '                #..................................#               \n' +
            '                #..................................#               \n' +
            '                #..................................#               \n' +
            '                ####################################               \n' +
            '                                                                   \n' +
            '                             p: prendre                            \n' +
            '                                                                   \n',
        meta: '' +
            '                                                                   \n' +
            '                                                                   \n' +
            '                                                                   \n' +
            '                                                                   \n' +
            '                                                                   \n' +
            '                ####################################               \n' +
            '                #        vvvvvvvv                  #               \n' +
            '                #        vvvvvvvv              @   1               \n' +
            '                #        vvvvvvvv                  2               \n' +
            '                #     #?    #*)   #&]   #####      #               \n' +
            '                #     #?    #](   #(}   #ccc#      #               \n' +
            '                #     #?    #]*   #}&   #ccc#      #               \n' +
            '                #     #?    #{!   #&)   #ccc#      #               \n' +
            '                #     #?    #})   #[*   #####      #               \n' +
            '                #                                  #               \n' +
            '                #                                  #               \n' +
            '                #                                  #               \n' +
            '                ####################################               \n' +
            '                                                                   \n' +
            '                                                                   \n' +
            '                                                                   \n',
    },
};

let screens = {
    'inventory': {
        map: '' +
            '                                                           \n' +
            '                                                           \n' +
            '                                                           \n' +
            '      #####################################################\n' +
            '      #                                                   #\n' +
            '      #                    Inventaire                     #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #####################################################\n',
    },
    'journal': {
        map: '' +
            '                                                           \n' +
            '                                                           \n' +
            '                                                           \n' +
            '      #####################################################\n' +
            '      #                                                   #\n' +
            '      #                       Journal                     #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #####################################################\n',
    },
    'help': {
        map: '' +
            '                                                           \n' +
            '                                                           \n' +
            '                                                           \n' +
            '                                                           \n' +
            '                                                           \n' +
            '                                                           \n' +
            '      #####################################################\n' +
            '      #                                                   #\n' +
            '      #                       Aide                        #\n' +
            '      #                                                   #\n' +
            '      #      Déplacement: flèche directionnelles          #\n' +
            "      #      Utiliser: i, puis sélectionner l'objet       #\n" +
            '      #      Prendre: p                                   #\n' +
            '      #      Parler: marcher vers le PNJ                  #\n' +
            '      #      Journal: j                                   #\n' +
            '      #      Fermer cette aide: h                         #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #                                                   #\n' +
            '      #####################################################\n',
    },
};

let initial_map = 'coop';

function parse_all_maps()
{
    let all_teleports = {};
    let teleport_symbols = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let item_symbols = [ '{', '}', '[', ']', '(', ')', '&', '%', '!', '?', '*', '$'];

    for (let key in maps)
    {
        let current_map = maps[key];

        let visual_map = current_map.map.split('\n');
        let meta_map = current_map.meta.split('\n');

        current_map.teleports = [];
        current_map.map_length = visual_map[0].length;
        current_map.map_height = visual_map.length;
        current_map.pnj_positions = {};
        current_map.item_positions = {};

        if (visual_map[0].length !== meta_map[0].length) {
            console.log('Carte META de largeur différente que la carte visuelle!!');
            return;
        }

        if (visual_map.length !== meta_map.length) {
            console.log('Carte META de hauteur différente que la carte visuelle!!');
            return;
        }

        for(let y = 0; y < current_map.map_height; y++)
        {
            for(let x = 0; x < current_map.map_length; x++)
            {
                let chr = meta_map[y][x];

                if (chr === '#')
                {
                    if (visual_map[y][x] !== '#') {
                        console.log('Les murs ne marchent pas en (' + x + ', ' + y + '), carte = ' + key);
                    }
                }
                else if (teleport_symbols.indexOf(chr) > -1)
                {
                    if (all_teleports[chr] === undefined)
                    {
                        all_teleports[chr] = {
                            map: key,
                            x: x,
                            y: y
                        };
                    }
                    else
                    {
                        current_map.teleports.push({
                            x: x,
                            y: y,
                            map: all_teleports[chr].map,
                            ex: all_teleports[chr].x,
                            ey: all_teleports[chr].y,
                        });

                        let other_map = maps[all_teleports[chr].map];

                        other_map.teleports.push({
                            x: all_teleports[chr].x,
                            y: all_teleports[chr].y,
                            map: key,
                            ex: x,
                            ey: y,
                        });

                    }
                }
                else if (item_symbols.indexOf(chr) > -1)
                {
                    if (current_map.item_positions[chr] === undefined) {
                        current_map.item_positions[chr] = []
                    }

                    current_map.item_positions[chr].push({x: x, y: y});
                }
                else if (chr !== ' ' && chr !== undefined)
                {
                    if (chr === '@')
                    {
                        current_map.start = {x: x, y: y};
                    }
                    else
                    {
                        if (current_map.pnj_positions[chr] === undefined)
                            current_map.pnj_positions[chr] = [];

                        current_map.pnj_positions[chr].push({x: x, y: y});
                    }

                }
            }
        }
    }
}

function parse_all_screens()
{
    for (let key in screens)
    {
        let map = screens[key];
        let splitted_map = map.map.split('\n');

        map.map_length = splitted_map[0].length;
        map.map_height = splitted_map.length;
    }
}

Labyrinth.new = function(engine)
{
    parse_all_maps();
    parse_all_screens();

    let handle = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        open_inventory: false,
        open_help: false,
        open_journal: false,
        pickup: false,
        engine: engine,
        map_length: 0,
        map_height: 0,
        current_map: undefined,
        current_status: "",
        inventory: [],
        coins: 0,
    };

    /*
        1) Helper functions
     */
    function get_symbol_at(handle, pos) {
        return handle.current_map.map[pos.y * (handle.current_map.map_length + 1) + pos.x];
    }

    function get_string_from(handle, x, y, length) {
        return handle.current_map.map.substr(y * (handle.map_length + 1) + x, length);
    }

    function pos_equal(p1, p2) {
        return p1.x === p2.x && p1.y === p2.y;
    }

    function to_screen_coord(x, y) {
        return {x: 9.6 * x - 2, y: 16 * y };
    }

    function get_background_color() {
        return "#050505";
    }

    function get_text_color() {
        return "#FFFFFF";
    }

    let tile2color = {
        '#': '#646464',
        '.': "#646464",
        '~': "#C8C8C8",
    };

    let pnj2color = {
        'm': "#9B9B9B",
        'v': "#0000FF",
        'c': "#0055DD",
        'J': "#00FFFF",
        'r': "#FF00FF",
        '@': "#FF0000",
    };

    let item2color = {
        '$': "#FFFF00",
        '(': "#FF8800",
        '&': "#FF0000",
        '[': "#FF0088",
        ']': "#FF00FF",
        '*': "#dd99FF",
        '{': "#00FFFF",
        ')': "#0000FF",
        '}': "#00FF00",
        '%': "#114400",
        '!': "#555555",
        '?': "#FFFFFF",
    };

    /*
        2) Item management
     */
    let item2price = {
        '%': 10,
        '&': 2,
        '(': 5,
        ')': 5,
        '[': 10,
        ']': 10,
        '{': 15,
        '}': 15,
        '*': 1,
        '?': 4,
        '!': 2,
    };

    let item2description = {
        '$': 'Une pièce de 1.-',
        '%': 'Un masque à gaz',
        '&': 'Un coca',
        '(': 'Un bout de bois gauche',
        ')': 'Un bout de bois droit',
        '[': 'Un crochet gauche',
        ']': 'Un crochet droit',
        '{': 'Un arc gauche',
        '}': 'Un arc droit',
        '*': 'Un caillou',
        '?': 'Une potion mystère',
        '!': 'Un sort mystère',
    };

    function update_current_status(handle, hero_pos)
    {
        Object.keys(handle.current_map.item_positions).some(function(item)
        {
            let positions = handle.current_map.item_positions[item];

            for(let i = 0 ; i < positions.length; i++)
            {
                if (pos_equal(positions[i], hero_pos))
                {
                    handle.current_status = item2description[item];

                    if (item !== '$' && handle.current_map_name === 'coop')
                        handle.current_status += ' (' + item2price[item] + '.-)';

                    return true;
                }
            }

            return false;
        });

        handle.current_status = '';
    }

    function try_pick_item(handle, hero_pos)
    {
        if (handle.pickup)
        {
            let item_picked = false;

            Object.keys(handle.current_map.item_positions).some(function(item)
            {
                let positions = handle.current_map.item_positions[item];
                let price = item2price[item];
                let description = item2description[item];

                for(let i = 0 ; i < positions.length; i++)
                {
                    if (pos_equal(positions[i], hero_pos))
                    {
                        if (item === '$')
                        {
                            handle.coins++;
                            positions.splice(i, 1);
                            handle.current_status = description + " pris";
                        }
                        else if (handle.current_map_name !== 'coop' || handle.coins >= price)
                        {
                            handle.inventory.push(item);

                            if (handle.current_map_name === 'coop')
                            {
                                handle.coins -= price;
                                handle.current_status = description + " pris pour " + price + '.-';
                            }
                            else
                                handle.current_status = description + " pris";

                            positions.splice(i, 1);
                        }
                        else
                        {
                            handle.current_status = "Pas assez d'argent!";
                        }

                        item_picked = true;
                        return true;
                    }
                }

                return false;
            });

            if (!item_picked)
                handle.current_status = "Il n'y a rien à prendre.";

            handle.pickup = false;
            return true;
        }

        return false;
    }

    /*
        2) PNJ management
     */
    let pnj2dialog = {
        'J': 'La machine à café est cassée!',
        'r': 'Bonjour!',
        'v': 'On ne peut pas sortir sans payer!',
        'c': "On n'est pas sensé pouvoir me parler!",
        'm': 'Une pièce?',
    };

    function try_talk(handle, future_pos)
    {
        let talked = false;

        Object.keys(handle.pnjs).some(function(pnj) {
            if (pnj === '@')
                return false;

            let pnj_pos = handle.pnjs[pnj];

            if (pos_equal(pnj_pos, future_pos))
            {
                handle.current_status = pnj2dialog[pnj];
                talked = true;
                return true;
            }

            return false;
        });

        return talked;
    }

    let mouvementMap = {
        0: {x: 1, y: 0},
        1: {x: -1, y: 0},
        2: {x: 0, y: 1},
        3: {x: 0, y: -1},
        4: {x: 1, y: 1},
        5: {x: -1, y: 1},
        6: {x: 1, y: -1},
        7: {x: -1, y: -1},
    };

    function get_random_mouvement(pnj)
    {
        let new_pnj = {x: pnj.x, y: pnj.y};
        let r = Math.floor(Math.random() * 16);
        let mouvement = mouvementMap[r];

        if (mouvement !== undefined) {
            new_pnj.x += mouvement.x;
            new_pnj.y += mouvement.y;
        }

        return new_pnj;
    }

    function move_pnjs(handle, future_pos)
    {
        Object.keys(handle.pnjs).forEach(function(p)
        {
            if (p === '@')
                return;

            let pnj = handle.pnjs[p];
            let new_pnj = get_random_mouvement(pnj);

            if (!pos_equal(new_pnj, future_pos) && get_symbol_at(handle, new_pnj) === '.')
                handle.pnjs[p] = new_pnj;
        });
    }

    /*
        3) Hero management
     */
    function move_hero(handle, hero_pos, future_pos)
    {
        let ret = try_teleport(hero_pos, future_pos);

        if (ret.success)
        {
            if (ret.newmap !== undefined)
                change_map(ret.newmap);

            hero_pos = ret.pos;
            handle.pnjs['@'] = ret.pos;
        }
        else
        {
            hero_pos = future_pos;
            handle.pnjs['@'] = future_pos;
        }

        update_current_status(handle, hero_pos);
        return hero_pos;
    }

    function get_future_position(handle, hero_pos)
    {
        let future_pos = {x: hero_pos.x + handle.right - handle.left, y: hero_pos.y + handle.down - handle.up};

        if (get_symbol_at(handle, future_pos) !== '.') {
            if (hero_pos.y === future_pos.y || get_symbol_at(handle, {x: future_pos.x, y: hero_pos.y}) !== '.') {
                if (hero_pos.x === future_pos.y || get_symbol_at(handle, {x: hero_pos.x, y: future_pos.y}) !== '.') {
                    return hero_pos;
                }

                return {x: hero_pos.x, y: future_pos.y};
            }

            return {x: future_pos.x, y: hero_pos.y};
        }

        return future_pos;
    }

    /*
        4) Map management
     */
    function change_map(map_name)
    {
        handle.current_map = maps[map_name];
        handle.current_map_name = map_name;
        handle.map_length = handle.current_map.map_length;
        handle.map_height = handle.current_map.map_height;
        handle.pnjs = {};

        Object.keys(handle.current_map.pnj_positions).forEach(function(pnj) {
            let positions = handle.current_map.pnj_positions[pnj];
            handle.pnjs[pnj] = positions[Math.floor(Math.random() * positions.length)];
        });

        handle.pnjs['@'] = handle.current_map.start;
    }

    change_map(initial_map);

    function try_teleport(hero_pos, future_pos)
    {
        for (let i in handle.current_map.teleports)
        {
            let tp = handle.current_map.teleports[i];

            if (pos_equal(tp, future_pos))
            {
                return {
                    'success': true,
                    'pos': {x: tp.ex + (future_pos.x - hero_pos.x), y: tp.ey + (future_pos.y - hero_pos.y)},
                    'newmap': tp.map,
                    'newstatus': '',
                };
            }
        }

        return {
            'success': false
        }
    }

    function update_on_map(handle)
    {
        let hero_pos = handle.pnjs['@'];
        let future_pos = get_future_position(handle, hero_pos);

        if (try_pick_item(handle, hero_pos))
            return;

        if (try_talk(handle, future_pos))
            return;

        hero_pos = move_hero(handle, hero_pos, future_pos);
        move_pnjs(handle, hero_pos);
    }

    function update_on_inventory(handle) {
        // TODO
    }

    function update_on_help(handle) {
        // Nothing?
    }

    function update_on_journal(handle) {
        // Nothing?
    }

    handle.update = function()
    {
        if (handle.open_inventory)
            update_on_inventory(handle);
        else if (handle.open_help)
            update_on_help(handle);
        else if (handle.open_journal)
            update_on_journal(handle);
        else
            update_on_map(handle);
    };

    function draw_map(handle)
    {
        for(let y = 0; y < handle.map_height; y++)
        {
            for(let x = 0; x < handle.map_length;)
            {
                let length = 0;
                let val = get_symbol_at(handle, {x: x, y: y});

                if (val === ' ' || val === '\n' || val === undefined)
                {
                    x++;
                    continue;
                }

                while(true)
                {
                    length++;

                    let chr = get_symbol_at(handle, {x: x + length, y: y});

                    if (chr !== val)
                        break;
                }

                let coord = to_screen_coord(x, y);
                let str = get_string_from(handle, x, y, length);
                let color = tile2color[val];

                if (color === undefined)
                    color = get_text_color();

                handle.engine.text(str, coord, 16, color);
                x += length;
            }
        }
    }

    function draw_pnjs(handle)
    {
        Object.keys(handle.pnjs).forEach(function(p)
        {
            let pnj = handle.pnjs[p];
            let coord = to_screen_coord(pnj.x, pnj.y);
            let color = pnj2color[p];

            handle.engine.rect(coord, 10, 16, get_background_color());
            handle.engine.text(p, coord, 16, color);
        });
    }

    function draw_items(handle)
    {
        Object.keys(handle.current_map.item_positions).forEach(function(item)
        {
            let positions = handle.current_map.item_positions[item];

            for (let i = 0; i < positions.length; i++)
            {
                let coord = to_screen_coord(positions[i].x, positions[i].y);
                let color = item2color[item];

                handle.engine.rect(coord, 10, 16, get_background_color());
                handle.engine.text(item, coord, 16, color);
            }
        });
    }

    function draw_overlay(handle)
    {
        let text_color = get_text_color();

        handle.engine.text("  > " + handle.current_status, {x: 0, y: engine.reference_height - 48}, 16, text_color);
        handle.engine.text("  PV: 20/20", {x: 0, y: engine.reference_height - 32}, 16, text_color);
    }

    function draw_all(handle)
    {
        draw_map(handle);
        draw_items(handle);
        draw_pnjs(handle);
        draw_overlay(handle);
    }

    function draw_screen(handle, screen)
    {
        // TODO: Items!
        // TODO: Journal!

        let inventory = screens[screen];

        for(let y = 0; y < inventory.map_height; y++)
        {
            for (let x = 0; x < inventory.map_length; x++)
            {
                let start = y * (inventory.map_length + 1);
                handle.engine.text(inventory.map.substring(start, start + inventory.map_length), {x: 0, y: y * 16}, 16, get_text_color());
            }
        }
    }

    handle.draw = function()
    {
        handle.engine.clear(get_background_color());

        if (handle.open_inventory)
            draw_screen(handle, 'inventory');
        else if (handle.open_help)
            draw_screen(handle, 'help');
        else if (handle.open_journal)
            draw_screen(handle, 'journal');
        else
            draw_all(handle);
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
