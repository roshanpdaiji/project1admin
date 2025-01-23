import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
    const [appointments, setAppointments] = useState([]);

    const [dashData,setDashData]=useState(false)

    const[profileData,setProfileData]=useState(false)


    // Fetch appointments
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', {
                headers: { Authorization: `Bearer ${dToken}` }  // Ensure token is sent correctly
            });

            if (data.success) {
                setAppointments(data.appointments);
                console.log(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while fetching appointments.");
        }
    };

    // Logout function
    const logoutDoctor = () => {
        setDToken('');
        localStorage.removeItem('dToken');
        toast.success('Logged out successfully');
    };


    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/doctor/complete-appointment',
                { appointmentId },
                { headers: { dToken } }
            );
    
            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    


    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/doctor/cancel-appointment',
                { appointmentId },
                { headers: { dToken } }
            );
    
            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };
    

    const getDashData = async () => {
        try {
          const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', {
            headers: { dToken },
          });
          if (data.success) {
            setDashData(data.dashData);
            console.log(data.dashData);  // Logs dashboard data to the console
          } else {
            toast.error(data.message);  // Fixed the typo here
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);  // Fixed the typo here
        }
      };
      
    

      const getProfileData = async () => {
        try {
          const { data } = await axios.get(backendUrl + '/api/doctor/profile', {
            headers: { dToken },
          });
          console.log("Profile data response:", data);  // Log the full response
          if (data.success) {
            setProfileData(data.profileData);
            console.log(data.profileData);
          } else {
            toast.error('Failed to fetch profile data');
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message); // Fixed the typo here
        }
      };
      
    

    // Context value to be provided
    const value = {
        dToken, setDToken,
        backendUrl, appointments, setAppointments,
        getAppointments, logoutDoctor,
        completeAppointment,cancelAppointment,
        dashData,setDashData,getDashData,
        profileData,setProfileData,
        getProfileData
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
