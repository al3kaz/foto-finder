import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom'

import { setPhotos } from '../../redux/photo/photos.actions';
import { setPage } from '../../redux/actualPage/actualPage.actions';

import SearchBar from '../searchBar/searchBar-component';
import WithSpinner from '../with-spinner/with-spinner.component';
import photoList from '../photosList/photoList.component';

import Unsplash, { toJson } from 'unsplash-js';

import './photosListOverview.styles.scss';

const PhotosList = ({ setPhotos, page, setPage }) => {

   const unsplash = new Unsplash({
      accessKey: "W_KPDO6kGppQIVNA8bvsJH3uwiwPe8Go0Bouij4qyqg"
   });

   const { phrase } = useParams()

   const [loading, setLoading] = useState(true)
   const [totalPage, setTotalPage] = useState(null)

   const PhotoListWithSpinner = WithSpinner(photoList)

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
            <div className="page-button">{page} of {totalPage}</div>
            <button disabled={totalPage === page} className="page-button" onClick={handleNextPage}>next </button>
         </div>

         <PhotoListWithSpinner isLoading={loading} />
      </>
   );
}

const mapStateToProps = state => ({
   page: state.page.page,
})

const mapDispatchToProps = dispatch => ({
   setPhotos: photo => dispatch(setPhotos(photo)),
   setPage: page => dispatch(setPage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PhotosList));