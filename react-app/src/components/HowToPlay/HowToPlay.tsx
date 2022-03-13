import React from 'react';
import {
  Button, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import staminaXSmall from '../../images/stamina-xsmall.svg';
import soldierXSmall from '../../images/soldier-xsmall.svg';
import goldXSmall from '../../images/gold-xsmall.svg';

function HowToPlay() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} variant="solid" marginRight="12px">How to play</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>How to play</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <p>
              After register please wait 1 min or 2. ChainlinkVRF is generating a
              random number that we use to give you a random starter's territory.
            </p>
            <br/>
            <p>Start with a territory, 200 units and 250 stamina.</p>
            <br/>
            <p>Every 8 hours you can claim an additional 500 stamina</p>
            <br/>
            <p>
              You can burn stamina
              {' '}
              <img src={staminaXSmall} className="icon" alt="Stamina"/>
              {' '}
              to deploy units, you will get one unit
              {' '}
              <img src={soldierXSmall} className="icon" alt="Troops"/>
              {' '}
              for each stamina
              burned.
            </p>
            <br/>
            <p>
              Conquer territories with a gold mine and mine gold
              {' '}
              <img src={goldXSmall} className="icon" alt="Gold" />
              {' '}
              every 3 hours.
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
    </>
  );
}

export default HowToPlay;
