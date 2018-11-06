# React Strava Weekly Graphs

This react app shows [my Strava](https://www.strava.com/athletes/3350904) activity data.

A custom Node backend connects to the Strava API and provides filtered access to my Strava data. A AWS Lambda function syncs the API and database every hour. We can then visualize the data on the frontend with React. So it's [React on the frontend and Node/ES6/Mongoose on the backend](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0).

## Developer Installation

1.  Clone or download this repo.
1.  `cd react-strava-weekly-graphs`
1.  `npm install && cd client && npm install && cd ..`
1.  `npm run dev` when you're ready to start working and `npm run deploy` when you're ready to go to production.
