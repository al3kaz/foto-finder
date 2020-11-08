const INITIAL_STATE = {
   page: 1
}

const pageReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case 'SET_PAGE':
         return {
            ...state,
            page: action.payload
         }
      default:
         return state;
   }
}

export default pageReducer;