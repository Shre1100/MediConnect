import React from "react";
import AboutBanner from "../components/AboutBanner";
import HowItWorks from "../components/HowItWorks";
import KeyFeatures from "../components/KeyFeatures";

const About = () =>{
    return (
        <div className="text-center mt-5">
            <h1 className="font-bold md:font-semibold xl:text-3xl lg:text-xl underline md:text-2xl md:text-md my-5 lg:my-10">ABOUT MEDICONNECT</h1>
            <AboutBanner/>
            <HowItWorks/>
            <KeyFeatures/>
        </div>
    )
}

export default About;