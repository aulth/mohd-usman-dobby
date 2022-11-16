import React, {use, useState} from 'react'
import Link from 'next/link'
import { AvatarGenerator } from 'random-avatar-generator';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = ({setLoginTrue}) => {
    const generator = new AvatarGenerator();
    const router = useRouter();
    const [user, setUser] = useState({name:'', email:'', password:''});
    const handleOnChange = (e)=>{
        e.preventDefault();
        setUser({...user, [e.target.name]:e.target.value});
    }
    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        if(!user.name || !user.email || !user.password){
            alert("Please fill all the fields");
            return;
        }
        let avatar = generator.generateRandomAvatar();
        if(!avatar){
            alert("avatar not generated");
        }
        const response = await fetch('/api/signup', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({name:user.name, email:user.email, password:user.password, avatar:avatar})
        })
        const data = await response.json();
        if(!data.success){
           toast.error(data.msg)
            return;
        }
        if(typeof window!=='undefined'){
            localStorage.setItem('authtoken', data.authtoken);
            localStorage.setItem('dobby-avatar', data.avatar);
            toast.success("Sign up succesfull")
            setLoginTrue();
            setTimeout(() => {
                router.push('/')
            }, 1000);
        }
    }
    return (
        <>
        <ToastContainer/>
        <div className="container m-auto mt-2  md:mt-4 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create your account</h5>
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input type="text" name="name"  onChange={handleOnChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Mohd Usman" required />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email"  onChange={handleOnChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name="password" onChange={handleOnChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <button type="submit" className="w-full text-white bg-[#1F2937] hover:bg-[#141b24] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have an account? <Link href={"/login"} className="text-[#1F2937] hover:underline dark:text-blue-500">Login</Link>
                </div>
            </form>
        </div>
        </>
    )
}

export default Signup