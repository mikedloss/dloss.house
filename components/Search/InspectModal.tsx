import * as React from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { useInspectGame } from '../../components/hooks';
import { SearchedGame } from '../../lib/models/Game';
import { GameProfile } from '../GameProfile';
import { useAddGame } from '../hooks/useAddGame';
import { useRouter } from 'next/router';

interface InspectModalProps {
  isOpen: boolean;
  onClose: () => void;
  inspectedGame: SearchedGame;
}

export const InspectModal: React.FC<InspectModalProps> = ({ isOpen, onClose, inspectedGame }) => {
  const router = useRouter();
  const {
    inspectedGame: fullGame,
    isLoading: isInspectLoading,
    isError: isInspectError,
    error: inspectError,
  } = useInspectGame(['inspect', inspectedGame.title], inspectedGame);
  const {
    mutate,
    data: mutateData,
    error: mutateError,
    reset: mutateReset,
    isLoading: isMutateLoading,
    isSuccess: isMutateSuccess,
    isError: isMutateError,
  } = useAddGame();

  const borderColor = useColorModeValue('gray.100', 'gray.800');

  React.useEffect(() => {
    if (mutateData) {
      setTimeout(() => {
        router.push('/boardgames');
        mutateReset();
      }, 1500);
    }
  }, [mutateData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={'inside'} closeOnOverlayClick={!isMutateLoading}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader justifyContent="center" borderBottomWidth="1px" borderBottomColor={borderColor}>
          <Text>Add {inspectedGame.title}</Text>
          {!isMutateLoading && <ModalCloseButton />}
        </ModalHeader>
        <ModalBody>{isInspectLoading ? <Skeleton height="20px" /> : <GameProfile game={fullGame} />}</ModalBody>
        <ModalFooter borderTopWidth="1px" borderTopColor={borderColor}>
          {fullGame?.alreadyExists ? (
            <Button width="100%" colorScheme="red" onClick={onClose}>
              Game already exists in your library!
            </Button>
          ) : (
            <Button width="100%" colorScheme={isMutateLoading ? 'blue' : 'green'} onClick={() => mutate(fullGame)}>
              {isMutateLoading ? (
                'Adding game...'
              ) : mutateData ? (
                <Box>
                  <Text>
                    <span>🎉</span> Game added!
                  </Text>
                  <Text fontSize="xs">Going back to board game list...</Text>
                </Box>
              ) : (
                'Add game'
              )}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
