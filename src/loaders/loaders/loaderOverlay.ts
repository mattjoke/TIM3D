import '../loaders/loader.css';

/**
 * Creates overlay div and plays loading animation.
 * @author Matej Hakoš
 *
 * @return {HTMLDivElement}
 */
const loaderOverlay = () => {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.innerText = 'Loading...';

  div.innerHTML =
    '<div class="loader-container"><div class="loader">Loading...</div></div>';

  div.style.pointerEvents = 'none';
  div.style.top = '0';
  div.style.width = 'inherit';
  div.style.height = 'inherit';
  div.style.backgroundColor = 'white';

  return div;
};

export { loaderOverlay };
