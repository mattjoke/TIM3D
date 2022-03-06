import { Color } from 'three';
import { ObjectID } from '../types/applicationTypes';

/**
 * Description placeholder
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
 * Description placeholder
 * @author Matej Hakoš
 *
 * @param {ObjectID} filename
 * @return {*}
 */
const parseExtension = (filename: ObjectID) => {
  return filename.toString().split('.').pop();
};

// TS igonre for Typescript unknown functions
/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @param {?Document} [document]
 * @return {*}
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

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @return {number}
 */
const generateRandomColor = () => {
  return Math.random() * 0xffffff;
};

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @return {*}
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

export {
  isColor,
  parseExtension,
  checkFullscreen,
  generateRandomColor,
  generateRandomSeededColor
};
