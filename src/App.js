import React, { Component } from 'react';
import shuffle from 'lodash/shuffle';
import cn from 'classnames';
import './App.css';
import baseUsers from './Users';
import { GiveToUser } from './UserModel';
import Storage from './Storage';
import config from '../config.json';

if (!window.location.hash) {
  window.location.hash = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}

const storage = new Storage(window.location.hash && window.location.hash.substr(1));


const FAKE_GIF = config.keepGifsSecrets && './images/fake.gif';

let shuffledGiveToUser = storage.getItem('users');
if (!shuffledGiveToUser) {
  const users = storage.getItem('users') || shuffle(baseUsers);

  const giveToUsers = users.map((user, key) => new GiveToUser(user, users[(parseInt(key, 10) + 1) % users.length]));

  shuffledGiveToUser = shuffle(giveToUsers);
  storage.setItem('users', shuffledGiveToUser);
}


const Box = ({ user, giveTo, isOpen, onClick }) => {
  return (
    <article className={cn('user', isOpen && 'active')} onClick={onClick}>
      <div className="box">
        <div className="img" style={{ backgroundImage:`url(${user.image})`, backgroundSize: 'cover' }} />

        <h2>
          {user.name}
        </h2>
      </div>
      <div className="present">
        <div className="bauble">
          <div className="bauble-flex">
            <img src={FAKE_GIF || giveTo.gif} alt={giveTo.name} />
            {true &&
              <span className="name">{giveTo.name}</span>
            }
          </div>
        </div>
      </div>
    </article>
  );
};

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      className: null,
    };
  }

  componentDidMount() {
    setTimeout(() =>
      this.setState({
        className: 'big',
      }),
      0
    );
  }

  render() {
    const { src, onClick, x, y } = this.props;

    return (
      <div className={cn('popup', this.state.className)} onClick={onClick} style={{ top: y, left: x }}>
        <div style={{ backgroundImage: `url(${src})`}} />
        <span className="popup-close">✖</span>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.openUser = this.openUser.bind(this);
    this.onClosePopup = this.onClosePopup.bind(this);

    this.state = {
      openingUser: null,
      openedUsers: storage.getItem('openedUsers') || [],
      popupSrc: null,
      popupX: null,
      popupY: null,
    };
  }

  openUser(giveToUser, event) {
    const user = giveToUser.user;
    const x = event.clientX;
    const y = event.clientY;

    this.setState((prevState) => {
      const openedUsers = prevState.openedUsers;
      openedUsers.push(user);

      storage.setItem('openedUsers', openedUsers);

      return {
        openingUser: user,
        openedUsers,
        popupSrc: FAKE_GIF || giveToUser.giveTo.gif,
        popupX: x,
        popupY: y,
      };
    });
  }

  onClosePopup() {
    this.setState({
      popupSrc: null,
    });
  }

  render() {
    return (
      <div>
        <h1>Mapado Secret GIFt</h1>
        <ol className="instructions">
          <li>Cliquez sur votre nom</li>
          <li>Devinez qui est représenté</li>
          <li>Offrez-lui votre cadeau</li>
        </ol>
        <div className="user-list">
          {shuffledGiveToUser.map((giveToUser, key) =>
            <Box
              key={key}
              giveTo={giveToUser.giveTo}
              user={giveToUser.user}
              onClick={(event) => this.openUser(giveToUser, event)}
              isOpen={this.state.openedUsers.find(u => u.name === giveToUser.user.name)}
            />
          )}
        </div>

        {this.state.popupSrc &&
          <Popup
            src={this.state.popupSrc}
            onClick={this.onClosePopup}
            x={this.state.popupX}
            y={this.state.popupY}
          />
        }
      </div>
    );
  }
}

export default App;
