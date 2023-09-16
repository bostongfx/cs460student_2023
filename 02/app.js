/* Cited sources:
    - setInterval documentation: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
    - clearInterval documentation: https://developer.mozilla.org/en-US/docs/Web/API/clearinterval
  */

// Length of cubes and gap between each cube.
const CUBE_SIDELENGTH = 10;
const CUBE_SIDELENGTH_PLACE = 10.1;
const GAP = 2;

// Store camera views.
CAMERAS = [];

// To store the interval ID for setInterval/clearInterval
let intervalID = null;

// Load code once website is fully loaded.
window.onload = function() {

    // Create and initialize 3D cube.
    r = new X.renderer3D();
    r.init();
    c = new X.cube();
    c.lengthX = c.lengthY = c.lengthZ = CUBE_SIDELENGTH_PLACE;
    r.add(c);
    r.render();

    addEventListener("keypress", function(e) {
        switch(e.code) {
            // WASD and EQ movements of the cube.
            case "KeyD": // right.
                c.transform.translateX(-CUBE_SIDELENGTH - GAP);
                break;
            case "KeyA": // left.
                c.transform.translateX(CUBE_SIDELENGTH + GAP);
                break;
            case "KeyW": // up.
                c.transform.translateZ(CUBE_SIDELENGTH + GAP);
                break;
            case "KeyS": // down.
                c.transform.translateZ(-CUBE_SIDELENGTH - GAP);
                break;
            case "KeyQ": // forward.
                c.transform.translateY(CUBE_SIDELENGTH + GAP);
                break;
            case "KeyE": // backward.
                c.transform.translateY(-CUBE_SIDELENGTH - GAP);
                break;
            
            // Change of colors of the cube.
            case "Digit0": // black.
                c.color = [0, 0, 0];
                break;
            case "Digit1": // white.
                c.color = [1, 1, 1];
                break;
            case "Digit2": // red.
                c.color = [1, 0, 0];
                break;
            case "Digit3": // blue.
                c.color = [0, 1, 0];
                break;
            case "Digit4": // green.
                c.color = [0, 0, 1];
                break;
            case "Digit5": // yellow.
                c.color = [1, 1, 0];
                break;
            case "Digit6": // pink.
                c.color = [1, 0, 1];
                break;
            case "Digit7": // cyan.
                c.color = [0, 1, 1];
                break;
            case "Digit8": // orange.
                c.color = [1, 0.65, 0];
                break;
            case "Digit9": // brick.
                c.color = [0.66, 0.3, 0.26];
                break;

            // Create a new cube.
            case "Space":
                new_cube = new X.cube();
                new_cube.color = c.color;
                new_cube.transform.matrix = new Float32Array(c.transform.matrix);
                new_cube.lengthX = new_cube.lengthY = new_cube.lengthZ = CUBE_SIDELENGTH;
                r.add(new_cube);
                break;

            // Download and upload files.
            case "KeyO":
                download();
                break;
            case "KeyL": 
                upload("scene.json");
                break;

            // BONUS: store mult. camera positions and switching between them.
            case "KeyC": // push new camera views.
                CAMERAS.push(new Float32Array(r.camera.view));
                break;
            case "KeyV": // switch between camera views every second. 
                if (intervalID == null) {
                    intervalID = setInterval(switchCamera, 1000);
                } else {
                    // If 'V' is pressed again, 
                    // stop loop and leave camera view where it is.
                    clearInterval(intervalID);
                    intervalID = null;
                }
                break;
            default:
                break;
        }
    });

    // Keep track of camera view within CAMERAS.
    let currCamIndex = 0;

    // Helper function to switch camera views.
    function switchCamera() {
        // If there are no camera views, return.
        if (CAMERAS.length == 0) {
            return;
        }
        
        // If we reached to the end of the CAMERAS list, 
        // reset to the first camera view to reset the looping.
        if (currCamIndex >= CAMERAS.length) {
            currCamIndex = 0;
        }
        
        // Update the camera view and go to the next camera view.
        r.camera.view = CAMERAS[currCamIndex];
        currCamIndex++;
    }
}