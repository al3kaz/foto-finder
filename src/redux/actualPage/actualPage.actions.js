import {ActualPageTypes} from './actualPage.types'

export const setPage = page => ({
   type: ActualPageTypes.SET_PAGE,
   payload: page
});