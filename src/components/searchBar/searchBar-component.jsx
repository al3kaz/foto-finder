import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { setPhotos } from '../../redux/photo/photos.actions';
import { setSpinner } from '../../redux/spinner/spinner.actions'

import Unsplash, { toJson } from 'unsplash-js';

import './searchBar-styles.scss'

const SearchBar = ({ setSpinner, setPhotos, history }) => {

   const [value, setValue] = useState("")

   const unsplash = new Unsplash({ accessKey: "W_KPDO6kGppQIVNA8bvsJH3uwiwPe8Go0Bouij4qyqg" });


   const handleChange = (e) => {
      setValue(e.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      unsplash.search.photos(`${value}`, 1)
         .then(toJson)
         .then(data => {
            setPhotos(data);
            setSpinner(false);
         });
      setValue([]);
      history.push(`/${value}`)
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
      </div>
   );
}
const mapStateToProps = state => ({
   photos: state.photo.currentPhotos,
})

const mapDispatchToProps = dispatch => ({
   setPhotos: photo => dispatch(setPhotos(photo)),
   setSpinner: spinner => dispatch(setSpinner(spinner)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));