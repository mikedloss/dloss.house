import React from 'react';
import { Heading } from 'rebass';

import NavItem from './components/NavItem';
import * as Media from '../Elements/media';
import * as Styles from './Header.styles';

export const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const resetMenu = () => setMenuOpen(false);

  return (
    <Styles.Nav as="nav" bg="primary">
      <Media.SmallOnly>
        <Styles.MenuButton
          bg="white"
          color="black"
          py="5px"
          px="10px"
          my="15px"
          mx="10px"
          fontSize={0}
          onClick={toggleMenu}
          menuOpen={menuOpen}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </Styles.MenuButton>
      </Media.SmallOnly>
      <Heading as="h1" py="16px" pl="16px" fontSize={2} style={{ display: 'inline-block' }}>
        <Styles.Logo to="/">
          <Heading>
            dloss{' '}
            <span role="img" aria-label="house">
              🏠
            </span>
          </Heading>
        </Styles.Logo>
      </Heading>
      <Styles.NavList isVisible={menuOpen} bg="primary">
        <NavItem>
          <Styles.NavLink to="/games" onClick={resetMenu} activeStyle={{ color: '#42613d' }}>
            <Heading as="h3" fontSize={[4, 3]}>
              <span role="img" aria-label="dice">
                🎲
              </span>{' '}
              Board Games
            </Heading>
          </Styles.NavLink>
        </NavItem>
      </Styles.NavList>
    </Styles.Nav>
  );
};
