import React, { useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import ImageItem from './ImageItem'
const Upload = () => {
    const [uploading, setUploading] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [processed, setProcessed] = useState(false)
    const [progress, setProgress] = useState(0);
    const [images, setImages] = useState();
    const [processing, setProcessing] = useState(false)
    let image = {};
    const imageProcessing = async (e) => {
        e.preventDefault();
        if (typeof window !== 'undefined') {
            let uploadedImage = document.getElementById('uploaded-image')
            const files = e.target.files;
            setProcessing(true);
            for (let i = 0; i < e.target.files.length; i++) {
                let data = new FormData();
                data.append('file', files[i]);
                data.append('upload_preset', 'myspaceitem');
                let response = await fetch('https://api.cloudinary.com/v1_1/mohdusman1/image/upload', {
                    method: "POST",
                    body: data
                })
                let file = await response.json();
                image[i] ={
                    name:files[i].name,
                    url:file.url
                }
                setProgress((100/e.target.files.length)*(i+1));
            }
            setProgress(0);
            setProcessing(false);
            setImages(image);
            
            setTimeout(() => {
                setProcessed(true)
            }, 100);
            }
    }
    return (
        <div className='p-4 md:pt-3 mt-2'>
            {
                !processed && <div className="flex items-center justify-center m-auto container">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, WrbP, BMP, SVG, JPG or GIF </p>
                    </div>
                    <input onChange={imageProcessing} id="dropzone-file" type="file" className="hidden" multiple accept='/image*' />
                </label>
            </div>
            }
            <div id='uploaded-image' className="container m-auto mt-2 flex flex-wrap">
            </div>
            {
                processing && <div className="container h-2 m-auto bg-[#CCD0D6] rounded my-4">
                <div style={{width:`${progress}%`}} id="image-progress" className=' h-2 w-20 bg-[#1F2937] rounded'></div>
            </div>
            }
            {
                processing && <h2 className="text-lg text-green-500 font-semibold my-3 text-center">Image processing</h2>
            }
           {
                processed && Object.keys(images).map(key=>{
                    return <ImageItem key={key} image={images[key]} />
                })
           }
        </div>

    )
}

export default Upload