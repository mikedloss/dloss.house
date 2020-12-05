import * as React from 'react';
import {
  Button,
  Center,
  Divider,
  Flex,
  IconButton,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { useInspectGame } from '../../components/hooks';
import { SearchedGame } from '../../lib/models/Game';
import { GameProfile } from '../GameProfile';

interface InspectModalProps {
  isOpen: boolean;
  onClose: () => void;
  inspectedGame: SearchedGame;
}

export const InspectModal: React.FC<InspectModalProps> = ({ isOpen, onClose, inspectedGame }) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const { inspectedGame: fullGame, isLoading, isError, error } = useInspectGame(
    ['inspect', inspectedGame.title],
    inspectedGame
  );

  const borderColor = useColorModeValue('gray.100', 'gray.800');

  const onAddGameClick = () => {
    setIsAdding(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={'inside'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottomWidth="1px" borderBottomColor={borderColor}>
          Add {inspectedGame.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{isLoading ? <Skeleton height="20px" /> : <GameProfile game={fullGame} />}</ModalBody>
        <ModalFooter borderTopWidth="1px" borderTopColor={borderColor}>
          {fullGame?.alreadyExists ? (
            <Button width="100%" colorScheme="red" onClick={onClose}>
              Game already exists in your library!
            </Button>
          ) : (
            <Button width="100%" colorScheme={isAdding ? 'blue' : 'green'} onClick={onAddGameClick}>
              {isAdding ? 'Adding game...' : 'Add game'}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
