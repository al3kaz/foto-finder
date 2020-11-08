import { combineReducers } from 'redux';

import photosReducer from './photo/photos.reducer'
import pageReducer from './actualPage/actualPage.reducer'


export default combineReducers({
   photo: photosReducer,
   page: pageReducer
})