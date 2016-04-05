# Validation middleware example

Hello Svc uses a middleware function which validates user exists in auth service before continuing to provide functionality

## Run 

```
mongod --dbpath ~/data
cd auth
nodemon server.js
mocha populate/registerUser.js
# Now there is one user (id=44)
cd hello
nodemon server.js
curl http://localhost:3001/api/hello/44 # => Ada says hello
curl http://localhost:3001/api/hello/33 # => No user 33
```
