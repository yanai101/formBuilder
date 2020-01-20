# Form Builder App 
This app build with react for the client and for the backenfd with node+express and mongoDB

### Requirement
you can run this app in two different ways-

 - First way -  you need docker install.
 - For the second way you  need MongoDB to install and nodeJS as well

### the Doker Way
Simplay just run in the root folder this command

    docker-compose up 
the apliction will run at  "[localhost:8081](localhost:8081)"


### the nodeJS way 
make sure that mondoDB is up and running.
in the server folder ('form-builder-server') - run 

    npm install 
    npm start
 the server (Express) will serve the app as well - at '[localhost:8081](localhot:8081)' -
 no need for anther server to serve the client app :)
 