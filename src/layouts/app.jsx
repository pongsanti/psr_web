import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import SmartTrack from './smart_track';

class App extends Component {
  render () {
    return (
      <div>
        <nav>
          <Link to='/index'>Index</Link>
        </nav>
        <div>
          <Route path='/index' component={SmartTrack}/>
        </div>
      </div>
    )
  }
}

export default App;
