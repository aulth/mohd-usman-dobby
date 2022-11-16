import React, {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = ({setLoginTrue}) => {
    const router =useRouter();
    const [user, setUser] = useState({email:'', password:''});
    const handleOnChange = (e)=>{
        e.preventDefault();
        setUser({...user, [e.target.name]:e.target.value});
    }
    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        if(!user.email || !user.password){
            alert("Please fill all the fields");
            return;
        }
        const response = await fetch('/api/login', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({email:user.email, password:user.password})
        })
        const data = await response.json();
        if(!data.success){
            toast.error(data.msg)
            return;
        }
        if(typeof window!=='undefined'){
            localStorage.setItem('authtoken', data.authtoken);
            localStorage.setItem('dobby-avatar', data.avatar);
            toast.success("Login successful")
            setLoginTrue();
            setTimeout(() => {
                router.push('/');
            }, 1000);
            return;
        }
    }
    return (
        <>
        <ToastContainer/>
            <div className="container m-auto md:mt-4 mt-2 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleOnSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to your account</h5>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" onChange={handleOnChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" onChange={handleOnChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <button type="submit" className="w-full text-white bg-[#1F2937] hover:bg-[#141b24] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <Link href={"/signup"} className="text-[#1F2937] hover:underline dark:text-blue-500">Create account</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login