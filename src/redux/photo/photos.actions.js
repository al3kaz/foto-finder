import {PhotoTypes} from './photo.types'

export const setPhotos = photo => ({
   type: PhotoTypes.SET_PHOTOS,
   payload: photo
});