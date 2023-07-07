# Planner App – Your Custom Widget (Bounty)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running locally

Before you can run the application locally, you need to install all packages first, run this on your terminal pointing at your root directory:

`$ npm install`

Then, you can run:

`$ npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

This application was also deployed using firebase, you can visit this page:
[My Planner App](https://bounty-planner-app-binong.web.app/)

## Write-Up

I decided to create a weather widget with a random quote generator. I think it really fits the existing planner app, with this additional widget the user can easily view the weather in his/her area. Also being able to read some motivational quotes will boost the user’s morale in working or studying his/her materials. Basically, the weather widget works by asking the user’s location access. When the app is allowed to access the user’s location it will automatically fetch the current weather in that specific location. Behind the background it is using the [weather api](https://www.weatherapi.com/), by providing the latitude and longitude in the api, it will fetch the weather data in that location. Also, as you can see there’s this little button in the upper right corner (just below the close button) that will change the temperature unit when it is clicked. By default temperature is shown in degree Celsius and when that button is clicked the unit will change to Fahrenheit and vice-versa. Also I added a quote generator just below the weather data component. Similar to the weather api I am using a third-party API called [api ninjas](https://api-ninjas.com/api/quotes) to fetch quotes. By default it will fetch 10 quotes that can be cycled through by using the arrow buttons. This is a limitation from the API NINJAS, but refreshing the page will fetch another batch of quotes. Additionally, I also updated the reminder and calendar widgets. From my point of view, it is better to combine these two. I implemented a feature where when a user clicks on a day in the calendar, there will be a prompt that will ask the user’s input to add a reminder on that day. For example, when a user clicks on 10th of July, a prompt will show and the user can enter a text. From this input, it will be rendered below the calendar component as a list. The list will contain all the user’s reminder input that has the title, the date of creation, a checkbox and a delete button. Clicking the checkbox will make the title have a strikethrough and clicking the delete button will remove the item in the list. Just a note in the codebase, I deleted the reminder widget and updated all the imports affected. The weather widget has a separate file similar to the other widgets and created a single file for the calendar and reminder widget.
