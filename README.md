# backend
In the "db-models" folder there is test data for the necessary MongoDB collections.

(hint on how to apply test data to your database)\
`mongorestore ./db-models/readings.bson --uri mongodb://localhost:27017/dev --collection=readings`

In the "design" folder there is a screen design for which you need to think through a solution.

## Getting started

Install NPM packages\
`npm install`

Run project\
`npm run dev`

http://localhost:3000/api-doc/
