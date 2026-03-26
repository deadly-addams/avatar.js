// === AVATAR COMPLETE MOD WITH COMBAT AI ===

// ---------------- ELEMENTS ----------------

elements.fire_bend = {
    color: "#ff5a1f",
    behavior: behaviors.GAS,
    temp: 700,
    category: "avatar",
};

elements.water_bend = {
    color: "#4aa3ff",
    behavior: behaviors.LIQUID,
    category: "avatar",
};

elements.air_bend = {
    color: "#d9f7ff",
    behavior: [
        "M2|M1|M2",
        "M1|XX|M1",
        "M2|M1|M2",
    ],
    state: "gas",
    category: "avatar",
};

elements.earth_bend = {
    color: "#7a5c3a",
    behavior: behaviors.POWDER,
    density: 2500,
    category: "avatar",
};

// ---------------- WEAPON ----------------

elements.katana = {
    color: "#c0c0c0",
    behavior: behaviors.WALL,
    category: "weapons",
    reactions: {
        "fire_bender": { elem2: "blood" },
        "water_bender": { elem2: "blood" },
        "earth_bender": { elem2: "blood" },
        "air_bender": { elem2: "blood" },
        "katara": { elem2: "blood" },
        "aang": { elem2: "blood" },
    }
};

// ---------------- AI HELPERS ----------------

function findTarget(pixel, radius=6) {
    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            let x = pixel.x + dx;
            let y = pixel.y + dy;

            if (!isEmpty(x,y,true)) {
                let target = pixelMap[x][y];
                if (target && target.element !== pixel.element) {
                    return target;
                }
            }
        }
    }
    return null;
}

function shoot(pixel, target, elem) {
    let dx = Math.sign(target.x - pixel.x);
    let dy = Math.sign(target.y - pixel.y);

    let x = pixel.x + dx;
    let y = pixel.y + dy;

    if (isEmpty(x,y)) {
        createPixel(elem, x, y);
    }
}

// ---------------- BENDERS ----------------

elements.fire_bender = {
    color: "#ffb347",
    category: "avatar",
    behavior: behaviors.WALL,
    tick: function(pixel) {
        let target = findTarget(pixel);

        if (target && Math.random() < 0.6) {
            shoot(pixel, target, "fire_bend");
        } else if (Math.random() < 0.2) {
            let x = pixel.x + (Math.random()<0.5?-1:1);
            if (isEmpty(x,pixel.y)) createPixel("fire_bend", x, pixel.y);
        }
    }
};

elements.water_bender = {
    color: "#66ccff",
    category: "avatar",
    behavior: behaviors.WALL,
    tick: function(pixel) {
        let target = findTarget(pixel);

        if (target && Math.random() < 0.6) {
            shoot(pixel, target, "water_bend");
        }
    }
};

elements.earth_bender = {
    color: "#8b6f47",
    category: "avatar",
    behavior: behaviors.WALL,
    tick: function(pixel) {
        let target = findTarget(pixel);

        if (target && Math.random() < 0.5) {
            shoot(pixel, target, "earth_bend");
        } else {
            let y = pixel.y + 1;
            if (isEmpty(pixel.x,y)) createPixel("earth_bend", pixel.x, y);
        }
    }
};

elements.air_bender = {
    color: "#e6ffff",
    category: "avatar",
    behavior: behaviors.WALL,
    tick: function(pixel) {
        let target = findTarget(pixel);

        if (target && Math.random() < 0.7) {
            shoot(pixel, target, "air_bend");
        }
    }
};

// ---------------- CHARACTERS ----------------

elements.aang = {
    color: "#ffe0b3",
    category: "avatar",
    behavior: behaviors.WALL,
    tick: function(pixel) {
        let target = findTarget(pixel);
        let types = ["fire_bend","water_bend","earth_bend","air_bend"];

        if (target && Math.random() < 0.8) {
            let type = types[Math.floor(Math.random()*types.length)];
            shoot(pixel, target, type);
        }
    }
};

elements.katara = {
    color: "#66ccff",
    category: "avatar",
    behavior: behaviors.WALL,
    tick: function(pixel) {
        let target = findTarget(pixel);

        if (target && Math.random() < 0.7) {
            shoot(pixel, target, "water_bend");
        } else if (Math.random() < 0.2) {
            let y = pixel.y - 1;
            if (isEmpty(pixel.x,y)) createPixel("water_bend", pixel.x, y);
        }
    }
};

// ---------------- APPA ----------------

elements.appa = {
    color: "#f5f5dc",
    category: "avatar",
    behavior: [
        "M1|M1|M1",
        "M1|XX|M1",
        "M1|M1|M1",
    ],
    tick: function(pixel) {
        if (Math.random() < 0.3) {
            let y = pixel.y + 1;
            if (isEmpty(pixel.x,y)) {
                createPixel("air_bend", pixel.x, y);
            }
        }
    }
};

// ---------------- NATIONS ----------------

elements.fire_nation = {
    color: "#aa0000",
    behavior: behaviors.WALL,
    category: "avatar"
};

elements.water_tribe = {
    color: "#0044aa",
    behavior: behaviors.WALL,
    category: "avatar"
};

elements.earth_kingdom = {
    color: "#556b2f",
    behavior: behaviors.WALL,
    category: "avatar"
};

elements.air_nomads = {
    color: "#ddddaa",
    behavior: behaviors.WALL,
    category: "avatar"
};