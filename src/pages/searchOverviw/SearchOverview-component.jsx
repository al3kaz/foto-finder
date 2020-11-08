import React from 'react';

import PhotosList from '../../components/photosList/photosList-component'

import './SearchOverview-styles.scss'

const SearchOverview = () => {
   return (<div className="search-overview">
      <PhotosList />
   </div>);
}

export default SearchOverview;