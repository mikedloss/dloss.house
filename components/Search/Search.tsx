import React, { useEffect, useState, useReducer } from 'react';
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

import { searchReducer, searchInitialState } from './search.reducer';
import { inspectReducer, inspectInitialState } from './inspect.reducer';
import { useDebounce } from '../../components/hooks';
import { fetcher } from '../../lib/fetch';
import { SearchedGame } from '../../lib/models/Game';

export interface SearchProps {
  apiSearchUrl: string;
  apiInspectUrl?: string;
  externalItemLink: string;
}

export const Search: React.FC<SearchProps> = ({ apiSearchUrl, apiInspectUrl, externalItemLink }) => {
  const [inspectedGame, setInspectedGame] = useState<SearchedGame>({ id: '', title: '' });

  const [searchListState, searchListDispatch] = useReducer(searchReducer, searchInitialState);
  const [inspectState, inspectDispatch] = useReducer(inspectReducer, inspectInitialState);

  console.log(`inspectState`, inspectState);

  const debouncedSearchTerm = useDebounce(searchListState.searchTerm, 350);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const borderColor = useColorModeValue('gray.200', 'blue.800');

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearchTerm) {
        searchListDispatch({ type: 'SET_SEARCHING', payload: true });
        searchListDispatch({ type: 'SET_ERROR', payload: false });
        try {
          const data = await fetcher<SearchedGame[]>(`${apiSearchUrl}${debouncedSearchTerm}`);
          searchListDispatch({ type: 'SET_SEARCH_RESULTS', payload: data });
          searchListDispatch({ type: 'SET_SEARCHING', payload: false });
        } catch (error) {
          searchListDispatch({ type: 'SET_ERROR', payload: true });
        }
      } else {
        searchListDispatch({ type: 'PARTIAL_RESET' });
        searchListDispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
      }
    };

    fetchData();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`hello!`);
    };

    fetchData();
  }, [inspectState.inspectedGame.id]);

  return (
    <>
      <Flex flexDirection="column">
        <Input
          placeholder="Search"
          value={searchListState.searchTerm}
          onChange={(e) => searchListDispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
        />
        {debouncedSearchTerm ? (
          <>
            <Divider marginY="1rem" />
            {searchListState.isSearching ? (
              <Center>
                <Spinner />
              </Center>
            ) : searchListState.isError ? (
              <Text color="red.500">Error!</Text>
            ) : (
              <>
                <Text fontSize="sm" marginBottom="1rem">
                  Displaying {searchListState.searchResults.length} results
                </Text>
                {searchListState.searchResults.map((game) => {
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
                            inspectDispatch({ type: 'SET_INSPECTED_GAME', payload: game });
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add {inspectState.inspectedGame.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{isEmpty ? <Skeleton height="20px" /> : <Text>hello!</Text>}</ModalBody>
          <ModalFooter>
            <Button width="100%" colorScheme="green" onClick={onClose}>
              Add Game
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
