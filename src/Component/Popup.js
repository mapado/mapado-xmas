import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

class Popup extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      className: null,
    };
  }

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          className: 'big',
        }),
      0
    );
  }

  render() {
    const { src, onClick, x, y } = this.props;

    return (
      <div
        className={cn('popup', this.state.className)}
        onClick={onClick}
        style={{ top: y, left: x }}
      >
        <div style={{ backgroundImage: `url(${src})` }} />
        <span className="popup-close">{this.props.closeIcon}</span>
      </div>
    );
  }
}

Popup.defaultProps = {
  closeIcon: '✖',
};

Popup.propTypes = {
  closeIcon: PropTypes.string,
};

export default Popup;
