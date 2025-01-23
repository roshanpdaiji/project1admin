import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function DoctorProfile() {
  const { dToken, profileData, setProfileData, getProfileData,backendUrl } = useContext(DoctorContext);
  const { currency, } = useContext(AppContext);

  const [isEdit,setIsEdit]=useState(false)

  //Update Profile

  const updateProfile = async()=>{
    try {
      const updateData = {
        address:profileData.address,
        fees:profileData.fees,
        available:profileData.available
      }

      const {data} = await axios.post(backendUrl + '/api/doctor/update-profile',updateData,{headers:{dToken}})
if (data.success) {
  toast.success(data.message)
  setIsEdit(false)
  getProfileData()
}
else{
  toast.error(data.message)
}
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }


  useEffect(() => {
    if (dToken) {
      getProfileData(); // Ensure this sets the profile data correctly.
    }
  }, [dToken]);

  return profileData && (
    <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:gap-12 m-5 max-w-6xl mx-auto">
      {/* Profile Image Section */}
      <div className="flex-shrink-0 w-full md:w-1/3">
        <img 
          className="w-full rounded-lg shadow-lg object-cover"
          src={profileData.image} 
          alt="Doctor Profile" 
        />
      </div>

      {/* Profile Information Section */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800">{profileData.name}</h2>
        
        {/* Degree and Experience */}
        <div className="flex items-center gap-3 mt-3 text-gray-600">
          <p className="text-lg">{profileData.degree}</p>
          <button className="text-sm py-1 px-3 border border-gray-300 text-gray-600 rounded-full">{profileData.experience}</button>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700">About</p>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">{profileData.about}</p>
        </div>

        {/* Appointment Fee */}
        <p className="mt-4 text-lg font-medium text-gray-800">
          Appointment Fee: <span className="text-xl text-primary-600">{currency} {isEdit?  
          <input type='number' onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))} value={profileData.fees} />
          
           :profileData.fees}</span>
        </p>

  {/* Address Section */}
<div className="mt-4 flex flex-col gap-2">
  <div className='flex gap-2 py-2'>
    <p>Address:</p>
    <div className="text-sm text-gray-600">
      {/* Conditional rendering of the address */}
      {isEdit ? (
        <>
          <input 
            type='text' 
            onChange={(e) => setProfileData(prev => ({
              ...prev,
              address: { ...prev.address, line1: e.target.value }
            }))}
            value={profileData.address.line1} 
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          <input 
            type='text' 
            onChange={(e) => setProfileData(prev => ({
              ...prev,
              address: { ...prev.address, line2: e.target.value }
            }))}
            value={profileData.address.line2} 
            className="border border-gray-300 rounded-md p-2"
          />
        </>
      ) : (
        <>
          <span>{profileData.address.line1}, </span>
          <span>{profileData.address.line2}</span>
        </>
      )}
    </div>
  </div>
</div>


        {/* Availability Section */}
        <div className="mt-4 flex items-center gap-2">
          <input onChange={()=>isEdit && setProfileData(prev=>({...prev,available: ! prev.available}))} checked={profileData.available} type="checkbox" id="availability" className="h-5 w-5 text-green-500 border-gray-300 rounded" />
          <label  htmlFor="availability" className="text-sm text-gray-700">Available</label>
        </div>

     {/* Edit Button */}



<div className="mt-6">
 
{
  isEdit
  ? <button onClick={updateProfile} className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
  Save
</button>
:  <button onClick={()=>setIsEdit(true)} className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
Edit Profile
</button>

}


</div>

      </div>
    </div>
  );
}

export default DoctorProfile;




