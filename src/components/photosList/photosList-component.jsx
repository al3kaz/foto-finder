import React from 'react';
import { connect } from 'react-redux';

import SearchBar from '../searchBar/searchBar-component';

import './photosList-styles.scss';

const PhotosList = ({ photos }) => {

   const imgs = photos.results.map(img => (
      <img className="photo" key={img.id} src={img.urls.small} alt={img.alt_description} />
   ));

   return (
      <>
         <SearchBar />
         <div className="photo-container">
            {imgs}
         </div>
      </>
   );
}

const mapStateToProps = state => ({
   photos: state.photo.currentPhotos,
})

export default connect(mapStateToProps)(PhotosList);