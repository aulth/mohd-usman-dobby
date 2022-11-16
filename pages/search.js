import React from 'react'
import Images from '../components/Images'

const Search = ({searchedImage}) => {
  return (
    <Images images={searchedImage} />
  )
}

export default Search