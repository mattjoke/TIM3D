import axes from './icons/axis.svg';
import end from './icons/arrow-right-circle.svg';
import fullscreen from './icons/full-screen.svg';
import fullscreenToggle from './icons/full-screen-toggle.svg';
import left from './icons/arrow-left.svg';
import reload from './icons/reload.svg';
import right from './icons/arrow-right.svg';
import start from './icons/arrow-left-circle.svg';

/**
 * Static class which governs all icons.
 * @author Matej Hakoš
 *
 * @class Icons
 * @typedef {Icons}
 */
class Icons {
  static Reload = reload;
  static LeftArrow = left;
  static RightArrow = right;
  static EndArrow = end;
  static StartArrow = start;
  static FullScreen = fullscreen;
  static FullScreenToggle = fullscreenToggle;
  static AxesHelper = axes;

  static getIcons = () => {
    return {
      btnStart: Icons.StartArrow,
      btnLeft: Icons.LeftArrow,
      btnRight: Icons.RightArrow,
      btnEnd: Icons.EndArrow,
      btnReload: Icons.Reload,
      btnFullscreen: Icons.FullScreen,
      btnFullscreenToggle: Icons.FullScreenToggle,
      axesHelper: Icons.AxesHelper
    };
  };
}

export { Icons };
