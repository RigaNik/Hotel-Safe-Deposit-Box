import React from 'react';
import './SafeBoxKey.scss';

const SafeBoxKey = props => {
  const { padKey, keyAction, disabled } = props;

  return (
    <div className={disabled ? 'sdb--button sdb--button--disabled' : 'sdb--button'} aria-disabled={disabled} onClick={() => keyAction(padKey)}>
      <p className="sdb--button--paragraph">{padKey}</p>
    </div>
  );
};

export default SafeBoxKey;
