import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './NavItem.styles';

export const NavItem = (props) => {
  return (
    <Styles.NavItem as="li">
      <Styles.NavContent>{props.children || ''}</Styles.NavContent>
    </Styles.NavItem>
  );
};

NavItem.propTypes = {
  children: PropTypes.node,
};