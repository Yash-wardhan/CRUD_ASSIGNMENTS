# MERN Stack User Management Application

## Overview
This project is a web application developed using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a platform for users to register, log in, manage their profiles, and change their passwords. The application is designed with modern UI principles and user experience enhancements.

## Features

### User Authentication and Authorization
- **Registration**: Users can create accounts by providing their name, email, and password. Input validation ensures all required fields are completed.
- **Login**: Users log in with their email and password. Successful login stores an authentication token in local storage for future requests.

### Profile Management
- **Update Profile**: Users can modify their profile information, including their name and email, through a modal dialog.
- **Change Password**: Users can update their password by providing their current password and a new password, with checks to ensure the new passwords match.
- **Delete Account**: Users can remove their account, which deletes their data and logs them out.

### Dashboard Interface
- **Responsive Dashboard**: Displays user information and offers options to update the profile, change the password, and delete the account.
- **Navbar**: A top navigation bar includes links to update the profile and logout.
- **Modal Dialogs**: Utilizes modals for profile updates and password changes, providing a user-friendly experience with feedback.

### Styling and UX
- **TailwindCSS**: Employed for styling, ensuring a modern, responsive design.
- **Animations**: Smooth transitions and animations enhance user interactions and overall experience.
- **Background**: Features a background image with a gradient overlay for a visually appealing interface.

### Notifications
- **Toast Messages**: Provides feedback via toast notifications for successful actions or errors, improving usability.

## Screenshots

### Login
![Login](https://github.com/user-attachments/assets/235c43fe-f957-4b92-82b6-2291c253c71f)

### Register
![Register](https://github.com/user-attachments/assets/e7013677-29bc-4447-92c9-ffe234eb5b96)

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/c582cb15-3510-4433-b489-75c1554119c4)
![Dashboard](https://github.com/user-attachments/assets/e4462c33-e0be-44aa-bc34-0a02cf229b9d)
![Dashboard](https://github.com/user-attachments/assets/06a17938-7ec8-4210-9ee5-2a8920544e65)
![Dashboard](https://github.com/user-attachments/assets/3dc74dd4-c1c5-49ab-818c-b0f336becab8)
![Dashboard](https://github.com/user-attachments/assets/c547e5e3-7b88-42ff-999e-2f11db9802b9)
![Dashboard](https://github.com/user-attachments/assets/3f32eec9-5ed6-4e7a-93d2-3214b342c46a)

## Technical Stack
- **Frontend**: React with React Hook Form for form handling, styled with TailwindCSS.
- **Backend**: Node.js with Express.js for API endpoints.
- **Database**: MongoDB for user data storage.
- **Authentication**: JSON Web Tokens (JWT) for secure user sessions.


