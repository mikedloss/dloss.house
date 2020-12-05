import * as React from 'react';
import Link from 'next/link';
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';

import { CustomMenu } from './CustomMenu';

export const Header: React.FC = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const headerBg = useColorModeValue('yellow.200', 'purple.800');

  React.useEffect(() => {
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
