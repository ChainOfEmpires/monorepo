import React, { useEffect, useState } from 'react';
import genColor from '../../utils/genColor';
import './leaderboard.scss';
import territoryXSmall from '../../images/territory-xsmall.svg';
import { Flex } from '@chakra-ui/react';

function Leaderboard({ map }) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (map?.length >= 32) {
      const territoriesByAccounts = map.reduce((hash, mapRow) => {
        mapRow.forEach((row) => {
          const tileOwner = row[0];
          if (tileOwner !== '0x0000000000000000000000000000000000000000') {
            if (hash[tileOwner]) {
              hash[tileOwner].push(row);
            } else {
              // eslint-disable-next-line no-param-reassign
              hash[tileOwner] = [row];
            }
          }
        });

        return hash;
      }, {});

      const mappedTerritories = [];

      Object.keys(territoriesByAccounts).forEach((account) => {
        mappedTerritories.push({
          color: `#${genColor(account)}`,
          address: account.replace(account.substring(6, account.length - 5), '...'),
          territories: territoriesByAccounts[account],
        });
      });

      mappedTerritories.sort((accA, accB) => accB.territories.length - accA.territories.length);

      setLeaderboard(mappedTerritories.slice(0, 10));
    }
  }, [map]);

  return (
    <div className="leaderboard custom-scrollbar">
      <div className="leaderboard-title">Leaderboard</div>
      {leaderboard.map((account) => (
        <div className="leaderboard-item" key={account.address}>
          <Flex alignItems="center">
            <span className="leaderboard-item-bullet" style={{ backgroundColor: account.color || 'white' }} />
            <span className="leaderboard-item-account">{account.address}</span>
          </Flex>
          <span className="leaderboard-item-territories">
            <img src={territoryXSmall} alt="Territory" />
            {String(account.territories.length).padStart(2, '0')}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
