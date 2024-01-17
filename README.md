    Wanderlust is your passport to a vibrant community of global explorers, where you effortlessly share, discover, and connect through captivating travel stories that bring the world closer together
Embark on a journey with Wanderlust, a user-friendly Travel Blog Platform designed to make sharing and discovering travel stories a breeze. Wanderlust simplifies the process of documenting your adventures, connecting with fellow explorers, and finding inspiration for your next getaway.

                                                                                     (*UNDER CUNSTRUCTION)

Getting started*

#To download the dependencies for the backend server, run:

pipenv install
pipenv shell


#You can run your Flask API

python server/app.py

#Create a new terminal and then run these commands

cd client or where the front end is located

npm install --prefix client
           or
      npm install    

#To run the the front end server

npm start --prefix client
         or
      npm start       


#the package.json contains all the depencencies as well as a proxy 

name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:5000",
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.5",
    "bootstrap": "^5.3.2",
    "browserify-zlib": "^0.2.0",
    "cors": "^2.8.5",
    "react": "^18.2.0",
    "react-bootstrap": "^2.9.2",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.49.3",
    "react-router-dom": "^6.21.2",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },




Current state of the website*
able to succefully log in and sign up, the information for the user is stored in the backend.
using context outlet when the user is logged in it will conditionally render the signup and login and display the profile dropdown menu that contains "Create Blog" "My blogs" " and logout
When the user creates a blog they are able to navigate to my blogs and view,edit and delete 

  
