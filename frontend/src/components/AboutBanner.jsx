import React from "react";
import { assets } from "../assets/assets";

const AboutBanner = () =>{
    return(
        <div className="flex lg:flex-row gap-5 justify-center items-center mx-[-3%] bg-white bg-opacity-50 p-4 py-7">
                {/* for the text content  */}
                <div className="lg:w-[55%]">
                    <p className="text-[17px]">
                    Welcome to MediConnect, your go-to platform for effortless doctor appointment booking. We understand that finding the right healthcare provider at the right time can be a challenge, which is why our app is designed to simplify the process. With just a few clicks, you can browse through a wide range of trusted doctors, check availability, and book appointments at your convenience. Our app also offers secure and easy payment options to make your healthcare experience as smooth as possible. In the near future, we plan to integrate AI technology to provide personalized doctor recommendations based on your unique health needs and preferences, further enhancing your ability to find the best care for you. Whether you need a quick consultation or ongoing care, MediConnect is here to make healthcare more accessible and efficient.
                    </p>
                </div>
                    
                {/* for the image  */}
                <div className="lg:w-[45%]">
                    <img src={assets.DoctorsGroup2} alt="Group of Doctors" />
                </div>

        </div>
   );
}


export default AboutBanner;