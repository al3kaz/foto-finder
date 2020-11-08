import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import WithSpinner from '../with-spinner/with-spinner.component'

import { useParams, withRouter } from 'react-router-dom'

import { setPhotos } from '../../redux/photo/photos.actions';

import SearchBar from '../searchBar/searchBar-component';
import Photo from '../photo/photo.component';

import './photosList-styles.scss';

import Unsplash, { toJson } from 'unsplash-js';


const PhotosList = ({ photos, setPhotos }) => {

   const unsplash = new Unsplash({
      accessKey: "W_KPDO6kGppQIVNA8bvsJH3uwiwPe8Go0Bouij4qyqg"
   });

   const { phrase } = useParams()

   const [loading, setLoading] = useState(true)
   const [page, setPage] = useState(1)
   const [totalPage, setTotalPage] = useState(null)

   useEffect(() => {
      unsplash.search.photos(`${phrase}`, page, 30)
         .then(toJson)
         .then(data => {
            setTotalPage(data.total_pages)
            setPhotos(data);
            setLoading(false)
         });
   }, [phrase, page])

   const handleNextPage = () => {
      setPage(page + 1)
   }

   const handlePrevPage = () => {
      setPage(page - 1)
   }

   return (
      <>
         <SearchBar />

         <div div className="pagination-container">
            <button disabled={page <= 1} className="page-button" onClick={handlePrevPage}>prev </button>
            <div className="page-button">{page}</div>
            <button disabled={totalPage === page} className="page-button" onClick={handleNextPage}>next </button>
         </div>

         <div className="photos-list-container">
            {loading ? null : photos.results.map(img => <Photo
               key={img.id}
               urlSmall={img.urls.small}
               urlBig={img.urls.regular}
               user={img.user.username}
               location={img.user.location}
               alt={img.alt_description}
               description={img.description}
            />)
            }
         </div>
      </>
   );
}

const mapStateToProps = state => ({
   photos: state.photo.currentPhotos,
})


const mapDispatchToProps = dispatch => ({
   setPhotos: photo => dispatch(setPhotos(photo)),
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PhotosList));