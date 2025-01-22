import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DoctorContext } from '../context/DoctorContext';

function Login() {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAToken, backendUrl } = useContext(AdminContext);

    const {setDToken}=useContext(DoctorContext)

    const navigate = useNavigate();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
    
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
    
                console.log('API Response:', data);
    
                // Fixed the success property check
                if (data && data.successs) { 
                    console.log("Received Token:", data.token);
                    setAToken(data.token);
                    localStorage.setItem('adminToken', data.token);
                    toast.success('Admin Login Successful');
                    navigate('/admin-dashboard');
                } else {
                    console.error('Login failed:', data.message || 'Unknown error');
                    toast.error(data.message || 'Login failed. Please try again.');
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });
    
                console.log('API Response:', data);
    
                // Ensure correct success check
                if (data && data.success) {
                    localStorage.setItem("dToken", data.token);
                    setDToken(data.token);  // Assuming there's a state setter for doctors
                    toast.success('Doctor login successful');
                    navigate('/doctor-dashboard');  // Ensure proper navigation
                } else {
                    toast.error(data.message || 'Login failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An error occurred during login. Please try again.');
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 w-full max-w-sm p-8 bg-white border rounded-xl shadow-xl transform transition duration-500 ">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{state} Login</h2>

                <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="email" className="text-sm text-gray-600">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                </div>

                <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="password" className="text-sm text-gray-600">Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        autoComplete="current-password"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                </div>

                <button
                    type="submit"
                    className="btn w-full py-3 mt-6 text-white bg-black rounded-lg hover:bg-gray-800 transition duration-300"
                >
                    Login
                </button>

                <div className="text-center mt-4">
                    {state === 'Admin' ? (
                        <p className="text-sm text-gray-600">Doctor Login? 
                            <span
                                className="clickhere text-blue-600 underline cursor-pointer hover:text-blue-800 transition duration-200"
                                onClick={() => setState('Doctor')}
                            >
                                Click here
                            </span>
                        </p>
                    ) : (
                        <p className="text-sm text-gray-600">Admin Login? 
                            <span
                                className="clickhere text-blue-600 underline cursor-pointer hover:text-blue-800 transition duration-200"
                                onClick={() => setState('Admin')}
                            >
                                Click here
                            </span>
                        </p>
                    )}
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
