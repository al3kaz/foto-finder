import React, { useState } from 'react';

import './photo.styles.scss';

const Photo = ({ urlSmall, urlBig, user, alt }) => {

   const [isOpen, setIsOpen] = useState(false)

   const handleClick = () => {
      setIsOpen(!isOpen)
   }
   console.log(isOpen)
   return (
      <div className='photo-container'>
         <img className='photo' src={urlSmall} alt={alt} onClick={handleClick} />

         {isOpen &&
            (<dialog className='dialog-container' open onClick={handleClick}>
               <h3 className='dialog-container-title'>{user}</h3>
               <img className='dialog-container-img' src={urlBig} alt={alt} />
            </dialog>)}
      </div>
   );
}

export default Photo;