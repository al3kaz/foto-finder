import React, { useState } from 'react';

import './photo.styles.scss';

const Photo = ({ urlSmall, urlBig, user, alt, description, location }) => {

   const [isOpen, setIsOpen] = useState(false)

   const handleClick = () => {
      setIsOpen(!isOpen)
   }

   return (
      <div className='photo-container'>
         <img className='photo' src={urlSmall} alt={alt} onClick={handleClick} />

         {isOpen &&
            (<dialog className='dialog-container' open onClick={handleClick}>
               <img className='dialog-container-img' src={urlBig} alt={alt} />
               <h3 className='dialog-container-title'>author: {user}</h3>
               {description ? <p className='dialog-container-title'>{description}</p> : null}
               {location ? <p className='dialog-container-title'>{location}</p> : null}
            </dialog>)}
      </div>
   );
}

export default Photo;