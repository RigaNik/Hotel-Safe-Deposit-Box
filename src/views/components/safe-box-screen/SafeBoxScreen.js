import React from 'react';
import './SafeBoxScreen.scss';

const SafeBoxScreen = props => {
  const { lock, status, password, idle } = props;
  return (
    <div className={!idle ? 'sdb--screen' : 'sdb--screen sdb--screen--idle'}>
      <p className="sdb--screen--lock">{!lock ? 'Unlocked' : 'Locked'}</p>
      <p className="sdb--screen--state">{!password.length ? status : password}</p>
    </div>
  );
};

export default SafeBoxScreen;
