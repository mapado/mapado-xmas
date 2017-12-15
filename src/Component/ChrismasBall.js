import React from 'react';
import cn from 'classnames';
import config from '../config';

const ChrismasBall = ({ user, giveTo, isOpen, onClick }) => {
  return (
    <article className={cn('user', isOpen && 'active')} onClick={onClick}>
      <div className="present">
        <div className="bauble">
          <img
            src={
              config.keepGifsSecrets ? config.keepGifsSecretsSrc : giveTo.gif
            }
            alt={giveTo.name}
          />
          <span className="name">{giveTo.name}</span>
        </div>
      </div>
      <div className="box">
        <div
          className="img"
          style={{
            backgroundImage: `url(${user.image})`,
            backgroundSize: 'cover',
          }}
        />

        <h2>{user.name}</h2>
      </div>
    </article>
  );
};

export default ChrismasBall;
