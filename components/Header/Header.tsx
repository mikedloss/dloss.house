import React from 'react';
import Link from 'next/link';

import { Flex, Heading, useColorMode, useColorModeValue, IconButton } from '@chakra-ui/core';
import { FiMoon, FiSun } from 'react-icons/fi';

export const links = [
  {
    path: '/boardgames',
    title: 'Board Games 🎲',
  },
];

export const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const headerBg = useColorModeValue('yellow.200', 'purple.800');

  const isLightMode = colorMode === 'light';
  const iconButtonLabel = isLightMode ? 'toggle dark mode' : 'toggle light mode';

  // todo: need mobile menu
  // see this: https://github.com/vercel/next.js/discussions/14810

  return (
    <Flex alignItems="center" backgroundColor={headerBg} padding="0.625rem">
      <Flex
        as="nav"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor={headerBg}
        width="100%"
        marginRight="0.5rem"
      >
        <Link href="/">
          <Heading as="a" size="md">
            dloss
            <span role="img" aria-label="house">
              🏡
            </span>
          </Heading>
        </Link>
        {links.map((link, index) => {
          return (
            <Link href={link.path} key={index}>
              <Heading as="a" size="md">
                <span>{link.title}</span>
              </Heading>
            </Link>
          );
        })}
      </Flex>
      <IconButton aria-label={iconButtonLabel} icon={isLightMode ? <FiMoon /> : <FiSun />} onClick={toggleColorMode} />
      {/* <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button> */}
    </Flex>
  );
};
