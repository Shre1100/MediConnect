
# MediConnect - An Online Doctor Appointment Booking Web App

Well we all know nowadays to get an appointment from a doctor can be a really tideous task. So here is my small effort to make this process easier at both the ends i.e., For the patients and the doctors. MediConnect is a full stack web application which helps the users to book appointments with doctors by simply clicking some buttons. This project has three phases, the first one is for the user's side, the second for the doctor's side and the last one for the Admin's side.


## Tech Stack

**Client:** React.js , TailwindCSS

**Server:** Node.js , Express.js

**Database:** MongoDB

**Database:** JSON Web Token(JWT)

## 🔑Features of MediConnect

Following are the key features of this fullstack web application :

### HOME PAGE

- Simple and responsive UI
- Easy to navigate to different pages
- Browse by speciality Section

### DOCTORS PAGE

- Lists all doctors available on the database
- Filter functionality available for the user to search efficiently
- User-Friendly Layout

### ABOUT US PAGE

- Displays how the application works
- Points out the Key Features and Benefits of this application

### CONTACT US PAGE

- Currently a dummy page
- Gives the basic idea of how the page should look like

### USER PROFILE PAGE

- Displays user information and enables the user to update their details

### SCHEDULED APPOINTMENTS PAGE

- Displays the list of appointments booked by the user
- Shows the Upcoming and Completed Appointments on different sections
- Gives user the option to pay online or cancel the upcoming appointment

## Some ScreenShots

### Admin Panel

![Admin Dashboard Screenshot](./images/AdminDashboard.png "Admin Dashboard Page")

![Admin All Appointments Screenshot](./images/AdminAllAppointments.png "Admin All Appointments Page")

![Doctor Requests Screenshot](./images/AdminDoctorReques.png "Doctor requests Page")


### User Side

![Home Page Screenshot](./images/HomePageImg.png "Home Page")

![All Doctors Page Screenshot](./images/DoctorsPage.png " All Doctors Page")

![All Appointments Page Screenshot](./images/AllAppointments.png "All Appointments Page")

![About Us Screenshot](./images/AboutUs.png "About Us Page")

![Doctor Screenshot](./images/SelectDoctors.png "Doctor Page")


## 🌐 Project Setup

To set up and run this project locally:

1. **Clone this Repository**
    ```bash
   git clone https://github.com/Shre1100/MediConnect.git
   cd  MediConnect
   ```
2. **Install all the dependencies**
    - go to each frontend, admin, backend folder and run npm install

3. **Create Environment Variables**
    -create .env file in backend folder and add the following:
    ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
     ```

     - create .env file in admin and frontend folder and declare the URL for backend

4. **Run the application**
    - For Backend , go to backend folder and run the following command : 
        node index.js
    
    - For Frontend and Admin , go to frontend folder and run the following command  then do the same for admin folder:
        npm run dev 


## 🌟 Acknowledgements

- Thanks to the developers and contributors of MongoDB, Express.js, React.js and Node.js for their fantastic tools and libraries.

---
