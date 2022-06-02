const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

let n = document.getElementById("number_dots").value;
let f_hat; // fourier coeff
let dt = 0.01; // time step
let global_time = 0;
let F = [];
// let F2 = [];


let string_y_coords = [];
for (let i = 0; i <= n; i++){
    string_y_coords[i] = canvas.height/2;
}
let draw_string_init = false;

c.beginPath()
c.rect(0, 0, canvas.width, canvas.height);
c.stroke();
draw_string();

document.getElementById("submit_number").addEventListener("click", function() {
    n = document.getElementById("number_dots").value;
    string_y_coords = [];
    for (let i = 0; i <= n; i++){
        string_y_coords[i] = canvas.height/2;
    }

    draw_string_init = false;
    
    c.beginPath()
    c.rect(0, 0, canvas.width, canvas.height);
    c.stroke();
    draw_string();    
})


function draw_dots_from_list(coords) {
    for (let i = 0; i < coords.length; i++) {
        c.beginPath();
        c.arc(coords[i][0], coords[i][1], 3, 0 , 2*Math.PI);
        c.fillStyle = "black";
        c.fill();
    }
}

function coord_from_central_to_base(coord) {
    let x = coord[0];
    let y = canvas.width / 2 - coord[1];
    return [x, y];
}

function coord_from_base_to_central(coord) {
    let x = coord[0];
    let y = canvas.width / 2 - coord[1];
    return [x, y];
}

function coords_from_central_to_base(coords) {
    ans = [];
    for (let i = 0; i < coords.length; i++) {
        ans.push(coord_from_central_to_base(coords[i]));
    }
}

function coords_from_base_to_central(coords) {
    ans = [];
    for (let i = 0; i < coords.length; i++) {
        ans.push(coord_from_base_to_central(coords[i]));
    }
}

document.querySelector('canvas').addEventListener("mousedown", function(event) {
    // for (let i = 0; i <= n; i++){
    //     string_y_coords[i] = canvas.height/2;
    // }
    draw_string_init = true;
})

document.querySelector('canvas').addEventListener("touchstart", function(event) {
    // for (let i = 0; i <= n; i++){
    //     string_y_coords[i] = canvas.height/2;
    // }
    draw_string_init = true;
})

// document.querySelector('canvas').addEventListener("mouseup", function(event) {
//     draw_string_init = false;
// })

// document.querySelector('canvas').addEventListener("touchend", function(event) {
//     draw_string_init = false;
// })

// document.querySelector('canvas').addEventListener("mouseleave", function(event) {
//     draw_string_init = false;
// })

// document.querySelector('canvas').addEventListener("touchcancel", function(event) {
//     draw_string_init = false;
// })

let mouse_point_x = 0;
let mouse_point_y = canvas.height/2;

canvas.addEventListener("mousemove", function(event) {
    mouse_point_x = event.offsetX;
    mouse_point_y = event.offsetY;

    if (draw_string_init) {
        let cur_i = Math.floor(mouse_point_x / (canvas.width/n));
        if (cur_i != 0) {
            string_y_coords[cur_i] = mouse_point_y;
        }

        draw_string();
    }
})

canvas.addEventListener("touchmove", function(event) {
    mouse_point_x = event.offsetX;
    mouse_point_y = event.offsetY;

    if (draw_string_init) {
        let cur_i = Math.floor(mouse_point_x / (canvas.width/n));
        if (cur_i != 0) {
            string_y_coords[cur_i] = mouse_point_y;
        }

        draw_string();
    }
})

let mouse_click_x = 0;
let mouse_click_y = canvas.height/2;

canvas.addEventListener("click", function(event) {
    mouse_click_x = event.offsetX;
    mouse_click_y = event.offsetY;
});


function draw_string() {
    
    c.beginPath()
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    // c.fill();
    let coords = [];
    let dx = canvas.width/n;
    for (let i = 0; i <= n; i++) {
        coords.push([i*dx, string_y_coords[i]]);
    }
    draw_dots_from_list(coords);
    c.beginPath()
    c.rect(0, 0, canvas.width, canvas.height);
    c.stroke();
}

function string_vibrate() {
    // console.log(string_y_coords);
    window.requestAnimationFrame(string_vibrate);
    string_y_coords = [];
    
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let k = 0; k <= f_hat[0].length / 2; k++) {
            sum += F[k][i]*Math.cos(2*Math.PI*global_time*k);
        }
        string_y_coords.push(canvas.width / 2 - sum);
    }

    // console.log(string_y_coords);
    global_time += dt;
    draw_string();
    
    

    
}

document.getElementById("vibrate").addEventListener("click", function() {
    let coords_y = [];
    for (let i = 0; i <= n; i++) {
        coords_y.push([canvas.width / 2 - string_y_coords[i]]);
    }
    f_hat = dft(coords_y);


    // find F vectors
    F = [];
    // F2 = [];
    let two = new Complex(form = "alg", 2/n, 0);
    for (let k = 0; k <= f_hat[0].length / 2; k++) {
        F.push([]);
        // F2.push([]);
        for (let j = 0; j < string_y_coords.length; j++) {
            let num = Complex.product(f_hat[0][k], new Complex(form = "exp", 1, 2*Math.PI*k*j/n));
            F[k].push(((k != 0) + 1) / n * num.re);
            // F2[k].push(((k != 0) + 1) / n * num.re);
        }
    }
    string_vibrate();
})

