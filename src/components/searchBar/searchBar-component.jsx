import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setPage } from '../../redux/actualPage/actualPage.actions';

import Unsplash, { toJson } from 'unsplash-js';

import './searchBar-styles.scss';

const SearchBar = ({ history, setPage }) => {

   const unsplash = new Unsplash({
      accessKey: "W_KPDO6kGppQIVNA8bvsJH3uwiwPe8Go0Bouij4qyqg"
   });

   const [inputValue, setInputValue] = useState("")
   const [suggests, setSuggests] = useState("")

   const handleChange = (e) => {
      setInputValue(e.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      setInputValue("")
      setPage(1)
      history.push(`/${inputValue}`);
   }

   useEffect(() => {
      if (inputValue.length >= 3) {
         unsplash.search.photos(`${inputValue}`, 1, 30)
            .then(toJson)
            .then(data => {
               if (data.results) {
                  const suggestions = data.results
                     .filter(suggest => suggest.description != null && suggest.description !== "")
                     .slice(0, 5)
                     .map(suggest => (
                        <div className="suggest" key={suggest.id} onClick={() => {
                           history.push(`/${suggest.description}`);
                           setInputValue("")
                        }}> {suggest.description}</div>
                     ));
                  setSuggests(suggestions.length > 0 ? suggestions : <div>no seggestion</div>);
               }
            })
            .catch(err => {
               console.log(err)
            });
      } else {
         setSuggests([])
      }
   }, [inputValue])

   return (
      <div className="search-bar-container">
         <form className="form-container" onSubmit={handleSubmit}>
            <input
               className="input-style"
               placeholder={history.location.pathname === "/" ? "Search" : history.location.pathname.replace('/', '')}
               type="text"
               value={inputValue}
               onChange={handleChange}
            />
         </form>
         {inputValue.length >= 3 &&
            <div className="suggestions">
               {suggests}
            </div>}
      </div>
   );
}

const mapDispatchToProps = dispatch => ({
   setPage: page => dispatch(setPage(page)),
})


export default connect(null, mapDispatchToProps)(withRouter(SearchBar));