window.addEventListener("keyup", function (event) {
    let api;
    const API_KEY = config.apiKey;

    if (event.keyCode === 13) {
        event.preventDefault();
        api = `http://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=${API_KEY}`;

        fetch(api)
            .then(response => response.json())
            .then(data => {
                let messageElement = document.getElementsByClassName("temperature-description");
                let temperatureElement = document.getElementsByClassName("degree");
                let imageElement = document.getElementsByClassName("image-icon");

                if (data.cod !== 200) {
                    if (!temperatureElement) {
                        return;
                    }
                    temperatureElement[0].innerHTML = '- -';

                    if (!messageElement) {
                        return;
                    }
                    messageElement[0].innerHTML = capitalizeFirstLetter(data.message);

                    if (!imageElement) {
                        return;
                    }
                    imageElement[0].src = "sad.png";
                } else {
                    if (!temperatureElement) {
                        return;
                    }
                    temperatureElement[0].innerHTML = Math.round((data.main.temp - 273.15) * 10) / 10;
                    
                    if (!messageElement) {
                        return;
                    }
                    messageElement[0].innerHTML = `It is ${data.weather[0].description} in ${capitalizeFirstLetter(event.target.value)}`;

                    if (!imageElement) {
                        return;
                    }
                    imageElement[0].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                }

                event.target.value = '';
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
