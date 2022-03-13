// noinspection JSCheckFunctionSignatures,JSUnresolvedFunction

import React, { ChangeEvent, useEffect, useState } from "react";
import { BigNumberish, ethers } from "ethers";
import Notify from "bnc-notify";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import SpecialsMenu from "./components/SpecialsMenu/SpecialsMenu";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Board from "./components/Board/Board";
import { useSigner } from "./contexts/signer";
import {
  DIAMOND_CONTRACT_ADDRESS,
  diamondContractABI,
  STAMINA_CONTRACT_ADDRESS,
  GOLD_CONTRACT_ADDRESS,
  ERC20ABI,
  SPECIAL_CONTRACT_ADDRESS,
  SPECIAL_ABI,
} from "./constants";
import staminaXSmall from "./images/stamina-xsmall.svg";
import soldierXSmall from "./images/soldier-xsmall.svg";
import goldXSmall from "./images/gold-xsmall.svg";

function App() {
  const [map, setMap] = useState<Array<any[]>>([]);
  const [attackingUnits, setAttackingUnits] = useState(0);
  const [myStamina, setMyStamina] = useState<BigNumberish | null>(null);
  const [myGold, setMyGold] = useState<BigNumberish | null>(null);
  const [deployingUnits, setDeployingUnits] = useState(0);
  const [fromX, setFromX] = useState<number | null>(null);
  const [fromY, setFromY] = useState<number | null>(null);
  const [attacking, setAttacking] = useState(false);
  const [moving, setMoving] = useState(false);
  const [toX, setToX] = useState<number | null>(null);
  const [toY, setToY] = useState<number | null>(null);
  const [notify, setNotify] = useState<any | null>(null);
  const [registered, setRegistered] = useState<any | null>(null);
  const [lastStaminaClaimed, setLastStaminaClaimed] = useState("0");
  const [special0, setSpecial0] = useState<any | null>(null);
  const [mumbaiProvider, setMumbaiProvider] =
    useState<ethers.providers.JsonRpcProvider | null>(null);
  const [diamond, setDiamond] = useState(null);
  const [staminaContract, setStaminaContract] = useState(null);
  const [goldContract, setGoldContract] = useState(null);
  const [specialsContract, setSpecialsContract] = useState(null);
  const {
    isOpen,
    onOpen: openTxModal,
    onClose: closeTxModal,
  } = useDisclosure();

  const { signer, provider, signerAddress, connected } = useSigner();

  const handleAttackingUnits = (e: ChangeEvent<HTMLInputElement>) => {
    setAttackingUnits(Number(e.target.value));
  };

  const handleDeployingUnits = (e: ChangeEvent<HTMLInputElement>) => {
    setDeployingUnits(Number(e.target.value));
  };

  const handleClickedCoordinates = (x: number, y: number) => {
    if (map[x][y].account === signerAddress) {
      setFromX(x);
      setFromY(y);
    } else {
      setFromX(null);
      setFromY(null);
    }
  };

  const startAttack = () => {
    setAttacking(true);
  };

  const handleToCoordinates = (x: number, y: number) => {
    setToX(x);
    setToY(y);
  };

  const updateStamina = async () => {
    if (signerAddress) {
      const stamina = await staminaContract.balanceOf(signerAddress);
      setMyStamina(stamina);
    }
  };

  const updateGold = async () => {
    if (signerAddress) {
      const gold = await goldContract.balanceOf(signerAddress);
      setMyGold(gold);
    }
  };

  const updateMap = async () => {
    const updatedMap = await diamond.getMap();
    setMap(updatedMap);
  };

  const updateRegistered = async (address: string) => {
    if (address && diamond) {
      const registeredAddress = await diamond.getRegistered(address);
      setRegistered(registeredAddress);
    }
  };

  const updateSpecial0 = async () => {
    if (signerAddress)  {
      const mySpecial0 = await specialsContract.balanceOf(signerAddress, 0);
      setSpecial0(parseInt(ethers.utils.formatUnits(mySpecial0, 0), 10));
    }
  };

  const backBeforeAttack = () => {
    setToX(null);
    setToY(null);
    setFromX(null);
    setFromY(null);
    setAttacking(false);
    setMoving(false);
  };

  const updateLastStaminaClaimed = async () => {
    if (signerAddress) {
      const cooldown = await diamond.getLastStaminaClaimed(signerAddress);
      setLastStaminaClaimed(cooldown);
    }
  };

  const claimStamina = async () => {
    const tx = await diamond.claimStamina();
    notify.hash(tx.hash);
    await tx.wait();
    updateStamina();
  };

  const register = async () => {
    const tx = await diamond.register();
    openTxModal();
    notify.hash(tx.hash);
    await tx.wait();
  };

  const handleRegister = async () => {
    await updateRegistered(signerAddress);
    await updateMap();
    await updateLastStaminaClaimed();
    closeTxModal();
  };

  const attack = async () => {
    const tx = await diamond.attack([fromX, fromY], [toX, toY], attackingUnits);
    notify.hash(tx.hash);
    await tx.wait();
    updateMap();
    updateStamina();
  };

  const confirmAction = async () => {
    await attack();
    backBeforeAttack();
  };

  const attackSpecial0 = async () => {
    const tx = await diamond.longRange(
      [fromX, fromY],
      [toX, toY],
      attackingUnits
    );
    notify.hash(tx.hash);
    await tx.wait();
    updateMap();
    updateStamina();
    updateSpecial0();
  };

  const deployUnits = async () => {
    const tx = await diamond.deployUnits([fromX, fromY], deployingUnits);
    notify.hash(tx.hash);
    await tx.wait();
    updateMap();
    updateStamina();
  };

  const claimGold = async () => {
    const tx = await diamond.claimGold([fromX, fromY]);
    notify.hash(tx.hash);
    await tx.wait();
    updateGold();
    updateMap();
  };

  const handleAttackButton = () => {
    if (!attacking) {
      startAttack();
    } else {
      backBeforeAttack();
    }
  };

  const buySpecial = async (id: number, amount: number) => {
    const tx = await specialsContract.mint(id, amount);
    notify.hash(tx.hash);
    await tx.wait();
    updateSpecial0();
    updateGold();
  };

  useEffect(() => {
    const initNotify = Notify({
      dappId: "682e29b1-cc78-4233-bd76-2dc200dda20c", // [String] The API key created by step one above
      networkId: 80001, // [Integer] The Ethereum network ID your Dapp uses.
    });
    setNotify(initNotify);
  }, []);

  useEffect(() => {
    const mProvider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/SeyWmSZubocxNcqaWaiR--xe00RiT1ig"
    );

    setMumbaiProvider(mProvider);
  }, []);

  useEffect(() => {
    if (signer || provider || mumbaiProvider) {
      setDiamond(
        new ethers.Contract(
          DIAMOND_CONTRACT_ADDRESS,
          diamondContractABI,
          signer || provider || mumbaiProvider
        )
      );
      setStaminaContract(
        new ethers.Contract(
          STAMINA_CONTRACT_ADDRESS,
          ERC20ABI,
          signer || provider || mumbaiProvider
        )
      );
      setGoldContract(
        new ethers.Contract(
          GOLD_CONTRACT_ADDRESS,
          ERC20ABI,
          signer || provider || mumbaiProvider
        )
      );
      setSpecialsContract(
        new ethers.Contract(
          SPECIAL_CONTRACT_ADDRESS,
          SPECIAL_ABI,
          signer || provider || mumbaiProvider
        )
      );
    }
  }, [provider, signer, mumbaiProvider]);

  useEffect(() => {
    if (diamond) {
      updateMap();
    }
  }, [diamond]);

  useEffect(() => {
    if (signerAddress) {
      updateRegistered(signerAddress);
    }
  }, [signerAddress]);

  useEffect(() => {
    if (staminaContract && signer) {
      updateStamina();
    }
  }, [staminaContract, signer]);

  useEffect(() => {
    if (goldContract && signer) {
      updateGold();
    }
  }, [goldContract, signer]);

  useEffect(() => {
    if (specialsContract && signer) {
      updateSpecial0();
    }
  }, [specialsContract, signer]);

  useEffect(() => {
    if (diamond && signer) {
      updateLastStaminaClaimed();
    }
  }, [diamond, signer, fromX, attacking, moving]);

  useEffect(() => {
    if (diamond) {
      diamond.on("Register", (account) => {
        if (account === signerAddress) {
          handleRegister();
        }
      });
      diamond.on("ClaimGold", updateMap);
      diamond.on("DeployUnits", updateMap);
      diamond.on("Attack", updateMap);
    }
  }, [diamond]);
  return (
    <div className="body-container">
      <Modal isOpen={isOpen} onClose={closeTxModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Please wait, ChainlinkVRF is generating a random number that we use
            to give you a random starter territory. The color around the map
            will be the color of your territories.
          </ModalHeader>
          <ModalBody>
            <h2 className="modal-h2">How To Play:</h2>
            <br/>
            <p>Start with a territory, 200 units and 250 stamina.</p>
            <br/>
            <p>Every 8 hours you can claim an additional 500 stamina</p>
            <br/>
            <p>
              You can burn stamina{" "}
              <img src={staminaXSmall} className="icon" alt="Stamina" /> to
              deploy units, you will get one unit{" "}
              <img src={soldierXSmall} className="icon" alt="Troops" /> for each
              stamina burned.
            </p>
            <br/>
            <p>
              Conquer territories with a gold mine and mine gold{" "}
              <img src={goldXSmall} className="icon" alt="Gold" /> every 3
              hours.
            </p>
            <br/>
            <p>
              For every unit in a territory you will mine 1 gold, with a maximum
              of 50 gold per claim.
            </p>
            <br/>
            <p>
              Use the gold in the shop to buy special abilities that will help
              you conquer the map and be the king!
            </p>
            <br/>
            <p>
              To attack/move click on a territory that you own, then select the
              units amount, then select the territory where you want to
              attack/move, then click execute to confirm.
            </p>
            <br/>
            <p>
              Every attack/move costs 10 stamina regardless of the number of
              units used
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Nav
        myStamina={myStamina && ethers.utils.formatUnits(myStamina)}
        myGold={myGold && ethers.utils.formatUnits(myGold)}
        claimStamina={claimStamina}
        lastStaminaClaimed={ethers.utils.formatUnits(lastStaminaClaimed, 0)}
        register={register}
        registered={registered}
      />
      <div className="main-left-container">
        <SpecialsMenu
          attackSpecial0={attackSpecial0}
          special0={special0}
          buySpecial={buySpecial}
          connected={connected}
        />
        <Leaderboard map={map} />
      </div>
      <div className="main-middle">
        <div className="info-box">
          {attacking
            ? "Select a tile to attack"
            : moving
            ? "Select a tile to move to"
            : toX && toY
            ? "Execute your action"
            : "Select a tile to start an action"}
        </div>
        <Board
          map={map}
          attacking={attacking}
          moving={moving}
          handleToCoordinates={handleToCoordinates}
          handleClickedCoordinates={handleClickedCoordinates}
          fromY={fromY}
          fromX={fromX}
          toY={toY}
          toX={toX}
          claimGold={claimGold}
          diamond={diamond}
        />
      </div>

      <div className="side-content"></div>

      <Footer
        attackingUnits={attackingUnits}
        handleAttackingUnits={handleAttackingUnits}
        deployingUnits={deployingUnits}
        handleDeployingUnits={handleDeployingUnits}
        confirmAction={confirmAction}
        deployUnits={deployUnits}
        fromX={fromX}
        fromY={fromY}
        toX={toX}
        toY={toY}
        attacking={attacking}
        handleAttackButton={handleAttackButton}
      />
    </div>
  );
}

export default App;
