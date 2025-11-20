import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios'

const NewStudent = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("Electronics");
    const [score, setScore] = useState(0);

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const { data } = await axios.post(`/api/user/`, { name, email, course, score } ) 
            if(data.success){
                navigate('/')
                setUser(data.user)  
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
        <div className="py-10 flex flex-col justify-between bg-white">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">               
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="name">Student Name</label>
                    <input id="name" onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="email">Student Email</label>
                    <input id="email" onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="course">Course</label>
                    <select id="course" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value={course} onChange={(e)=> setCourse(e.target.value)}>Select Category</option>
                        {[{ name: 'Electronics' }, { name: 'Clothing' }, { name: 'Accessories' }].map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="score">Score</label>
                        <input id="score" onChange={(e) => setScore(e.target.value)} value={score} type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded">ADD</button>
            </form>
        </div>
    );
};
export default NewStudent