import React from 'react';
import {assets} from "../assets/assets";

const KeyFeatures = () => {

  const features = [{title : 'Book Appointments in Seconds',
    content: 'Easily find available slots and secure your appointment with just a few taps.'
    },
    {title:'Find the Right Specialist',
       content:'Search for doctors based on their specialty and availability.'
    },
    {title:'Doctor Availability in Real-Time',
        content:'See up-to-the-minute availability for faster booking.'
     },
    {title: 'Make Informed Decisions',
        content: 'View detailed doctor profiles, including qualifications, experience, and patient reviews.'
    }];
   

  return (
    <div className='bg-white pb-10 mx-[-3%] p-1'>
        <h2 className='text-xl xl:text-3xl font-semibold my-8'>Key Features and Benefits</h2>
        <div>
          {features.map((item,idx)=>{ return(
            <div className='hover:scale-100 hover:shadow-xl hover:translate-y-[-3px] transition-all ease-linear duration-150 hover:border hover:border-solid hover:border-black flex gap-2 items-center my-4 lg:px-16 justify-start' key={idx}>
                <img className='h-6 md:h-7 lg:h-10' src={assets.rightArrow} alt="Right arrow" />
                <div>
                    <p className='cursor-default font-bold text-start lg:text-xl md:text-lg lg:font-semibold'>{item.title}: <span className='text-start p-2 lg:text-lg font-normal'>{item.content}</span></p>
                </div>
            </div>
          )
          })}
        </div>
    </div>
  );
};

export default KeyFeatures;