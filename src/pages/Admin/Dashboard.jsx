import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

function Dashboard() {
  const { aToken, getDashData, dashData } = useContext(AdminContext);


  const {slotDateFormat}=useContext(AppContext)



  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    <div className='m-5 border-t-2 border-gray-300 pt-4'>
      <div className='flex justify-around items-center gap-4'>  
        <div className='flex items-center gap-2 bg-white p-3 min-w-44 rounded border border-gray-200 cursor-pointer shadow-sm hover:shadow-md transition-all'>
          <img className='h-8' src="https://www.arohieye.in/wp-content/uploads/2024/02/clipart.jpg" alt="doctor icon" />
          <div>
            <p className="text-lg font-medium">{dashData?.doctors || 0}</p>
            <p className="text-sm text-gray-600">Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-3 min-w-44 rounded border border-gray-200 cursor-pointer shadow-sm hover:shadow-md transition-all'>
          <img className='h-8' src="https://icon-library.com/images/appointment-icon/appointment-icon-3.jpg" alt="appointment icon" />
          <div>
            <p className="text-lg font-medium">{dashData?.appointments || 0}</p>
            <p className="text-sm text-gray-600">Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-3 min-w-44 rounded border border-gray-200 cursor-pointer shadow-sm hover:shadow-md transition-all'>
          <img className='h-8' src="https://cdn1.iconfinder.com/data/icons/doctor-5/100/01-1Patient_1-1024.png" alt="patient icon" />
          <div>
            <p className="text-lg font-medium">{dashData?.patients || 0}</p>
            <p className="text-sm text-gray-600">Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex tems-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img className='h-8' src="https://cdn1.iconfinder.com/data/icons/soicons-text-editing/24/list-square-1024.png" alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>
      </div>
      <div className="mt-5">
  {dashData?.latestAppointments?.length > 0 ? (
    dashData.latestAppointments.map((item, index) => (
      <div 
        key={index} 
        className="flex items-center justify-between bg-white p-3 rounded-md shadow-md border border-gray-200 mb-3"
      >
        {/* Doctor Image */}
        <img 
          className="h-12 w-12 rounded-full object-cover border border-gray-300" 
          src={item?.docData?.image || "https://via.placeholder.com/150"} 
          alt="Doctor" 
        />

        {/* Appointment Details */}
        <div className="flex-1 ml-3">
          <p className="text-lg font-semibold text-gray-800">{item?.docData?.name || "N/A"}</p>
          <p className="text-sm text-gray-500">{slotDateFormat(item?.slotDate)}</p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center">
          {item?.cancelled ? (
            <p className="text-red-500 text-sm font-medium">Cancelled</p>
          ) : (
            <div className="flex items-center">
              <img 
                className="h-4 w-4 mr-2" 
                src="https://cdn-icons-png.flaticon.com/512/190/190411.png" 
                alt="Checked Icon" 
              />
              <p className="text-green-500 text-sm font-medium">Confirmed</p>
            </div>
          )}
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No recent appointments available.</p>
  )}
</div>




    </div>
  );
}

export default Dashboard;
