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
    [ 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0 ,0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1 ],
    [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4 ,0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1 ],
    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ,0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
];

function mark_map(handle, newpx, newpy)
{
    handle.map_visitations[newpy][newpx] = true;

    if (newpx + 1 < world_map[0].length)
        handle.map_visitations[newpy][newpx+1] = true;

    if (newpx - 1 >= 0)
        handle.map_visitations[newpy][newpx-1] = true;

    if (newpy + 1 < world_map.length)
    {
        handle.map_visitations[newpy+1][newpx] = true;

        if (newpx + 1 < world_map[0].length)
            handle.map_visitations[newpy+1][newpx+1] = true;

        if (newpx - 1 >= 0)
            handle.map_visitations[newpy+1][newpx-1] = true;
    }

    if (newpy - 1 >= 0)
    {
        handle.map_visitations[newpy-1][newpx] = true;

        if (newpx + 1 < world_map[0].length)
            handle.map_visitations[newpy-1][newpx+1] = true;

        if (newpx - 1 >= 0)
            handle.map_visitations[newpy-1][newpx-1] = true;
    }
}

Labyrinth.new = function() {
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
        map_visitations: Array.from(Array(world_map[0].length), () => new Array(world_map.length))
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

        if (newpx !== handle.px || newpy !== handle.py)
        {
            if (newpx >= 0 && newpx < world_map[0].length
                && newpy >= 0 && newpy < world_map.length)
            {
                let newval = world_map[newpy][newpx];

                if (newval === 0 || newval === 2)
                {
                    handle.px = newpx;
                    handle.py = newpy;

                    mark_map(handle, newpx, newpy);
                }
                else
                    console.log('newval=' + newval);
            }
        }

        handle.was_up = handle.up;
        handle.was_down = handle.down;
        handle.was_left = handle.left;
        handle.was_right = handle.right;
    };

    handle.draw = function(font, engine) {
        for(let y = 0; y < world_map.length; y++)
        {
            for(let x = 0; x < world_map[y].length; x++)
            {
                let val = world_map[y][x];

                if (x === handle.px && y === handle.py)
                {
                    engine.rect(x * 10, y * 10, 10, 10, 0, 128, 128);
                }
                else if (!handle.map_visitations[y][x])
                {
                    engine.rect(x * 10, y * 10, 10, 10, 20, 20, 20);
                }
                else if (val === 0 || val === 2)
                {
                    engine.rect(x * 10, y * 10, 10, 10, 128, 128, 0);
                }
                else if (val === 1)
                {
                    engine.rect(x * 10, y * 10, 10, 10, 128, 0, 128);
                }
                else if (val === 3)
                {
                    engine.rect(x * 10, y * 10, 10, 10, 0, 128, 0);
                }
                else if (val === 4)
                {
                    engine.rect(x * 10, y * 10, 10, 10, 128, 0.0, 0.0);
                }
            }
        }
    };

    return handle;
};

