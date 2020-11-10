import React from 'react';
import Link from 'next/link';

import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  MenuDivider,
} from '@chakra-ui/core';
import { FiMoon, FiSun, FiMenu } from 'react-icons/fi';

interface MenuLinkProps {
  link: {
    path: string;
    title: string;
  };
}

export const links = [
  {
    path: '/boardgames',
    title: 'Board Games 🎲',
  },
];

const MenuLink: React.FC<MenuLinkProps> = ({ link }) => {
  return (
    <Link href={link.path} key={link.path}>
      <Heading as="a" size="md">
        <span>{link.title}</span>
      </Heading>
    </Link>
  );
};

export const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const headerBg = useColorModeValue('yellow.200', 'purple.800');
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const isLightMode = colorMode === 'light';
  const iconButtonLabel = isLightMode ? 'toggle dark mode' : 'toggle light mode';

  return (
    <Flex justifyContent="space-between" alignItems="center" backgroundColor={headerBg} width="100%" padding="0.625rem">
      <Link href="/">
        <Heading as="a" size="md">
          dloss
          <span role="img" aria-label="house">
            🏡
          </span>
        </Heading>
      </Link>
      {isLargerThan768 ? (
        <Flex alignItems="center" className="hello">
          {links.map((link) => {
            return (
              <Link href={link.path} key={link.path}>
                <Heading as="a" size="md">
                  <span>{link.title}</span>
                </Heading>
              </Link>
            );
          })}
          <IconButton
            aria-label={iconButtonLabel}
            icon={isLightMode ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            marginLeft="0.625rem"
          />
        </Flex>
      ) : (
        <Menu>
          <MenuButton as={Button}>
            <FiMenu />
          </MenuButton>
          <MenuList>
            {links.map((link) => {
              return (
                <MenuItem key={link.path}>
                  <MenuLink link={link} />
                </MenuItem>
              );
            })}
            <MenuDivider />
            <MenuItem>
              <Flex alignItems="center" onClick={toggleColorMode}>
                <Text fontSize="sm" marginRight="0.625rem">
                  {isLightMode ? 'Dark Mode' : 'Light Mode'}
                </Text>
                <Box>{isLightMode ? <FiMoon /> : <FiSun />}</Box>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};
