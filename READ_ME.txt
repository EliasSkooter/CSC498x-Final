how to run project!!!!


for the backend:

- open terminal and navigate to the Backend folder directory.
- in the terminal, run ===> npm run develop
- you can see the entities and data on http://localhost:1337/admin/
- the login information is: 
   - email: eliashaddad735@gmail.com
   - password: Kpt4ha5@sRqK&%C

--------------------------------------------------------

for the frontend:

(you probably already know all of this, but just wanna be thourough)

you must test the app on a mobile device. I did not use an emulator, so not sure if it would work there or not.

- make sure you have developer mode and USB debugging enabled on your phone!!
- connect your phone to your laptop
- open the Frontend folder in vs code
- in the vs code terminal, run the command: =======> npx react-native run-android
- the app will get installed on your device. If the node server crashes, run the command ===> npm start
- please note that once the app is installed on your phone, you can just run the command ===> npm start to test the app later on.
- you may also choose to remotely test the app by opening developer menu (shake the phone) => settings => debugging server host => input your IP with port:8081

- PLEASE MAKE SURE TO CHANGE THE BACKEND IP! In order to do so, navigate to BackendIP.js in the project and change the IP address. (port should still be 1337)

-----------------------------------------------------------

Hope I didn't miss anything and hope you like it! ^^"