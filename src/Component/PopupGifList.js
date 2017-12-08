import React, { PureComponent } from 'react';
import Popup from './Popup';

class PopupGifList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.currentIndex + 1 < this.props.gifList.length) {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1,
      }));
    } else {
      return this.props.onClose();
    }
  }

  render() {
    return (
      <Popup
        src={this.props.gifList[this.state.currentIndex]}
        onClick={this.handleClick}
        x={this.props.x}
        y={this.props.y}
      />
    );
  };
}

export default PopupGifList;
