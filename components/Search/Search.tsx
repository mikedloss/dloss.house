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
import { FiPlus, FiSearch } from 'react-icons/fi';
import isEmpty from 'lodash/isEmpty';

import { useDebounce, useInspectGame, useSearchGame } from '../../components/hooks';
import { SearchedGame } from '../../lib/models/Game';
import { InspectModal } from './InspectModal';

export interface SearchProps {
  externalItemLink: string;
}

export const Search: React.FC<SearchProps> = ({ externalItemLink }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [inspectedGame, setInspectedGame] = React.useState<SearchedGame>({ id: null, title: '' });

  const debouncedSearchTerm = useDebounce(searchTerm, 350);
  const { searchedBoardGames, isLoading: isSearchLoading, isError: isSearchError, error: searchError } = useSearchGame(
    ['search', debouncedSearchTerm],
    debouncedSearchTerm
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const borderColor = useColorModeValue('gray.200', 'blue.800');

  const closeModal = () => {
    setInspectedGame({ id: null, title: '' });
    onClose();
  };

  return (
    <>
      <Flex flexDirection="column">
        <Input placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        {debouncedSearchTerm ? (
          <>
            <Divider marginY="1rem" />
            {isSearchLoading ? (
              <Center>
                <Spinner />
              </Center>
            ) : isSearchError ? (
              <Text color="red.500">Error!</Text>
            ) : (
              <>
                <Text fontSize="sm" marginBottom="1rem">
                  Displaying {searchedBoardGames.length} results
                </Text>
                {searchedBoardGames.map((game) => {
                  return (
                    <Flex
                      key={game.id}
                      flexDirection="column"
                      boxShadow="md"
                      padding="1rem"
                      marginBottom="1rem"
                      borderColor={borderColor}
                      borderWidth="2px"
                      borderRadius="5px"
                    >
                      <Flex alignItems="center">
                        <Flex flexDirection="column" width="100%">
                          <Flex>
                            <Link
                              href={`${externalItemLink}${game.id}`}
                              target="_blank"
                              rel="noreferrer noopener"
                              color="blue.500"
                            >
                              <Text fontSize="xs">{game.id}</Text>
                            </Link>
                          </Flex>
                          <Text fontSize="lg" fontWeight="bold">
                            {game.title}
                          </Text>
                        </Flex>
                        <IconButton
                          aria-label="add game"
                          icon={<FiSearch />}
                          onClick={() => {
                            setInspectedGame(game);
                            onOpen();
                          }}
                        />
                      </Flex>
                    </Flex>
                  );
                })}
              </>
            )}
          </>
        ) : null}
      </Flex>
      {isOpen ? <InspectModal isOpen={isOpen} onClose={closeModal} inspectedGame={inspectedGame} /> : null}
    </>
  );
};
