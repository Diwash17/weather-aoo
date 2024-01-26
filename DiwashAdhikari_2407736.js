/*
 Student Name = Diwash Adhikari
 Student ID = 2407736 
 */


// Asynchrous function to check weather for a given city
async function checkweather(city) {
    try {
        // openweathermap API key for accessing weather data
        const apiKey = "d50a28a0c1f21285fc6216026df6fb70";
        // fetch weather data from openweathermap API using API key ,provided city and unit
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        // Convert the response to JSON format
        const data = await response.json();
        console.log(data)
        document.querySelector(".loc").textContent = `${data.name},${data.sys.country}`
        document.querySelector(".Temp").textContent = `${data.main.temp} °C`;
        document.querySelector(".weath").textContent = (data.weather[0].description);
        document.querySelector("#mainimg").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.querySelector(".Press").textContent = `${data.main.pressure} hPa`
        document.querySelector(".WindSpeed").textContent = `${data.wind.speed} m/s`
        document.querySelector(".Humidity").textContent = `${data.main.humidity} %`
        //  function to display date and time
        const datantime = () => {
            // Extract timezone offset from the 'data' object
            let timestampOffset = data.timezone

            // Calculate the timestamp by adding the current timestamp and the offset
            const timestamp = Math.floor(Date.now() / 1000) + timestampOffset;
            const date = new Date(timestamp * 1000);
            // Format the date and time to a localized string with specific options
            const localDateTime = date.toLocaleString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'UTC'
            });
            // store formatted time in variable timedate
            const timendate = `${localDateTime}`;
            document.querySelector(".Time").textContent = `${timendate}`;
        }
        // function call to display the date and time
        datantime();



    } catch (error) {
        // Display an alert if there's an error fetching or processing the weather data
        alert(`Sorry some error occured: ${error}`)
    }

}
// Event listener for the button click, triggers the weather check for the city entered in the input field
document.querySelector("button").addEventListener('click', () => {
    let value = document.querySelector("input").value
    checkweather(value)
})
// Event listener for the "keydown" event, triggers the weather check when the Enter key is pressed
document.querySelector("input").addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        let enterSearch = document.querySelector("input").value
        checkweather(enterSearch)
    }
})

//leads weather of ongole when page is waether app is opened or refreshed.
window.onload = () => {
    checkweather('Ongole')
}



