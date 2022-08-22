/**
 * Static class which governs all icons.
 * @author Matej Hakoš
 *
 * @class Icons
 * @typedef {Icons}
 */
declare class Icons {
    static Reload: string;
    static LeftArrow: string;
    static RightArrow: string;
    static EndArrow: string;
    static StartArrow: string;
    static FullScreen: string;
    static FullScreenToggle: string;
    static AxesHelper: string;
    static getIcons: () => {
        btnStart: string;
        btnLeft: string;
        btnRight: string;
        btnEnd: string;
        btnReload: string;
        btnFullscreen: string;
        btnFullscreenToggle: string;
        axesHelper: string;
    };
}
export { Icons };
