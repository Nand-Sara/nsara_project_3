const key = '&appid=d6d204d3f76b267d5495d5c439da9743&units=imperial';
const base_url = 'https://api.openweathermap.org/data/2.5/weather?';


/* Global Variables */
const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const country = document.getElementById('country');
const generate = document.getElementById('generate');
const dateEntry = document.getElementById('date');
const tempEntry = document.getElementById('temp');
const descriptionEntry = document.getElementById('description');
const feelsLikeEntry = document.getElementById('feelsLike');
const humidityEntry = document.getElementById('humidity');
const contentEntry = document.getElementById('content');
const locationEntry = document.getElementById('location');
const weatherData = {};

console.log(zipCode.value, country.value, feelings.value);
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;


const postData = async (url = '', data = {}) => {
    console.log(data);
    // post data
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const info = await response.json();
        console.log(info);
        return info;
    } catch (error) {
		alert('Something went wrong, please try after sometime');
    }
}

let flag = 0;

/* Check weather the input entry is valid or not */
const chkValidity = () => {
	const invalid_zip = zipCode.value == '' || isNaN(Number(zipCode.value));
	const invalid_country = country.value == '';
	const invalid_feelings = feelings.value == '';
	
/* Case 1: When all three input fields have an invalid entry */	
	if(invalid_zip && invalid_country && invalid_feelings){
		alert('Please enter a valid zipcode/postal number, select a country from the list and express how you feel today');
		flag = 3;
	}
	
/* Case 2: When zipcode and country input fields have no (or) invalid entry */
	else if(invalid_zip && invalid_country){
		alert('Please enter a valid zipcode/postal number and select a country from the list');
		flag = 2;
	}

/* Case 3: When zipcode and feelings input fields have no (or) invalid entry */	
	else if(invalid_zip && invalid_feelings){
		alert('Please enter a valid zipcode/postal number and express how you feel today');
		flag = 2;
	}

/* Case 4: When country and feelings input fields have no (or) invalid entry */	
	else if(invalid_country && invalid_feelings){
		alert('Please select a country from the list and express how you feel today');
		flag = 2;
	}


/* Case 5: When zipcode input field has an invalid entry */	
	else if(invalid_zip){
		alert('Please enter a valid zipcode/postal number');
		flag = 1;
	}


/* Case 6: When country input field has no entry */	
	else if(invalid_country){
		alert('Please select a coutry from the list');
		flag = 1;
	}
	
/* Case 7: When feelings input field has no entry */	
	else if(invalid_feelings){
		alert('Please express how you feel today');
		flag = 1;
	}

/* Case 8: When all the entries are valid, set the flag to 0 */	
	else{
		flag = 0;
	}
};
	
/* Fetching data from OpenWeatherMap API */
const fetchData = async (url = '', data = {}) => {

    /* implementation of validation checks */
    chkValidity();

    /* All entries are valid */
    if (flag == 0) {
       const zip_code = `zip=${zipCode.value},`;
       const country_code = `${(country.value).toLowerCase()}`;
        const response = await fetch(base_url+zip_code+country_code+key);

        try {
            const info = await response.json();
            console.log(info);

             /* Gather input data under weatherData list */
            weatherData.zipCode = zipCode.value;
            weatherData.country = country.value;
            weatherData.feelings = feelings.value;
            weatherData.temperature = `${Math.floor(info.main.temp)} °F`;
			weatherData.feelsLike = `Feels like: ${Math.floor(info.main.feels_like)} °F`;
			weatherData.humidity = `Humidity: ${info.main.humidity}%`;
			weatherData.description = `${info.weather[0].description}`;
			weatherData.name = `${info.name}`;
			weatherData.ctry = `${info.sys.country}`;
            weatherData.date = newDate;

            console.log(weatherData);
            /* Post Data to Server */
            postData('/projectData', weatherData).then(updateUI('/projectData'))

            return info;

        } catch (error) {
			alert('Something went wrong, please try again after sometime');
        }
    }
}

const updateUI = async(url = '', data = {}) => {
    const response = await fetch(url);
    try {
        const info = await response.json();
        dateEntry.innerHTML = info.date;
        tempEntry.innerHTML =  info.temperature;
		descriptionEntry.innerHTML = info.description;
		locationEntry.innerHTML = `${info.name}, ${info.ctry}`;
		feelsLikeEntry.innerHTML = info.feelsLike;
		humidityEntry.innerHTML = info.humidity;
        contentEntry.innerHTML = `<p>Zip:  ${info.zipCode}<br> <p>Country: ${info.country}<br> <p>Feeling:  ${info.feelings}</p>`
        console.log('UI', info);

    } catch (error) {
		alert('Something went wrong, please try again after sometime');
    }

}

/* Fetch and display Weather data from OpenWeatherMap */
generate.addEventListener('click', fetchData);