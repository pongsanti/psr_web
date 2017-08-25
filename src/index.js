import React from 'react';
import ReactDOM from 'react-dom';
import SmartTrack from './smart_track';

const component = () => {
  var element = document.createElement('div');
  element.id = 'root';
  return element; 
}

document.body.appendChild(component());
document.body.classList.add('page-header-fixed', 'page-sidebar-closed-hide-logo', 'page-content-white');

ReactDOM.render(
  <SmartTrack />,
  document.getElementById('root')
)