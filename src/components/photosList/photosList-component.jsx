import React from 'react';
import { connect } from 'react-redux'

const PhotosList = ({ photos }) => {


   const imgs = photos.results.map(img => (
      <img key={img.id} src={img.urls.regular} alt={img.alt_description} />
   ));


   console.log(photos)

   return (
      <div className="photo-container">
         {imgs}
         ok
      </div>
   );
}

const mapStateToProps = state => ({
   photos: state.photo.currentPhotos
})

export default connect(mapStateToProps)(PhotosList);