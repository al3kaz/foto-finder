import React from 'react';

import SearchBar from '../../components/searchBar/searchBar-component';

import './homePage-styles.scss';

const HomePage = (props) => {

   return (
      <div className="home-page-container">
         <SearchBar />
      </div>
   );
}

export default HomePage;