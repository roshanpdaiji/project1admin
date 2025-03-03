import React from 'react';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

function Sidebar() {
  const { aToken } = useContext(AdminContext);

  const{dToken}=useContext(DoctorContext)

  return (
    <div className="min-h-screen bg-gray-100 border-r border-gray-200 shadow-lg">
      {aToken && (
        <ul className="text-gray-700 mt-5 space-y-2">
          {/* Dashboard */}
          <NavLink
            to={'/admin-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 md:px-8 md:min-w-72 cursor-pointer rounded-lg transition duration-300 ${
                isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-200'
              }`
            }
          >
            <img
              className="h-6 w-6"
              src="https://www.pngkey.com/png/full/432-4323239_confeti-y-serpentinas-png.png"
              alt="Dashboard"
            />
            <p className="text-base font-medium">Dashboard</p>
          </NavLink>

          {/* Appointments */}
          <NavLink
            to={'/all-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 md:px-8 md:min-w-72 cursor-pointer rounded-lg transition duration-300 ${
                isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-200'
              }`
            }
          >
            <img
              className="h-6 w-6"
              src="https://cdn2.iconfinder.com/data/icons/medical-healthcare-26/28/Appointment-512.png"
              alt="Appointments"
            />
            <p className="text-base font-medium">Appointments</p>
          </NavLink>

          {/* Add Doctor */}
          <NavLink
            to={'/add-doctor'}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 md:px-8 md:min-w-72 cursor-pointer rounded-lg transition duration-300 ${
                isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-200'
              }`
            }
          >
            <img
              className="h-6 w-6"
              src="https://cdn-icons-png.flaticon.com/512/63/63747.png"
              alt="Add Doctor"
            />
            <p className="text-base font-medium">Add Doctor</p>
          </NavLink>

          {/* Doctors List */}
          <NavLink
            to={'/doctor-list'}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 md:px-8 md:min-w-72 cursor-pointer rounded-lg transition duration-300 ${
                isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-200'
              }`
            }
          >
            <img
              className="h-6 w-6"
              src="https://static.vecteezy.com/system/resources/previews/010/159/990/non_2x/people-icon-sign-symbol-design-free-png.png"
              alt="Doctors List"
            />
            <p className="text-base font-medium">Doctors List</p>
          </NavLink>
        </ul>
      )}




{dToken && (
        <ul className="text-gray-700 mt-5 space-y-2">
          {/* Dashboard */}
          <NavLink
            to={'/doctor-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 md:px-8 md:min-w-72 cursor-pointer rounded-lg transition duration-300 ${
                isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-200'
              }`
            }
          >
            <img
              className="h-6 w-6"
              src="https://www.pngkey.com/png/full/432-4323239_confeti-y-serpentinas-png.png"
              alt="Dashboard"
            />
            <p className="text-base font-medium">Dashboard</p>
          </NavLink>

          {/* Appointments */}
          <NavLink
            to={'/doctor-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 md:px-8 md:min-w-72 cursor-pointer rounded-lg transition duration-300 ${
                isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-200'
              }`
            }
          >
            <img
              className="h-6 w-6"
              src="https://cdn2.iconfinder.com/data/icons/medical-healthcare-26/28/Appointment-512.png"
              alt="Appointments"
            />
            <p className="text-base font-medium">Appointments</p>
          </NavLink>

     

          {/* Doctors List */}
          <NavLink
            to={'/doctor-profile'}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 md:px-8 md:min-w-72 cursor-pointer rounded-lg transition duration-300 ${
                isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-200'
              }`
            }
          >
            <img
              className="h-6 w-6"
              src="https://static.vecteezy.com/system/resources/previews/010/159/990/non_2x/people-icon-sign-symbol-design-free-png.png"
              alt="Doctors List"
            />
            <p className="text-base font-medium">Profile</p>
          </NavLink>
        </ul>
      )}




    </div>
  );
}

export default Sidebar;
