import React from "react";
import HomeBanner from "../components/HomeBanner";
import Speciality from "../components/Speciality";
import BannerHelp from "../components/BannerHelp2";
import CreateAccount from "../components/CreateAccount";
import Footer from "../components/Footer";

const Home = () =>{
    return(
        <div>
            <HomeBanner/>
            <Speciality/>
            <BannerHelp/>
            <CreateAccount/>
            <Footer/>
        </div>
    );
}

export default Home;