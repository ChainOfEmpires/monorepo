import React from 'react';
import { Flex, Link } from '@chakra-ui/react';

import staminaSmall from '../../images/stamina-small.png';
import soldierSmall from '../../images/soldier-small.png';
import discordLogo from '../../images/discord-logo.svg';
import twitterLogo from '../../images/twitter-logo.svg';
import './footer.scss';

function Footer({
                  attackingUnits,
                  handleAttackingUnits,
                  deployingUnits,
                  handleDeployingUnits,
                  confirmAction,
                  deployUnits,
                  fromX,
                  fromY,
                  toX,
                  toY,
                  attacking,
                  handleAttackButton,
                }) {
  return (
    <div className="footer">
      <div className="footer-left">
        <Flex alignItems="center" width="100%" justifyContent="flex-start">
          <Link href="https://discord.gg/zc73K4kM" target="_blank" marginRight={6} marginLeft={6}>
            <img src={discordLogo} alt="Discord logo" width={32}/>
          </Link>
          <Link href="https://twitter.com" target="_blank">
            <img src={twitterLogo} alt="Twitter logo" width={32}/>
          </Link>
        </Flex>
      </div>
      <div className="footer-middle">
        <div className="deploy-container">
          <img className="stamina-small" src={staminaSmall} alt="Stamina"/>
          <input
            className="stamina-input"
            value={deployingUnits > 0 ? deployingUnits : ''}
            onChange={handleDeployingUnits}
          />
          <button
            type="button"
            className="btn deploy-btn"
            onClick={() => deployUnits()}
            disabled={!(fromX && fromY)}
            style={
              fromX !== null && fromX !== undefined && fromY !== null && fromY !== undefined
                ? { backgroundColor: '#ed9b28' }
                : { backgroundColor: 'gray' }
            }
          >
            DEPLOY
          </button>
        </div>

        <div className="action-container">
          <img className="soldier-small" src={soldierSmall} alt="Soldier"/>
          <input
            className="units-input"
            value={attackingUnits > 0 ? attackingUnits : ''}
            onChange={handleAttackingUnits}
          />
          <button
            type="button"
            className="btn attack-btn"
            onClick={handleAttackButton}
            disabled={!(fromX !== null && fromX !== undefined && fromY !== null && fromY !== undefined)}
            style={
              fromX !== null && fromX !== undefined && fromY !== null && fromY !== undefined
                ? { backgroundColor: '#ed9b28' }
                : { backgroundColor: 'gray' }
            }
          >
            {attacking ? 'BACK' : 'ATTACK/MOVE'}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => confirmAction()}
            disabled={!(toX !== null && toX !== undefined && toY !== null && toY !== undefined)}
            style={
              toX !== null && toX !== undefined && toY !== null && toY !== undefined
                ? { backgroundColor: '#ed9b28' }
                : { backgroundColor: 'gray' }
            }
          >
            EXECUTE
          </button>
        </div>
      </div>
      <div className="footer-right"/>
    </div>
  );
}

export default Footer;
