import * as React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorMode,
  useMediaQuery,
  MenuDivider,
} from '@chakra-ui/react';
import { FiMoon, FiSun, FiMenu, FiArrowRight } from 'react-icons/fi';

import { MenuLink } from './MenuLink';
import { links } from './links';

export const CustomMenu: React.FC = () => {
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
