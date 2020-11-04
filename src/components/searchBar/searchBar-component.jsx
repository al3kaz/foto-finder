import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setPhotos } from '../../redux/photo/photos.actions';
import { setSpinner } from '../../redux/spinner/spinner.actions'

import WithSpinner from '../with-spinner/with-spinner.component';
import PhotosList from '../photosList/photosList-component'

import Unsplash, { toJson } from 'unsplash-js';

import './searchBar-styles.scss'

const PhotosListWithSpinner = WithSpinner(PhotosList)

const SearchBar = ({ setSpinner, setPhotos, spinnerLoading }) => {

   const [value, setValue] = useState("")

   const unsplash = new Unsplash({ accessKey: "W_KPDO6kGppQIVNA8bvsJH3uwiwPe8Go0Bouij4qyqg" });

   // useEffect(() => {
   //    unsplash.search.photos(`${value}`, 1)
   //       .then(toJson)
   //       .then(data => {
   //          setPhotos(data)
   //       });
   // }, [value])


   const handleChange = (e) => {
      setValue(e.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      unsplash.search.photos(`${value}`, 1)
         .then(toJson)
         .then(data => {
            setPhotos(data);
            setSpinner(false)
         });
   }

   return (
      <div className="search-bar-container">
         <form className="form-container" onSubmit={handleSubmit}>
            <label>
               <h1>Image Search:</h1>
            </label>
            <input
               className="input-style"
               type="text"
               value={value}
               onChange={handleChange}
               autoComplete="on" />
         </form>
         <PhotosListWithSpinner isLoading={spinnerLoading} />
      </div>
   );
}
const mapStateToProps = state => ({
   photos: state.photo.currentPhotos,
   spinnerLoading: state.spinner.loading
})

const mapDispatchToProps = dispatch => ({
   setPhotos: photo => dispatch(setPhotos(photo)),
   setSpinner: spinner => dispatch(setSpinner(spinner)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);