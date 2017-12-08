import React, { PureComponent, PropTypes } from 'react';
import PopupGifList from './PopupGifList'
import ChrismasBall from './ChrismasBall'

class ChrismasTree extends PureComponent {
  static propTypes = {
    storage: PropTypes.object.isRequired,
    fakeGif: PropTypes.string,
    users: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleOpenPopup = this.handleOpenPopup.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);

    this.state = {
      openingUser: null,
      openedUsers: this.props.storage.getItem('openedUsers') || [],
      popup : null,
      popupSrc: null,
      popupX: null,
      popupY: null,
    };
  }

  handleOpenPopup(giveToUser) {
    return (event) => {
      const user = giveToUser.user;
      const x = event.clientX;
      const y = event.clientY;

      this.setState((prevState) => {
        const openedUsers = prevState.openedUsers;
        openedUsers.push(user);

        this.props.storage.setItem('openedUsers', openedUsers);

        return {
          openingUser: user,
          openedUsers,
          currentGifIndex: 0,
          popup: {
            gifList: this.props.fakeGif ? [this.props.fakeGif] : giveToUser.giveTo.gifList,
            startX: x,
            startY: y,
          }
        };
      });
    };
  }

  handleClosePopup() {
    this.setState({
      popup: null,
    });
  }

  render() {
    return (
      <div>
        <h1>Mapado Secret GIFt</h1>
        <ul className="instructions">
          <li>Cliquez sur votre nom</li>
          <li>Devinez qui est représenté</li>
          <li>Offrez-lui votre cadeau</li>
        </ul>
        <div className="user-list">
          {this.props.users.map((giveToUser, key) =>
            <ChrismasBall
              key={key}
              fakeGif={this.props.fakeGif}
              giveTo={giveToUser.giveTo}
              user={giveToUser.user}
              onClick={this.handleOpenPopup(giveToUser)}
              isOpen={this.state.openedUsers.find(u => u.name === giveToUser.user.name)}
            />
          )}
        </div>

        {this.state.popup &&
          <PopupGifList
            gifList={this.state.popup.gifList}
            onClose={this.handleClosePopup}
            x={this.state.popup.startX}
            y={this.state.popup.startY}
          />
        }
      </div>
    );
  }
}

export default ChrismasTree;
