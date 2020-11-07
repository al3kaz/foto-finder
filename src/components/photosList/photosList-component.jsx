import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { useParams, withRouter } from 'react-router-dom'

import { setPhotos } from '../../redux/photo/photos.actions';
import { setSpinner } from '../../redux/spinner/spinner.actions'

import SearchBar from '../searchBar/searchBar-component';
import Photo from '../photo/photo.component';

import './photosList-styles.scss';

import Unsplash, { toJson } from 'unsplash-js';


const PhotosList = ({ photos, setPhotos, setSpinner, history }) => {

   const unsplash = new Unsplash({
      accessKey: "W_KPDO6kGppQIVNA8bvsJH3uwiwPe8Go0Bouij4qyqg"
   });

   const { phrase } = useParams()

   const [w8, setW8] = useState(false)
   const [page, setPage] = useState(1)
   const [totalPage, setTotalPage] = useState(null)

   useEffect(() => {
      unsplash.search.photos(`${phrase}`, page, 30)
         .then(toJson)
         .then(data => {
            setTotalPage(data.total_pages)
            setPhotos(data);
            setSpinner(false);
            setW8(true)
         });
   }, [phrase, page])

   const handleNextPage = () => {
      setPage(page + 1)
   }

   const handlePrevPage = () => {
      setPage(page - 1)
   }
   console.log(history)

   return (
      <>
         <SearchBar />
         {page === 1 ? null : <button onClick={handlePrevPage}>prev </button>}
         <div>{page}</div>
         {totalPage === page || totalPage === 0 ? null : <button onClick={handleNextPage}>next </button>}
         <div className="photos-list-container">
            {w8 &&
               photos.results.map(img => <Photo
                  key={img.id}
                  urlSmall={img.urls.small}
                  urlBig={img.urls.regular}
                  user={img.user.username}
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
   setSpinner: spinner => dispatch(setSpinner(spinner)),
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PhotosList));