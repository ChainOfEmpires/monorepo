import React, { useState } from 'react';
import SpecialCard from '../SpecialCard/SpecialCard';
import './special-menu.scss';

function SpecialsMenu({
  attackSpecial0, special0, buySpecial, connected,
}) {
  const specials = [{
    title: 'LONG DISTANCE ATTACK',
    description: 'This attack allows you to attack a territory 5 blocks away.',
    image: null,
    cost: 50,
    owned: special0,
    available: true,
  }/* , {
    title: 'STASIS',
    image: 'COMING SOON',
    description: `While active, this special will make your territory invulnerable to attacks,
    but your troops will not be able to attack or move another territory.`,
    cost: 50,
    owned: 0,
    available: false
  } */
 ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`specials-menu-wrapper ${isOpen ? 'open' : ''}`}>
      <div className="specials-menu-container">
        <div className="specials-menu-list">
          {specials.map((special) => (
            <SpecialCard
              key={special.title}
              title={special.title}
              image={special.image}
              description={special.description}
              cost={special.cost}
              owned={special.owned}
              available={special.available}
              attackSpecial0={attackSpecial0}
              buySpecial={buySpecial}
              connected={connected}
            />
          ))}
        </div>
      </div>
      <div className="specials-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        SPECIALS
        <span className={isOpen ? 'arrow-down' : 'arrow-up'} />
      </div>
    </div>
  );
}

export default SpecialsMenu;
