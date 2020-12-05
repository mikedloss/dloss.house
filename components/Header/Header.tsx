import React, { useEffect, useState } from 'react';
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
  Icon,
  Container,
} from '@chakra-ui/react';
import { FiMoon, FiSun, FiMenu, FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/router';

interface MenuLinkProps {
  link: {
    path: string;
    title: string;
  };
}

interface CustomMenuProps {
  isLargerThan768: boolean;
  iconButtonLabel: string;
  isLightMode: boolean;
  toggleColorMode: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
        {link.title}
      </Heading>
    </Link>
  );
};

const CustomMenu: React.FC = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const isLightMode = colorMode === 'light';
  const iconButtonLabel = isLightMode ? 'toggle dark mode' : 'toggle light mode';

  return isLargerThan768 ? (
    <Flex flexDirection="row" alignItems="center">
      {links.map((link) => {
        return <MenuLink link={link} key={link.path} />;
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
      <MenuList className="list">
        {links.map((link) => {
          return (
            <MenuItem key={link.path} alignItems="center">
              {router.pathname === link.path && (
                <Box marginRight="0.25rem">
                  <FiArrowRight />
                </Box>
              )}
              <MenuLink link={link} />
            </MenuItem>
          );
        })}
        <MenuDivider />
        <MenuItem onClick={toggleColorMode}>
          <Flex alignItems="center">
            <Text fontSize="sm" marginRight="0.625rem">
              {isLightMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Box>{isLightMode ? <FiMoon /> : <FiSun />}</Box>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const headerBg = useColorModeValue('yellow.200', 'purple.800');

  useEffect(() => {
    // needed to re-render the nav because we use a media query hook to determine what to show
    setShowMenu(true);
  }, []);

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
      {showMenu ? <CustomMenu /> : null}
    </Flex>
  );
};
