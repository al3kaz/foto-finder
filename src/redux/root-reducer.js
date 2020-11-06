import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import photosReducer from './photo/photos.reducer'
import spinnerReducer from './spinner/spiner.reducer'

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['photo' , 'spinner']
}

const rootReducer = combineReducers({
   photo: photosReducer,
   spinner: spinnerReducer
})

export default persistReducer( persistConfig ,rootReducer)