import es6promise from 'es6-promise';
es6promise.polyfill();

import 'isomorphic-fetch';
import Renderer from './layouts/renderer'

// Global broken module scripts
// import 'script-loader!./assets/global/plugins/jquery.min.js';
// import 'script-loader!./assets/global/plugins/bootstrap/js/bootstrap.min.js';
// import 'script-loader!./assets/global/plugins/ladda/spin.min.js';
// import 'script-loader!./assets/global/plugins/ladda/ladda.min.js';

const component = () => {
  var element = document.createElement('div');
  element.id = 'root';
  return element; 
}
document.body.appendChild(component());

global.st_renderer = new Renderer();
global.st_renderer.renderLogin();