const INITIAL_STATE = {
   currentPhotos: []
}

const photosReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case 'SET_PHOTOS':
         return {
            ...state,
            currentPhotos: action.payload
         }
      default:
         return state;
   }
}

export default photosReducer;