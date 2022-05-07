import { ComputedPostions, ObjectID } from '../types/applicationTypes';

import { Color } from 'three';

/**
 * Checks if input is parsable color.
 * @author Matej Hakoš
 *
 * @param {(string | Color)} color
 * @return {boolean}
 */
const isColor = (color: string | Color) => {
  if (!(color instanceof Color)) {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
  }
  return true;
};

/**
 * Parse file extension from file path.
 * @author Matej Hakoš
 *
 * @deprecated
 * @param {ObjectID} filename
 * @return {string}
 */
const parseExtension = (filename: ObjectID) => {
  return filename.toString().split('.').pop();
};

/* eslint-disable*/
/**
 * Checks if document is already in fullscreen.
 * (Note: @ts-ignore is required because of unsupported types.)
 * @author Matej Hakoš
 *
 * @param {?Document} [document]
 * @return{boolean}
 */
const checkFullscreen = (document?: Document) => {
  if (document == null) {
    return false;
  }
  return (
    document.fullscreenElement ||
    // @ts-ignore
    document.webkitIsFullscreen || // Webkit browsers
    // @ts-ignore
    document.mozFullScreen || // Firefox
    // @ts-ignore
    document.msFullscreenElement !== undefined
  ); // IE
};
/* eslint-enable*/

/**
 * Generated (pseudo)random color.
 * @author Matej Hakoš
 *
 * @return {number}
 */
const generateRandomColor = () => {
  return Math.random() * 0xffffff;
};

/**
 * Generates random color from list of known css colors.
 * @author Matej Hakoš
 *
 * @return {string}
 */
const generateRandomSeededColor = () => {
  const colors = [
    'aliceblue',
    'antiquewhite',
    'aqua',
    'aquamarine',
    'azure',
    'beige',
    'bisque',
    'black',
    'blanchedalmond',
    'blue',
    'blueviolet',
    'brown',
    'burlywood',
    'cadetblue',
    'chartreuse',
    'chocolate',
    'coral',
    'cornflowerblue',
    'cornsilk',
    'crimson',
    'cyan',
    'darkblue',
    'darkcyan',
    'darkgoldenrod',
    'darkgray',
    'darkgreen',
    'darkgrey',
    'darkkhaki',
    'darkmagenta',
    'darkolivegreen',
    'darkorange',
    'darkorchid',
    'darkred',
    'darksalmon',
    'darkseagreen',
    'darkslateblue',
    'darkslategray',
    'darkslategrey',
    'darkturquoise',
    'darkviolet',
    'deeppink',
    'deepskyblue',
    'dimgray',
    'dimgrey',
    'dodgerblue',
    'firebrick',
    'floralwhite',
    'forestgreen',
    'fuchsia',
    'gainsboro',
    'ghostwhite',
    'gold',
    'goldenrod',
    'gray',
    'green',
    'greenyellow',
    'grey',
    'honeydew',
    'hotpink',
    'indianred',
    'indigo',
    'ivory',
    'khaki',
    'lavender',
    'lavenderblush',
    'lawngreen',
    'lemonchiffon',
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgray',
    'lightgreen',
    'lightgrey',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightslategray',
    'lightslategrey',
    'lightsteelblue',
    'lightyellow',
    'lime',
    'limegreen',
    'linen',
    'magenta',
    'maroon',
    'mediumaquamarine',
    'mediumblue',
    'mediumorchid',
    'mediumpurple',
    'mediumseagreen',
    'mediumslateblue',
    'mediumspringgreen',
    'mediumturquoise',
    'mediumvioletred',
    'midnightblue',
    'mintcream',
    'mistyrose',
    'moccasin',
    'navajowhite',
    'navy',
    'oldlace',
    'olive',
    'olivedrab',
    'orange',
    'orangered',
    'orchid',
    'palegoldenrod',
    'palegreen',
    'paleturquoise',
    'palevioletred',
    'papayawhip',
    'peachpuff',
    'peru',
    'pink',
    'plum',
    'powderblue',
    'purple',
    'rebeccapurple',
    'red',
    'rosybrown',
    'royalblue',
    'saddlebrown',
    'salmon',
    'sandybrown',
    'seagreen',
    'seashell',
    'sienna',
    'silver',
    'skyblue',
    'slateblue',
    'slategray',
    'slategrey',
    'snow',
    'springgreen',
    'steelblue',
    'tan',
    'teal',
    'thistle',
    'tomato',
    'turquoise',
    'violet',
    'wheat',
    'white',
    'whitesmoke',
    'yellow',
    'yellowgreen'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Creates a deep copy of Map.
 *
 * @param {ComputedPostions} obj
 * @return {ComputedPostions}
 */
const deepCopyMap = (obj: ComputedPostions) => {
  return new Map(JSON.parse(JSON.stringify([...obj]))) as ComputedPostions;
};

export {
  isColor,
  parseExtension,
  checkFullscreen,
  deepCopyMap,
  generateRandomColor,
  generateRandomSeededColor
};
