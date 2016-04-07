# Validation middleware example, with Redis Caching

Hello Svc uses a middleware function which validates user exists in auth service before continuing to provide functionality

## Run 

Assumes local availability of `mongod`, `nodemon`, `redis-server` (use `npm install -g`)

```
mongod --dbpath ~/data
cd auth
nodemon server.js
redis-server
mocha populate/registerUser.js
# Now there is one user (id=44)
cd hello
nodemon server.js
curl http://localhost:3001/api/hello/44 # => Ada says hello
curl http://localhost:3001/api/hello/33 # => No user 33
```

## Redis cache

Auth Svc uses an artificially slow call to mongo to retrieve a user.  Subsequent calls for the same user are cached in the redisStore.
