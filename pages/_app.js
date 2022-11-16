import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploadClicked, setUploadClicked] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('authtoken')) {
        router.push('/login');
      } else {
        setIsLoggedIn(true)
      }
    }
  }, [])
  const toggleUpload = () => {
    if (uploadClicked) {
      setUploadClicked(false);
      return;
    }
    setUploadClicked(true);
  }
  const logout = () => {
    if (typeof window != 'undefined') {
      localStorage.removeItem('authtoken');
      localStorage.removeItem('dobby-avatar');
      setIsLoggedIn(false);
      router.push('/login')
    }
  }
  const setLoginTrue = ()=>{
    setIsLoggedIn(true);
  }
  //images fetching 
  const [images, setImages] = useState();
  const [searchedImage, setSearchedImage] = useState()
  const fetchImages = async (authtoken) => {
    const response = await fetch('/api/fetchimages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ authtoken: authtoken })
    })
    const data = await response.json();
    if (data.success) {
      setImages(data.image);
      setSearchedImage(data.image)
    } else {
      toast.info(data.msg);
    }
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("authtoken")) {
        fetchImages(localStorage.getItem('authtoken'));
      } else {
        router.push('/login')
      }
    }
  }, [])

  //images fetching end
  return <>
  <Head>
  <title>Dobby</title>
        <meta name="description" content="upload your images" />
        <link rel="icon" href="/favicon.ico" />
  </Head>
    <Navbar images={images} setSearchedImage={setSearchedImage} toggleUpload={toggleUpload} logout={logout} isLoggedIn={isLoggedIn} />
    <Component images={images} searchedImage={searchedImage} uploadClicked={uploadClicked} setLoginTrue={setLoginTrue}   {...pageProps} />
  </>
}

export default MyApp
