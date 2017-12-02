import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MainMenu from './mainMenu';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allSet: false
    }

    this.user = {};

    this.handleUsername = (event) => {
      if (event.which === 13) {
        // stuff for enter being pressed
        this.setState({
          allSet: true
        })
      }
    }

    this.submitUsername = () => {
      if (this.state.allSet) {
        ReactDOM.render(
          <MainMenu user={ { username: 'KingCosmic' } } />,
          document.getElementById('root')
        );
      }
    }

    this.handleUsername.bind(this);
    this.submitUsername.bind(this);
  }

  render() {
    return (
      <div>

        <h1>Yu Gi Oh: Battle Masters</h1>
        
        <div id="username_wrap" className={(this.state.allSet) ? 'all_set' : ''} onClick={this.submitUsername} >
          <div className="completed">All set!</div>
          <div className="username_label">Set your username</div>
          <input id="username" type="text" placeholder="Coolio!" onKeyPress={this.handleUsername} />
        </div>

        <div className="bg_overlay"></div>
      </div>
    );
  }
}

export default Login;
