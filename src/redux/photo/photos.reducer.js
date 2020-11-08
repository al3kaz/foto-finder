import {PhotoTypes} from './photo.types'

const INITIAL_STATE = {
   currentPhotos: []
}

const photosReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case PhotoTypes.SET_PHOTOS:
         return {
            ...state,
            currentPhotos: action.payload
         }
      default:
         return state;
   }
}

export default photosReducer;