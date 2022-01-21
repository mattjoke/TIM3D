const reload = require("../stuff/icons/reload.svg");
const left = require("../stuff/icons/arrow-left.svg");
const start = require("../stuff/icons/arrow-left-circle.svg");
const right = require("../stuff/icons/arrow-right.svg");
const end = require("../stuff/icons/arrow-right-circle.svg");
const fullscreen = require("../stuff/icons/full-screen.svg");

class Icons {
    static Reload = reload;
    static LeftArrow = left;
    static RightArrow = right;
    static EndArrow = end;
    static StartArrow = start;
    static FullScreen = fullscreen;
    static getIcons = () => {
        return {
            btnStart: Icons.StartArrow,
            btnLeft: Icons.LeftArrow,
            btnRight: Icons.RightArrow,
            btnEnd: Icons.EndArrow,
            btnReload: Icons.Reload,
            btnFullscreen: Icons.FullScreen,
        };
    }
}

export default Icons;
