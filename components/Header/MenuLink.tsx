import * as React from 'react';
import Link from 'next/link';
import { Heading } from '@chakra-ui/react';

interface MenuLinkProps {
  link: {
    path: string;
    title: string;
  };
}

export const MenuLink: React.FC<MenuLinkProps> = ({ link }) => {
  return (
    <Link href={link.path}>
      <Heading as="a" size="md">
        {link.title}
      </Heading>
    </Link>
  );
};
