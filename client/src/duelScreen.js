import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

class DuelScreen extends Component {

  render() {
    return (
      <div id="versus_clash">
        <div className="challenger">
          <div className="skill bam"></div>
          <p>{this.props.challenger.username}</p>
          <ul>
            <li className="win"></li>
            <li className=""></li>
            <li className=""></li>
            <li></li>
            <li></li>
          </ul>
        </div>

        <p className="vs">VS</p>

        <div className="defender">
          <div className="skill vet"></div>
          <p>{this.props.defender.username}</p>
          <ul>
            <li className="win"></li>
            <li className="win"></li>
            <li className=""></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default DuelScreen;
