import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'

import './searchBar-styles.scss'

import Unsplash, { toJson } from 'unsplash-js';

const SearchBar = ({ history }) => {

   const unsplash = new Unsplash({
      accessKey: "W_KPDO6kGppQIVNA8bvsJH3uwiwPe8Go0Bouij4qyqg"
   });

   const [value, setValue] = useState("")
   const [suggests, setSuggests] = useState("")

   const handleChange = (e) => {
      setValue(e.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      setValue("")
      history.push(`/${value}`);
   }

   useEffect(() => {
      if (value.length >= 3) {
         unsplash.search.photos(`${value}`, 1, 30)
            .then(toJson)
            .then(data => {
               if (data.results) {
                  const suggestions = data.results
                     .filter(suggest => suggest.description != null && suggest.description !== "")
                     .slice(0, 5)
                     .map(suggest => (
                        <div key={suggest.id} onClick={() => {
                           history.push(`/${suggest.description}`);
                           setValue("")
                        }}> {suggest.description}</div>
                     ));
                  setSuggests(suggestions.length > 0 ? suggestions : <div>no results</div>);
               }
            })
            .catch(err => {
               console.log(err)
            });
      } else {
         setSuggests([])
      }
   }, [value])

   return (
      <div className="search-bar-container">
         <form className="form-container" onSubmit={handleSubmit}>
            <input
               className="input-style"
               placeholder={history.location.pathname == "/" ? "Search" : history.location.pathname.replace('/', '')}
               type="text"
               value={value}
               onChange={handleChange}
               autoComplete="on" />
         </form>
         {suggests}
      </div>
   );
}

export default withRouter(SearchBar);