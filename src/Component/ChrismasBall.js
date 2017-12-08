import React from 'react';
import cn from 'classnames';
import config from '../../config.json';

const ChrismasBall = ({ user, giveTo, isOpen, onClick }) => {
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
            <img src={config.keepGifsSecrets ? config.keepGifsSecretsSrc : giveTo.gif} alt={giveTo.name} />
            {true &&
              <span className="name">{giveTo.name}</span>
            }
          </div>
        </div>
      </div>
    </article>
  );
};

export default ChrismasBall;
