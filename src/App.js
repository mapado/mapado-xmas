import React, { PureComponent } from 'react';
import shuffle from 'lodash/shuffle';
import './App.css';
import baseUsers from './Users';
import { GiveToUser } from './UserModel';
import Storage from './Storage';
import config from '../config.json';
import ChrismasTree from './Component/ChrismasTree'

if (!window.location.hash) {
  window.location.hash = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}

const storage = new Storage(window.location.hash && window.location.hash.substr(1));
const FAKE_GIF = config.keepGifsSecrets ? './images/fake.gif' : null;

let shuffledGiveToUser = storage.getItem('users');
if (!shuffledGiveToUser) {
  const users = storage.getItem('users') || shuffle(baseUsers);

  const giveToUsers = users.map((user, key) => new GiveToUser(user, users[(parseInt(key, 10) + 1) % users.length]));

  shuffledGiveToUser = shuffle(giveToUsers);
  storage.setItem('users', shuffledGiveToUser);
}

class App extends PureComponent {
  render() {
    return <ChrismasTree
      fakeGif={FAKE_GIF}
      users={shuffledGiveToUser}
      storage={storage}
    />
  }
}

export default App;
