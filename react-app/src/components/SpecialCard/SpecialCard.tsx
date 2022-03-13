import './special-card.scss';
import React from 'react';
import para from '../../images/special-img.png';
import shopStamina from '../../images/shop-stamina.svg';
import shopGold from '../../images/shop-gold.svg';

function SpecialCard({
  cost, title, description, owned, available, image, buySpecial, attackSpecial0, connected,
}) {
  return (
    <div className={`special-card ${available ? '' : 'disabled'}`}>
      <div className="special-card-owned">{owned || 0}</div>
      <div className="special-card-container">
        <img className="special-card-image" src={image || para} alt="Special card" />
        <div className="special-card-info">
          <div className="special-card-title">{title}</div>
          <div className="special-card-description">{description}</div>
        </div>
        <div className="special-card-footer">
          <div className="special-card-cost">
            <img src={owned > 0 ? shopStamina : shopGold} className="icon" alt="Cost" />
            :
            {' '}
            {cost}
          </div>
          <button
            type="button"
            className="special-card-buy"
            onClick={owned > 0 ? () => attackSpecial0() : () => buySpecial(0, 1)}
            disabled={!connected || !available}
          >
            {owned > 0 ? 'USE' : 'BUY'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpecialCard;
