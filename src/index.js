import Renderer from './layouts/renderer'

const component = () => {
  var element = document.createElement('div');
  element.id = 'root';
  return element; 
}
document.body.appendChild(component());

new Renderer().renderLogin();