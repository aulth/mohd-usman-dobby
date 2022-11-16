import React, { useState, useEffect } from 'react'
const Images = ({images}) => {
  return (
    <>
      <div className="container p-4 flex flex-wrap">
        {
          images && images.length>0 && images.map((image, index)=>{
            return <div key={index} className="rounded border m-1 border-[#CCD0D6] text-[#8F96A3] overflow-hidden w-[200px] hover:shadow cursor-pointer">
            <a href={image.url}><img src={image.url} className='w-[200px] rounded-t border-b border-[#CCD0D6]' alt="" /></a>
            <h2 className="font-semibold p-1 flex flex-wrap w-1/2 break-words">
              {image.name}
            </h2>
          </div>
          })
        }
      </div>
    </>
  )
}

export default Images