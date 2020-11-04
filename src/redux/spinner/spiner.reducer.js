const INITIAL_STATE = {
   loading: true
}

const spinnerReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case 'SET_SPINNER':
         return {
            ...state,
            loading: action.payload
         }
      default:
         return state;
   }
}

export default spinnerReducer;