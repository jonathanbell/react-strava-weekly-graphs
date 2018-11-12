# React Strava Weekly Graphs

This React app shows [my Strava](https://www.strava.com/athletes/3350904) activity data in a stacked bar chart format, by week, by activity & type/hours performed.

A custom Node backend connects to the Strava API and provides filtered access to my Strava data. An AWS Lambda function syncs the API and database every hour. We can then visualize the data on the frontend with React. So it's [React on the frontend and Node/ES6/Mongoose on the backend](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0). :smiley:

I mostly use this app for visualizing my own training data, but please feel free to fork this project and use it for your own purposes.

## Developer Installation

1.  Clone or download this repo.
1.  `cd react-strava-weekly-graphs`
1.  `cp .env.example .env`
1.  [Setup your MonogoDB with your Strava activities](https://github.com/jonathanbell/sync-strava-db) and add your connection string to `.env`
1.  `npm install && cd client && npm install && cd ..`
1.  `npm run dev` when you're ready to start working and `npm run deploy` or `git push heroku master` (if using Heroku) when you're ready to go to production.
