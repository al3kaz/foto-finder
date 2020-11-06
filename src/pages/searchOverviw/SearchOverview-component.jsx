import React from 'react';
import { connect } from 'react-redux'

import PhotosList from '../../components/photosList/photosList-component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'


const PhotosListWithSpinner = WithSpinner(PhotosList)

const SearchOverview = ({ loading }) => {
   return (<div>
      <PhotosListWithSpinner isLoading={loading} />
   </div>);
}

const mapStateToProps = state => ({
   loading: state.spinner.loading,
})

export default connect(mapStateToProps)(SearchOverview);