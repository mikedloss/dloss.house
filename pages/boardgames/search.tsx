import * as React from 'react';

import { Search } from '../../components/Search';

const BoardGameSearchPage: React.FC = () => {
  return (
    <Search apiSearchUrl={'/api/boardgames/search?name='} externalItemLink={'https://boardgamegeek.com/boardgame/'} />
  );
};

export default BoardGameSearchPage;
