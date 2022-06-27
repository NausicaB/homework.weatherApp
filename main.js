state = {
    list1: [],
    list2: [],
    search: {
        description: "",
        humidity: "",
        pressure: "",
        currentTemperature: "",
        minimum: "",
        maximum: "",
    },

    icons1: "",
    date: [],
    days: [],
    properties: [],
    content2: "",
    icons2: [],
    time: [],
    temp: [],
    descript: [],
    icons: [],

urlCurrentWeather: 
    "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=",
urlForecastWeather: 
    "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=",
urlWeatherIconPrefix: 
    "https://openweathermap.org/img/w/"
}

function drawWeather() {
    let maps = document.createElement('iframe');
    maps.width = '600';
    maps.height = '200';
    maps.style = 'border:0';
    maps.loading = 'lazy';
    maps.allowfullscreen = '';
    maps.referrerpolicy="no-referrer-when-downgrade";
    maps.src=`https://www.google.com/maps/embed/v1/place?key=AIzaSyB0IWhR6-nJ07NmC4bZEzGuK_xKDgYy_TE&q=${state.list1.name}`;
    const element = document.getElementById("embedMap");
    element.replaceChild(maps, element.childNodes[0]);

    let content = document.querySelector('.currWeather');
    let data = '';
    
    let icon = document.querySelector('.icons1');
    icon = state.icons1;
    let descr = document.querySelector('.descr');
    descr = state.list1.weather[0].description;
    let humidity = document.querySelector('.humid');
    humidity = state.list1.main.humidity;
    let pressure = document.querySelector('.press');
    pressure = state.list1.main.pressure;
    let currentTemp = document.querySelector('.currTemp');
    currentTemp = state.list1.main.temp;
    let minTemp = document.querySelector('.min');
    minTemp = state.list1.main.temp_min;
    let maxTemp = document.querySelector('.max')
    maxTemp = state.list1.main.temp_max;

    data = `
        <img src="${icon}" alt="">  
        <div> Descriere: ${descr} </div>
        <div> Umiditate: ${humidity} </div>
        <div> Presiune: ${pressure} </div>
        <div> Temperatura curenta: ${currentTemp} </div>
        <div> Minima zilei: ${minTemp} </div>
        <div> Maxima zilei: ${maxTemp} </div>
    `
content.innerHTML = data;
}

function drawForecast() {
    let content2 = [];
    let day = [];
    day[0] = document.querySelector('.day1');
    day[1] = document.querySelector('.day2');
    day[2] = document.querySelector('.day3');
    day[3] = document.querySelector('.day4');
    day[4] = document.querySelector('.day5');
    day[5] = document.querySelector('.day6');
    day[6] = document.querySelector('.day7');

    content2[0] = document.querySelector('.properties1')
    content2[1] = document.querySelector('.properties2')
    content2[2] = document.querySelector('.properties3')
    content2[3] = document.querySelector('.properties4')
    content2[4] = document.querySelector('.properties5')
    content2[5] = document.querySelector('.properties6')
    content2[6] = document.querySelector('.properties7')
    
    
    for (let i = 0; i < state.list2.list.length; i++) {
        state.date[i] = state.list2.list[i].dt_txt.substring(0,10);
    }

    // state.list2.list.length
    for (let i = 0; i < state.list2.list.length; i++) {
        state.icons[i] = document.querySelector('.icons2');
        state.icons[i] = state.icons2[i];
        
        state.time[i] = document.querySelector('.hour');
        state.time[i] = state.list2.list[i].dt_txt.substring(11,20);
        
        state.temp[i] = document.querySelector('.temp1');
        state.temp[i] = state.list2.list[i].main.temp;
        
        state.descript[i] = document.querySelector('.descr1');
        state.descript[i] = state.list2.list[i].weather[0].description;
    }    
    
    let dates = [];
    let result = {};
    for (let i = 0; i < state.list2.list.length; i++) {
        if (!result[state.date[i]]) {
            result[state.date[i]] = [];
        }
        result[state.date[i]][state.time[i]] = `
            <img src="${state.icons[i]}" alt="">
            <div> Ora: ${state.time[i]} </div>
            <div> Temperatura: ${state.temp[i]} </div>
            <div> Descriere: ${state.descript[i]} </div>
            `;
    }
    
    let i = 0;
    for (const currentDate in result) {
        console.log(currentDate);
        state.days[i] = `
        <div style="background-color: lightblue;"> Ziua: ${currentDate} </div> 
        `
        day[i].innerHTML = state.days[i]; 
        content2[i].innerHTML = Object.values(result[currentDate]).join('');
        // console.log(result[currentDate]);
        // console.log(Object.values(result[currentDate]));
        i++;
    }
}   


async function getData() {
    let country = document.getElementById("inputCountry").value;
    let urlWeather = state.urlCurrentWeather + country;
    let response = await fetch(urlWeather); 
    let list = await response.json();
    state.list1 = list;
    let iconUrl1 = state.urlWeatherIconPrefix + '/' + state.list1.weather[0].icon + '.png'
    let response2 = await fetch(iconUrl1); 
    state.icons1 = iconUrl1;
    console.log(list);
    drawWeather();
}

async function getForecast() {
    let country = document.getElementById("inputCountry").value;
    let urlForecast = state.urlForecastWeather + country;
    let response = await fetch(urlForecast);
    let list = await response.json();
    state.list2 = list;
    
    let iconUrl2 = [];

    for(i = 0; i < state.list2.list.length; i++) {
        iconUrl2[i] = state.urlWeatherIconPrefix + '/' + state.list2.list[i].weather[0].icon + '.png';
        iconUrl2.push();
    }
    let response2 = await fetch(iconUrl2);
    state.icons2 = iconUrl2;

    console.log(response);
    console.log(list);
    drawForecast();
}









