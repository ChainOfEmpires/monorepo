import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { ethers } from "ethers";
import genColor from "../../utils/genColor";
import Tile from "../Tile/Tile";
import { useSigner } from "../../contexts/signer";

function Board({
  map,
  attacking,
  moving,
  handleToCoordinates,
  handleClickedCoordinates,
  fromY,
  fromX,
  toY,
  toX,
  claimGold,
  diamond,
}) {
  const { signerAddress } = useSigner();

  return (
    <>
      {map?.length === 32 && (
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
          maxScale={15}
          // limitToBounds={false}
        >
          {() => (
            <TransformComponent
              wrapperStyle={{
                border: `4px solid #${genColor(signerAddress)}`,
              }}
            >
              <div className="grid">
                {map.map((mapArr, x) =>
                  mapArr.map((square, y) => (
                    <Tile
                      key={`${x}-${y}`}
                      squareAccount={square.account}
                      signer={signerAddress}
                      attacking={attacking}
                      moving={moving}
                      handleToCoordinates={handleToCoordinates}
                      handleClickedCoordinates={handleClickedCoordinates}
                      x={x}
                      y={y}
                      fromX={fromX}
                      fromY={fromY}
                      toX={toX}
                      toY={toY}
                      units={parseInt(square.units, 10)}
                      golden={parseInt(
                        ethers.utils.formatUnits(square.gold, "ether"),
                        10
                      )}
                      claimGold={claimGold}
                      diamond={diamond}
                    />
                  ))
                )}
              </div>
            </TransformComponent>
          )}
        </TransformWrapper>
      )}
    </>
  );
}

export default Board;
