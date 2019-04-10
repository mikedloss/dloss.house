import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import qs from 'qs';

import Layout from '../../components/Layout';
import AddGame from '../../components/AddGame';

export default () => {
  const [query, setQuery] = useState();

  useEffect(() => {
    // only get the data from the url, specifically the id query
    // e.g. /boardgames/add?id=123456
    if (typeof window !== 'undefined' && window.location.search) {
      setQuery(qs.parse(window.location.search, { ignoreQueryPrefix: true }));
    } else {
      navigate('/boardgames');
    }
  }, []);

  return <Layout>{query ? <AddGame query={query} /> : <></>}</Layout>;
};
