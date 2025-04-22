import React, { useState } from "react";
import {assets} from "../assets/assets";


const Contact = () =>{
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({ email: '', message: '' });

    const handleClick = () => {
        setIsVisible(true);

        setTimeout(() => {
        setIsVisible(false);
        }, 3000);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setFormData({ email: '', message: '' });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value,
        }));
    };


    return(
        <div className="flex flex-col justify-center mb-5">
            {isVisible && (
                <div className="fixed top-[7rem] right-[-5px] -translate-x-1/2 -translate-y-1/2 bg-green-200 text-green-800 p-4 rounded-md shadow-lg z-50">
                    Message Sent Successfully!
                </div>
            )}
            <h1 className="md:text-2xl lg:text-4xl text-lg font-semibold drop-shadow- p-2 px-4">CONTACT US</h1>
            <div className="mx-4 w-[35px] md:w-[50px] lg:w-[75px] border-b-2  border-primary"></div>
            <p className="mx-4 md:text-lg my-4">We would love to hear from you! Let us know of your experience with mediConnect, and keep in touch.</p>
            <div className="flex flex-col gap-5 justify-evenly md:flex-row w-full mt-3">
                
                <div className="md:w-[60%] flex flex-col justify-center bg-white rounded-xl md:p-3 lg:p-5 shadow-lg">

                    <p className="md:mb-2 lg:mb-5 mx-5">We're so glad you're thinking of connecting with us! Whether it's a tiny query or a big idea, don't hesitate to reach out. We're excited to connect and make your experience with <b>mediConnect</b> even better. Your well-being is at the heart of everything we do, and we truly value the opportunity to hear from you. Drop us a line – we're here to help with a smile.</p>
                    
                    <div className="flex flex-col justify-center items-center w-[100%]">
                        <form onSubmit={handleSubmit} className="w-[100%]" >
                            <div className="m-3 flex flex-col items-center lg:mb-5">
                                <label className="self-start ml-2 mb-1">Email:</label>
                                <input value={formData.email} onChange={handleChange} type="email" name="email" id="e-address" placeholder="Enter your email address" required className="w-[95%] h-[30px] rounded-lg p-3 border border-solid border-gray-500"/>
                            </div>
                            <div className=" m-3  flex flex-col items-center lg:mb-5">
                                <label className="self-start ml-2 mb-1">Message:</label>
                                <textarea onChange={handleChange} value={formData.message} name="message" id="msg" placeholder="Type your message here..." required className="w-[95%] border border-solid border-gray-500 lg:h-[100px] rounded-xl p-3 outline-none resize-none"></textarea>
                            </div>
                            <div className="justify-center flex">
                                <button type="submit" onClick={handleClick} className="m-3 msg-button text-white bg-[#241f35] w-[30%] lg:w-[20%] h-[38px] rounded-lg hover:bg-primary hover:shadow-md hover:scale-105 hover:text-white transition-all duration-300 cursor-pointer">
                                    Send
                                </button>
                            </div>
                        </form>

                    </div>
                </div>


                <img className="sm:w-[35%] md:h-[450px] lg:h-[500px] md:w-[40%] lg:w-[45%] hidden md:block rounded-lg" src={assets.contact_image} alt="Doctor and Patient image" />

            </div>
        </div>
    )
}

export default Contact;