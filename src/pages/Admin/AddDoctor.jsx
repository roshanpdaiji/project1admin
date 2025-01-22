import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



function AddDoctor() {

  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [about, setAbout] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Check if image is selected
      if (!docImg) {
        return toast.error('Image Not Selected');
      }

      // Create FormData to send as multipart/form-data
      const formData = new FormData();

      // Append the form fields to formData
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password); // Fixed typo in 'password'
      formData.append('experience', experience);
      formData.append('fees', fees); // Assuming fees is a string, can be converted to number in the backend if needed
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
      formData.append('about', about);

      // Log the form data for debugging
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setSpeciality('General Physician');
        setDegree('');
        setAddress1('');
        setAddress2('');
        setAbout('');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      
      console.error('Error during submission', error);
      toast.error('Error occurred while adding doctor');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <form onSubmit={onSubmitHandler}>
        <p className="text-2xl font-semibold mb-6">Add Doctor</p>

        {/* Upload Doctor Picture */}
        <div className="mb-6 flex items-center ml-5">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="h-12 w-12 rounded-full border border-gray-300"
              src={docImg ? URL.createObjectURL(docImg) : 'https://th.bing.com/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?rs=1&pid=ImgDetMain'}
              alt="Upload Icon"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <div className="ml-4">
            <p className="text-sm text-gray-600">Upload doctor <br />Picture</p>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="font-medium">Doctor Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="font-medium">Doctor Email</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email}
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="font-medium">Doctor Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="font-medium">Experience</p>
            <select onChange={(e) => setExperience(e.target.value)} value={experience}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="4 Years">4 Years</option>
              <option value="5 Years">5 Years</option>
              <option value="6 Years">6 Years</option>
              <option value="7 Years">7 Years</option>
              <option value="8 Years">8 Years</option>
              <option value="9 Years">9 Years</option>
              <option value="10 Years">10 Years</option>
            </select>
          </div>

          <div>
            <p className="font-medium">Fees</p>
            <input onChange={(e) => setFees(e.target.value)} value={fees}
              type="number"
              placeholder="Fees"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="font-medium">Speciality</p>
            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="General Physician">General Physician</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Orthopedist">Orthopedist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Neurologist">Neurologist</option>
            </select>
          </div>

          <div>
            <p className="font-medium">Education</p>
            <input onChange={(e) => setDegree(e.target.value)} value={degree}
              type="text"
              placeholder="Education"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2">
            <p className="font-medium">Address</p>
            <input onChange={(e) => setAddress1(e.target.value)} value={address1}
              type="text"
              placeholder="Address 1"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <input onChange={(e) => setAddress2(e.target.value)} value={address2}
              type="text"
              placeholder="Address 2"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* About Doctor */}
        <div className="mb-6">
          <p className="font-medium">About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about}
            placeholder="Write about doctor"
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add Doctor
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddDoctor;
