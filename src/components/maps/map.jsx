import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='portlet light bordered'
        style={{width: '80%', height: '768px'}}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={13.736717}
            lng={100.523186}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    )
  }
}

Map.defaultProps = {
  center: {lat: 13.736717, lng: 100.523186},
  zoom: 6
}

export default Map;
