import React from "react";
import HomeBanner from "../components/HomeBanner";
import Speciality from "../components/Speciality";
import BannerHelp from "../components/BannerHelp2";
import CreateAccount from "../components/CreateAccount";

const Home = () =>{
    return(
        <div>
            <HomeBanner/>
            <Speciality/>
            <BannerHelp/>
            <CreateAccount/>
        </div>
    );
}

export default Home;