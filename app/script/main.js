console.log('Webpack has started!');

require('../styles/main.scss');

require('../assets/launcher-icon-1x.png');
require('../assets/launcher-icon-2x.png');
require('../assets/launcher-icon-3x.png');
require('../assets/launcher-icon-4x.png');
require('../assets/avatar.png');
require('../assets/others1.png');
require('../assets/others2.png');
require('../assets/others3.png');
require('../assets/others4.png');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
                // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function (err) {
                // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
// Lazy load styles
let loadDeferredStyles = function () {
  let addStylesNode = document.getElementById('deferred-styles');
  let replacement = document.createElement('div');
  replacement.innerHTML = addStylesNode.textContent;
  document.body.appendChild(replacement);
  addStylesNode.parentElement.removeChild(addStylesNode);
};

const lazyloadImages = function () {
  const images = document.querySelectorAll('.gb-card__avatar');
  console.log('lets load images');
  images.forEach((image)=> {
    image.setAttribute('src', image.getAttribute('src').replace('-min', ''));
  });
};
/*
let raf = requestAnimationFrame ||
          document.mozRequestAnimationFrame ||
          document.webkitRequestAnimationFrame ||
          document.msRequestAnimationFrame;

if (raf) {
  raf(function () {
    window.setTimeout(loadDeferredStyles, 0);
  });
} else {*/
window.addEventListener('load', () => {
  loadDeferredStyles();
  lazyloadImages();
});
/* }*/
