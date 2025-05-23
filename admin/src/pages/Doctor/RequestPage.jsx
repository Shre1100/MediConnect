import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import { useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from 'axios'

const RequestPage = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [summary, setSummary] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const navigate = useNavigate();
  const { request, setRequest } = useContext(DoctorContext);

  const { backendUrl } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fee', Number(fee))
            formData.append('summary', summary)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            // console log formdata            
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const { data } = await axios.post(backendUrl + '/api/doctor/send-request', formData)
            if (data.success) {
                toast.success(data.message);
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setSummary('')
                setFee('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

  const navigateBack = () => {
    if (request) {
      navigate("/");
      setRequest(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-white mx-10 rounded-2xl p-5 items-center mt-7">
      <button
        onClick={() => navigateBack()}
        className="cursor-pointer fixed left-15 top-10 px-5 rounded-3xl py-2 bg-[#7483bd] font-semibold text-white"
      >
        Back
      </button>
      <p className="text-2xl underline font-semibold">
        Fill the form given below
      </p>
      <p>
        This form sends a request to the Admin, once the Admin approves the
        request you will be given the access to this application
      </p>

      <form onSubmit={onSubmitHandler} className="mt-5 w-full">
        <div className="bg-white lg:mx-20 px-8 py-8 border rounded  ">
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label htmlFor="doc-img">
              <img
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt=""
              />
            </label>
            <input
              onChange={(e) => setDocImg(e.target.files[0])}
              type="file"
              name=""
              id="doc-img"
              hidden
            />
            <p>
              Upload doctor <br /> picture
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <p>Your name</p>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Email</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="border rounded px-3 py-2"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Set Password</p>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="border rounded px-3 py-2"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Experience</p>
                <select
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                  className="border rounded px-2 py-2"
                >
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Years</option>
                  <option value="3 Year">3 Years</option>
                  <option value="4 Year">4 Years</option>
                  <option value="5 Year">5 Years</option>
                  <option value="6 Year">6 Years</option>
                  <option value="8 Year">8 Years</option>
                  <option value="9 Year">9 Years</option>
                  <option value="10 Year">10 Years</option>
                </select>
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Consultation Fee</p>
                <input
                  onChange={(e) => setFee(e.target.value)}
                  value={fee}
                  className="border rounded px-3 py-2"
                  type="number"
                  placeholder="Doctor fees"
                  required
                />
              </div>
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <p>Speciality</p>
                <select
                  onChange={(e) => setSpeciality(e.target.value)}
                  value={speciality}
                  className="border rounded px-2 py-2"
                >
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Orthopaedics">Orthopaedics</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Urologist">Urologist</option>
                  <option value="Cardiologist">Cardiologist</option>
                </select>
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Degree</p>
                <input
                  onChange={(e) => setDegree(e.target.value)}
                  value={degree}
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Degree"
                  required
                />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Address</p>
                <input
                  onChange={(e) => setAddress1(e.target.value)}
                  value={address1}
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Address 1"
                  required
                />
                <input
                  onChange={(e) => setAddress2(e.target.value)}
                  value={address2}
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Address 2"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <p className="mt-4 mb-2">Add Summary</p>
            <textarea
              onChange={(e) => setSummary(e.target.value)}
              value={summary}
              className="w-full px-4 pt-2 border rounded"
              rows={5}
              placeholder="write about yourself"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#7483bd] font-semibold text-white cursor-pointer px-10 py-3 mt-4 rounded-full"
          >
            Send Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestPage;
