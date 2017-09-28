import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

const AnyReactComponent = ({ comp }) => <div>{comp}</div>;

class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
      center: props.center,
      zoom: props.zoom
    }
  }

  componentWillReceiveProps (nextProps) {
    const {location} = nextProps

    if (location) {
      this.setState({
        center: {lat: location.latitude, lng: location.longitude},
        zoom: 8
      })
    }
  }

  render () {
    const {location} = this.props
    return (
      <div className='portlet light bordered'
        style={{width: '100%', height: '768px'}}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom} 
          center={this.state.center}
          zoom={this.state.zoom}
        >
          { location &&
            <AnyReactComponent
              lat={location.latitude}
              lng={location.longitude}
              comp={<i className='fa fa-map-marker fa-3x'
                style={{color: 'red'}} />}
            />
          }
        </GoogleMapReact>
      </div>
    )
  }
}

Map.defaultProps = {
  center: {lat: 13.736717, lng: 100.523186},
  zoom: 6
}

Map.propTypes = {
  location: PropTypes.object
}

export default Map;
