// Constant.
const CUBE_SIDELENGTH = 10;
const GAP = 2;

window.onload = function() {
    r = new X.renderer3D();
    r.init();
    c = new X.cube();
    c.lengthX = c.lengthY = c.lengthZ = CUBE_SIDELENGTH + 0.01;
    r.add(c);
    r.render();

    addEventListener("keypress", function(e) {
        switch(e.code) {
            // WASD and EQ movements of the cube.
            case "KeyD":
                c.transform.translateX(-CUBE_SIDELENGTH - GAP);
                break;
            case "KeyA":
                c.transform.translateX(CUBE_SIDELENGTH + GAP);
                break;
            case "KeyW":
                c.transform.translateZ(CUBE_SIDELENGTH + GAP);
                break;
            case "KeyS":
                c.transform.translateZ(-CUBE_SIDELENGTH - GAP);
                break;
            case "KeyQ":
                c.transform.translateY(CUBE_SIDELENGTH + GAP);
                break;
            case "KeyE":
                c.transform.translateY(-CUBE_SIDELENGTH - GAP);
                break;
            
            // Change of colors of the cube.
            case "Digit0":
                c.color = [0, 0, 0];
                break;
            case "Digit1":
                c.color = [1, 1, 1];
                break;
            case "Digit2":
                c.color = [1, 0, 0];
                break;
            case "Digit3":
                c.color = [0, 1, 0];
                break;
            case "Digit4":
                c.color = [0, 0, 1];
                break;
            case "Digit5":
                c.color = [1, 1, 0];
                break;
            case "Digit6":
                c.color = [1, 0, 1];
                break;
            case "Digit7":
                c.color = [0, 1, 1];
                break;
            case "Digit8":
                c.color = [1, 0.65, 0]; // orange
                break;
            case "Digit9":
                c.color = [0.66, 0.3, 0.26]; // brick
                break;

            // Create a new cube.
            case "Space":
                new_cube = new X.cube();
                new_cube.color = c.color;
                new_cube.transform.matrix = new Float32Array(c.transform.matrix);
                new_cube.lengthX = new_cube.lengthY = new_cube.lengthZ = CUBE_SIDELENGTH;
                r.add(new_cube);
                break;

            // Download and upload buttons.
            case "KeyO":
                download();
                break;
            case "KeyL":
                upload("scene.json");
                break;
            default:
                break;
        }
    });
}