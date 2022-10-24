import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import {useCallback, useState } from 'react';

const WeatherBox = props => {
const [data, setData] = useState('');

  const handleCityChange = useCallback(city => {  // dzięki użyciu hooka useCallback, odświeżenie komponentu WeatherBox nie będzie bez potrzeby odświżało komponentu <PickCity> 
    console.log('PickCity city', city);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c6987d79e2dd1eb2b4e3389157436e27&units=metric`)
      .then(res => res.json())
      .then(data => {
        const weatherData = {
          city: data.name, 
          temp: data.main.temp, 
          icon: data.weather[0].icon, 
          description: data.weather[0].main
        };
        
        setData(weatherData);
        console.log('weatherData', weatherData);
      });

  });


  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary data={data} />
      <Loader />
    </section>
  )
};

export default WeatherBox;