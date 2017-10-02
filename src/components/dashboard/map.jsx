import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

const Marker = ({ comp }) => <div>{comp}</div>;

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

  markers (locations) {
    return locations.map(loc => this.marker(loc));
  }

  iconSize (loc) {
    const {hoverLocation} = this.props;
    return (hoverLocation 
      && loc.user_truck_id === this.props.hoverLocation.user_truck_id) ? 'fa-4x' : 'fa-3x';
  }

  marker (location) {
    const iconClass = 'fa fa-map-marker'
    const iconSize = this.iconSize(location);
    const className = `${iconClass} ${iconSize}`
    return (
      <Marker
        key={location.user_truck_id}
        lat={location.latitude}
        lng={location.longitude}
        comp={<i className={className}
          style={{color: 'red'}} />}
      />
    )
  }

  render () {
    const {locations} = this.props
    return (
      <div className='portlet light bordered'
        style={{width: '100%', height: '768px'}}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom} 
          center={this.state.center}
          zoom={this.state.zoom}
        >
          {this.markers(locations)}
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
  locations: PropTypes.arrayOf(PropTypes.object),
  hoverLocation: PropTypes.object,
}

export default Map;
