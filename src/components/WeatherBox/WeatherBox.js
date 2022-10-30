import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import ErrorBox from '../ErrorBox/ErrorBox';
import Loader from '../Loader/Loader';
import {useCallback, useState } from 'react';

const WeatherBox = props => {
const [data, setData] = useState('');
const [pending, setPending] = useState(false);
const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {  // dzięki użyciu hooka useCallback, odświeżenie komponentu WeatherBox nie będzie bez potrzeby odświżało komponentu <PickCity> 
    console.log('PickCity city', city);

    setPending(true);
    setError(false);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c6987d79e2dd1eb2b4e3389157436e27&units=metric`)
      .then(res => {
        if(res.status === 200) {
          return (res.json()).then(data => {
            const weatherData = {
              city: data.name, 
              temp: data.main.temp, 
              icon: data.weather[0].icon, 
              description: data.weather[0].main
            }
            setPending(false);
            setData(weatherData);
            
            console.log('weatherData', weatherData);
          }) }
          else  {
            setError(true);
          };
      });

  },[]);


  return (
    <section>
      <PickCity action={handleCityChange} />
      { data && !pending && <WeatherSummary data={data} /> }
      { pending && <Loader /> }
      { error && <ErrorBox /> }
    </section>
  )
};

export default WeatherBox;