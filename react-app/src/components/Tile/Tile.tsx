import gold from "../../images/gold-for-tile.png";
import soldiers from "../../images/soldiers.png";
import claim from "../../images/claim-active.png";
import claimDisabled from "../../images/claim-inactive.png";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import genColor from '../../utils/genColor';
import secondsToHm from '../../utils/secondsToHm';

function Tile({
  squareAccount,
  signer,
  attacking,
  moving,
  handleToCoordinates,
  handleClickedCoordinates,
  x,
  y,
  units,
  golden,
  claimGold,
  fromX,
  fromY,
  toX,
  toY,
  diamond
}) {
  const [lastGoldClaimed, setLastGoldClaimed] = useState('');

  const genTileNumber = (x, y) => {
    // TODO: Maybe improve it
    return (((x + 1) * (y + 1)) % 4) + 1;
  };

  const getCooldownString = (lastClaimedDate) => {
    const cooldown = Number(lastClaimedDate) + (3 * 60 * 60); // 3 Hours
    const { hours, minutes } = secondsToHm(cooldown);
    if (hours === 0 && minutes === 0) return '';

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const getLastGoldClaimed = async () => {
    const cooldown = await diamond.getLastGoldClaimed([x, y]);
    setLastGoldClaimed(ethers.utils.formatUnits(cooldown, 0));
  };

  const claimTileGold = async () => {
    try {
      await claimGold()
      await getLastGoldClaimed()
    } catch (e) {
      console.error("Can't claim gold:", e)
    }
  }

  useEffect(() => {
    if (fromX !== null && fromX !== undefined && fromY !== null && fromY !== undefined && golden > 0.0 && fromX === x && fromY === y) {
      getLastGoldClaimed();
    }
  }, [fromX, fromY])

  return (
    <div
      key={y}
      style={
        (toX !== null && toX !== undefined && toY !== null && toY !== undefined) && toX === x && toY === y ?
          {borderColor: `#${genColor(squareAccount)}`, backgroundColor: "red", backgroundBlendMode: "screen"} :
          fromX !== null && fromX !== undefined && fromY !== null && fromY !== undefined && fromX === x && fromY === y ? 
          {borderColor: `#${genColor(squareAccount)}`, backgroundColor: "blue", backgroundBlendMode: "screen"} : 
          {borderColor: `#${genColor(squareAccount)}`, backgroundColor: ""} 
      }
      className={
        squareAccount.toLowerCase() !==
          "0x0000000000000000000000000000000000000000" && golden > 0
          ? "tile-container player miniera"
          : squareAccount.toLowerCase() !==
            "0x0000000000000000000000000000000000000000"
          ? "tile-container player"
          : golden > 0
          ? "tile-container miniera"
          : `tile-container free-tile-${genTileNumber(x, y)}`
      }
      onClick={
        attacking || moving
          ? () => handleToCoordinates(x, y)
          : () => handleClickedCoordinates(x, y)
      }
    >
      <div className="tile-top-container">
        <div className="button-gold" onClick={claimTileGold}>
          {squareAccount === signer && golden > 0 && (
            <>
              <img
                className="claim-gold"
                src={fromX !== null && fromX !== undefined && fromY !== null && fromY !== undefined ? claim : claimDisabled}
                alt="Gold"
              />
              <span>{getCooldownString(lastGoldClaimed)}</span>
            </>
          )}
        </div>

        {golden > 0.0 && (
          <div className="tile-gold-container">
            <img className="tile-gold" src={gold} alt="" />
            <span className="gold-quantity">{golden}</span>
          </div>
        )}
      </div>
      <div className="tile-bottom-container">
        <div className="units-container">
          {units > 0 && <img className="soldiers" src={soldiers} alt="" />}
          <p className="soldiers-quantity">{units > 0 && units}</p>
        </div>
        <p className="coords">
          <b>X</b>: {x} <b>Y</b>: {y}
        </p>
      </div>
    </div>
  );
}

export default Tile;
