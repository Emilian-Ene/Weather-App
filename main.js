const apiKey = '42424ae85a0fdf7474c833b13d000c5f';
const units = 'metric';
const btn = document.querySelector('#btn');
const cityName = document.querySelector('#city-name');
const city = 'London';

const getData = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        alert('No weather found.');
        throw new Error('No weather found.');
      }
      return response.json();
    })
    .then((data) => displayData(data));

  const displayData = function (data) {
    const { name } = data;
    const { main } = data;
    const temp = main.temp.toFixed(0);
    const { wind } = data;
    const { weather } = data;
    document.querySelector('.city').innerText = `Weather in ${name}`;
    document.querySelector('.temp').innerText = `${temp} °C`;
    document.querySelector(
      '.windSpeed'
    ).innerText = ` Wind speed: ${wind.speed} km/h`;
    document.querySelector(
      '.humidity'
    ).innerText = `Humidity: ${main.humidity}%`;
    document.querySelector('.description').innerText = `${weather[0].main}`;
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + weather[0].icon + '.png';
  };
};

btn.addEventListener('click', function () {
  getData(cityName.value);
  document.querySelector('#city-name').value = '';
});
const keyup = document.querySelector('#city-name');
keyup.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    getData(cityName.value);
    document.querySelector('#city-name').value = '';
  }
});

getData(city);
