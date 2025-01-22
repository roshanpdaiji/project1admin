// import React, { useContext } from 'react';
// import { AdminContext } from '../context/AdminContext';
// import { useNavigate } from 'react-router-dom';

// function Navbar() {

//   const { aToken,setAToken } = useContext(AdminContext);

//   const navigate = useNavigate()

//   const logout = ()=>{
//     navigate('/')
//     aToken && setAToken('')
//     aToken && localStorage.removeItem('aToken')
//   }

//   return (
//     <div className="flex justify-between items-center px-4 sm:px-8 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg">
//       {/* Left Section */}
//       <div className="flex items-center gap-4 sm:gap-6">
//         {/* Logo */}
//         <img
//           className="w-12 h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
//           src="https://tutelargroup.com/wp-content/uploads/2020/06/consulting.png"
//           alt="admin logo"
//         />
//         {/* Role Badge */}
//         <p className="px-4 py-1 text-xs sm:text-sm font-semibold rounded-full border border-gray-400 text-gray-800 bg-gray-50 shadow-inner">
//           {aToken ? 'Admin' : 'Doctor'}
//         </p>
//       </div>

//       {/* Logout Button */}
//       <button onClick={logout} className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-8 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Navbar;
import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  // Logout function for both Admin and Doctor
  const logout = () => {
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
    navigate('/');  // Navigate to login page after logout
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-8 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg">
      {/* Left Section */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Logo */}
        <img
          className="w-12 h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
          src="https://tutelargroup.com/wp-content/uploads/2020/06/consulting.png"
          alt="admin logo"
        />
        {/* Role Badge */}
        <p className="px-4 py-1 text-xs sm:text-sm font-semibold rounded-full border border-gray-400 text-gray-800 bg-gray-50 shadow-inner">
          {aToken ? 'Admin' : dToken ? 'Doctor' : 'Guest'}
        </p>
      </div>

      {/* Logout Button */}
      <button onClick={logout} className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-8 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
        Logout
      </button>
    </div>
  );
}

export default Navbar;
