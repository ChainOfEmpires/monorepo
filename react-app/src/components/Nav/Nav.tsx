import React from 'react';
import gold from '../../images/gold.png';
import stamina from '../../images/stamina.png';
import claimActive from '../../images/claim-active.png';
import logo from '../../images/logo.png';
import Login from '../Login/Login';
import HowToPlay from '../HowToPlay/HowToPlay';
import './nav.scss';

import claimDisabled from '../../images/claim-inactive.png';
import secondsToHm from '../../utils/secondsToHm';

function Nav({
               myStamina,
               myGold,
               claimStamina,
               lastStaminaClaimed,
               register,
               registered,
             }) {
  const getCooldownString = (lastClaimedDate) => {
    const cooldown = Number(lastClaimedDate) + (8 * 60 * 60); // 8 Hours
    const { hours, minutes } = secondsToHm(cooldown);
    if (hours === 0 && minutes === 0) return '';
    let hourString = hours > 1 ? 'hours' : 'hour'
    let minuteString = hours > 1 ? 'minutes' : 'minute'

    return `${hours > 0
      ? `${String(hours)} ${hourString} ${minutes > 0 ? ' and ' : ''}`
      : ''} 
      ${minutes > 0
      ? `${String(minutes).padStart(2, '0')} ${minuteString}`
      : ''}`;

  };

  return (
    <div className="nav">
      <img className="nav-logo" src={logo} alt="Chains of Empire logo"/>
      <div className="nav-middle">
        <div className="gold-container">
          <img className="gold" src={gold} alt=""/>
          <p className="gold-number">{myGold}</p>
        </div>
        <div className="stamina-container">
          <img className="stamina" src={stamina} alt=""/>
          <p className="stamina-number">{myStamina}</p>
        </div>
        <div className="claim-container">
          <span onClick={claimStamina}>
            <img
              className="claim"
              src={!getCooldownString(lastStaminaClaimed) ? claimActive : claimDisabled}
              alt="Claim stamina icon"
            />
          </span>
          <p className="claim-timeout">
            {getCooldownString(lastStaminaClaimed)
              ? getCooldownString(lastStaminaClaimed)
              : 'Claim Ready'}
          </p>
        </div>
      </div>
      <div className="nav-right">
        <HowToPlay/>
        <Login/>
        {registered === false && (
          <button type="button" className="btn btn-purple btn-register"
                  onClick={() => register()}>REGISTER</button>
        )}
      </div>
    </div>
  );
}

export default Nav;
