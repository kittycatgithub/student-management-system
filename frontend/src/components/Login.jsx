import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
    const {setShowUserLogin,showUserLogin,user, setUser, navigate} = useAppContext()

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Show/hide state

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/${state}`, { name, email, password } ) 
            // const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/${state}`, { name, email, password } ) 
            if(data.success){
                navigate('/')
                setUser(data.user) 
                console.log(user) 
                toast.success('Logged In')
                setShowUserLogin(false)              
            } else {
                toast.error(data.message)
            }  
        } catch (error) {
                toast.error(error.message)   
        }
    }

    return (
        <div onClick={()=> {setShowUserLogin(false), console.log(showUserLogin)}} className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50">
        <form onClick={(e)=>e.stopPropagation()} 
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
            </div>
            {/* <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
            </div> */}
             <div className="w-full ">
                <p>Password</p>
                <div className="flex flex-row">
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="relative border border-gray-200 rounded w-full p-2 mt-1 outline-blue-200" 
                       type={showPassword ? "text" : "password"} required />
                       <span 
                        className="right-3 mt-3 -ml-7 z-40 top-[47px] text-sm text-blue-500 cursor-pointer select-none"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <svg viewBox="0 0 24 24" className="h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> : 
                        <svg fill="#000000" viewBox="0 0 32 32" className="h-5" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>eye-slash</title> <path d="M18.822 22.904c-5.215 1.275-10.524-1.051-15.818-6.904 1.337-1.501 2.79-2.843 4.364-4.034l0.076-0.055c0.186-0.138 0.305-0.357 0.305-0.604 0-0.414-0.336-0.75-0.75-0.75-0.166 0-0.32 0.054-0.444 0.146l0.002-0.001c-1.91 1.447-3.588 3.024-5.086 4.761l-0.036 0.042c-0.115 0.131-0.185 0.305-0.185 0.494s0.070 0.363 0.186 0.495l-0.001-0.001c4.803 5.488 9.693 8.254 14.582 8.254 1.123-0.001 2.212-0.142 3.252-0.406l-0.092 0.020c0.332-0.082 0.573-0.377 0.573-0.729 0-0.414-0.336-0.75-0.75-0.75-0.064 0-0.125 0.008-0.184 0.023l0.005-0.001zM16.75 20c-0-0.414-0.336-0.75-0.75-0.75v0c-1.794-0.002-3.248-1.456-3.25-3.25v-0c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0c0.003 2.622 2.128 4.747 4.75 4.75h0c0.414-0 0.75-0.336 0.75-0.75v0zM23.565 22.503c2.701-1.672 5.010-3.665 6.965-5.967l0.034-0.042c0.116-0.131 0.186-0.304 0.186-0.494s-0.070-0.363-0.187-0.495l0.001 0.001c-6.844-7.82-13.822-10.081-20.758-6.76l-7.277-7.276c-0.135-0.131-0.32-0.212-0.523-0.212-0.414 0-0.75 0.336-0.75 0.75 0 0.203 0.081 0.388 0.213 0.523l27.999 28.001c0.136 0.136 0.324 0.22 0.531 0.22 0.415 0 0.751-0.336 0.751-0.751 0-0.207-0.084-0.395-0.22-0.531v0zM28.996 16c-1.852 2.121-4.004 3.919-6.402 5.345l-0.121 0.067-2.636-2.635c0.569-0.767 0.911-1.731 0.912-2.776v-0c-0.003-2.622-2.128-4.747-4.75-4.75h-0c-1.045 0.002-2.009 0.344-2.789 0.921l0.013-0.009-2.29-2.29c6.027-2.647 11.95-0.64 18.062 6.127zM14.301 13.239c0.486-0.307 1.077-0.489 1.711-0.489 1.788 0 3.238 1.45 3.238 3.238 0 0.634-0.182 1.225-0.497 1.724l0.008-0.013z"></path> </g></svg>}
                    </span>
                </div>
                {/* <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-200" 
                       type="password" required /> */}
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                </p>
            )}
            <button className="bg-amber-500 hover:bg-amber-600 transition-all text-black w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
        </div>
    );
};
export default Login