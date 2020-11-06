import React from 'react';
import { connect } from 'react-redux';

import SearchBar from '../searchBar/searchBar-component';
import Photo from '../photo/photo.component';

import './photosList-styles.scss';

const PhotosList = ({ photos }) => {

   const imgs = photos.results.map(img => <Photo
      key={img.id}
      urlSmall={img.urls.small}
      urlBig={img.urls.regular}
      user={img.user.username}
      alt={img.alt_description}
   />);

   return (
      <>
         <SearchBar />
         <div className="photos-list-container">
            {imgs}
         </div>
      </>
   );
}

const mapStateToProps = state => ({
   photos: state.photo.currentPhotos,
})

export default connect(mapStateToProps)(PhotosList);