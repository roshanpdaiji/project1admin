import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';

function DoctorDashboard() {

  const { dToken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    getDashData(); // Fetch the dashboard data on component mount
  }, [dToken]);

  return (
    <div className="m-5 border-t-2 border-gray-300 pt-4">
      {dashData ? (
        <>
          {/* Dashboard Header */}
          <h1 className="text-xl font-semibold mb-6">Dashboard</h1>

          {/* Stats Section */}
          <div className="flex flex-wrap justify-around items-center gap-4 mt-5">
            {/* Earnings Section */}
            <div className="flex items-center gap-2 bg-white p-4 min-w-44 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-all">
              <img className="h-8" src="https://th.bing.com/th/id/OIP.4HwHg7K2Ev6VWiZXS9aZkQHaJI?w=860&h=1060&rs=1&pid=ImgDetMain" alt="earnings icon" />
              <div>
                <p className="text-lg font-medium">{currency} {dashData.earnings || 0}</p>
                <p className="text-sm text-gray-600">Earnings</p>
              </div>
            </div>

            {/* Appointments Section */}
            <div className="flex items-center gap-2 bg-white p-4 min-w-44 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-all">
              <img className="h-8" src="https://icon-library.com/images/appointment-icon/appointment-icon-3.jpg" alt="appointment icon" />
              <div>
                <p className="text-lg font-medium">{dashData.appointments || 0}</p>
                <p className="text-sm text-gray-600">Appointments</p>
              </div>
            </div>

            {/* Patients Section */}
            <div className="flex items-center gap-2 bg-white p-4 min-w-44 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-all">
              <img className="h-8" src="https://cdn1.iconfinder.com/data/icons/doctor-5/100/01-1Patient_1-1024.png" alt="patient icon" />
              <div>
                <p className="text-lg font-medium">{dashData.patients || 0}</p>
                <p className="text-sm text-gray-600">Patients</p>
              </div>
            </div>
          </div>

          {/* Latest Bookings */}
          <div className="bg-white mt-10 rounded-lg shadow-md">
            <div className="flex items-center gap-2.5 px-4 py-4 rounded-t-lg border-b">
              <img className="h-8" src="https://cdn1.iconfinder.com/data/icons/soicons-text-editing/24/list-square-1024.png" alt="Bookings Icon" />
              <p className="font-semibold text-lg">Latest Bookings</p>
            </div>
            <div className="mt-5">
              {dashData.latestAppointments.length > 0 ? (
                dashData.latestAppointments.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-4 rounded-md shadow-md border border-gray-200 mb-4">
                    {/* Doctor Image */}
                    <img className="h-12 w-12 rounded-full object-cover border border-gray-300" src={item?.userData?.image || "https://via.placeholder.com/150"} alt="Doctor" />

                    {/* Appointment Details */}
                    <div className="flex-1 ml-4">
                      <p className="text-lg font-semibold text-gray-800">{item?.userData?.name || "N/A"}</p>
                      <p className="text-sm text-gray-500">{slotDateFormat(item?.slotDate)}</p>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center">
                      {item?.cancelled ? (
                        <p className="text-red-500 text-sm font-medium">Cancelled</p>
                      ) : (
                        <div className="flex items-center">
                          <img className="h-4 w-4 mr-2" src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Checked Icon" />
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

          {/* Earnings and Other Stats */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <p className="font-medium">Total Earnings: {currency} {dashData.earnings}</p>
            <p className="font-medium">Total Appointments: {dashData.appointments}</p>
            <p className="font-medium">Total Patients: {dashData.patients}</p>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
}

export default DoctorDashboard;




