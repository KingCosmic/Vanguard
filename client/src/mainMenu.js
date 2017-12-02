import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DuelScreen from './duelScreen';

class mainMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allSet: false
    }

    this.user = props.user;

    this.battleClick = () => {
      ReactDOM.render(
        <DuelScreen challenger={{
          username: 'KingCosmic'
        }} defender={{
          username: 'akinghasnoname'
        }} />,
        document.getElementById('root')
      )
    }

    this.battleClick.bind(this);

  }

  render() {
    return (
      <div>

        <h1 className='bm_menu'>Yu Gi Oh: Battle Masters</h1>
        
        <div id="username_wrap" className='hide' >
          <div className="completed">All set!</div>
          <div className="username_label">{this.user.username}</div>
          <input id="username" type="text" placeholder="Coolio!" />
        </div>

        <div className="main_menu_wrap">
          <ul>
            <li onClick={this.battleClick} >Battle</li>
            <li>History<div>Not quite there yet...</div></li>
            <li>Decks</li>
            <li>Settings</li>
          </ul>
        </div>

        <div className="bg_overlay"></div>
      </div>
    );
  }
}

export default mainMenu;
