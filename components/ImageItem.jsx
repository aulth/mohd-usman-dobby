import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
const ImageItem = ({ image }) => {
  const [data, setData] = useState({ name: image.name, url: image.url, authtoken: '' })
  const [uploaded, setUploaded] = useState(false)
  const router = useRouter();
  useEffect(() => {
    if (typeof window != 'undefined') {
      if (localStorage.getItem('authtoken')) {
        setData({ ...data, authtoken: localStorage.getItem('authtoken') })
      } else {
        router.push('/login');
      }
    }
  }, [])

  const onNameChange = (e) => {
    e.preventDefault();
    setData({ ...data, name: e.target.value });
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/upload', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: data.name, url: data.url, authtoken: data.authtoken })
    })
    const responseJson = await response.json();
    if (responseJson.success) {
      setUploaded(true)
    } else {
      toast.info(responseJson.msg);
    }
  }
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleOnSubmit} className='w-full md:text-base text-sm flex justify-between border border[#1F2937] rounded m-1'>
        <div className="flex w-full">
          <img src={data.url} className='w-[80px] rounded-l aspect-[16/9] border-b border[#1F2937]' alt="" />
          {
            !uploaded && <input type="text" onChange={onNameChange} value={data.name} className='border-none bg-gray-50 h-full w-full px-2 focus:outline-none' />
          }
          {
            uploaded && <input type="text" onChange={onNameChange} value={data.name} className='border-none bg-gray-50 h-full text-green-500 w-full px-2 focus:outline-none disabled:' />
          }
        </div>
        {
          uploaded && <button className="px-2 py-1 rounded-r bg-[#1F2937] text-[#CCD0D6]" disabled>
            Uploaded
          </button>
        }
        {
          !uploaded && <button className="px-2 py-1 rounded-r bg-[#1F2937] text-[#CCD0D6]">
            Upload
          </button>
        }
      </form>
    </>
  )
}

export default ImageItem