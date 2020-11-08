import { combineReducers } from 'redux';

import photosReducer from './photo/photos.reducer'
import spinnerReducer from './spinner/spiner.reducer'
import pageReducer from './actualPage/actualPage.reducer'


export default combineReducers({
   photo: photosReducer,
   spinner: spinnerReducer,
   page: pageReducer
})