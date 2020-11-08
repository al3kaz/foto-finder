import React from 'react';
import { connect } from 'react-redux';

import Photo from '../photo/photo.component';

import './photoList.styles.scss';

const photoListWithSpinner = ({ photos }) => {

   const imgs = photos.results.map(img =>
      <Photo
         key={img.id}
         urlSmall={img.urls.small}
         urlBig={img.urls.regular}
         user={img.user.username}
         location={img.user.location}
         alt={img.alt_description}
         description={img.description}
      />)

   return (
      <div className="photos-list-container">
         {imgs}
      </div>
   );
}

const mapStateToProps = state => ({
   photos: state.photo.currentPhotos,
})

export default connect(mapStateToProps)(photoListWithSpinner);