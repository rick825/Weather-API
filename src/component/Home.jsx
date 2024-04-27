import  { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../css/Home.css';
import { get, del, refresh } from '../store/actions';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [cityName, setCity] = useState('');
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.city.cities);

  const date = new Date();
 
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
  
  // Format the time component
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  // Combine the formatted date and time
  const formattedDateTime = `${formattedDate}, ${formattedTime}`;
  
  console.log(formattedDateTime);

  //Handle Add City
  const handleAddCity = async (city) => {
    console.log('Running 1');
    const weatherData = await fetchWeatherData(city);
    console.log('Running 2');
    toast.success(`Weather is Fetched for ${city}`);
    console.log(weatherData);
    if (!weatherData) return;
    const uuid = uuidv4();
    const newCity = {
      id: uuid,
      name: city,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
    };
    console.log(newCity.id);
    console.log(newCity);
    dispatch(get(newCity));
    setCity('');
  };

  //Handle Delete
  const handleDelete = (city) => {
    dispatch(del(city.id));
    toast.success(`${city.name} is Deleted`);
  };

  //Handle Refresh
  const handleRefresh = async (city) => {
    const weatherData = await fetchWeatherData(city.name);
    if (!weatherData) return;
    const refreshedCity = {
      id: city.id,
      name: city.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
    };
    console.log(refreshedCity);
    dispatch(refresh(refreshedCity));
    // alert(`Weather for ${city.name} Refreshed`);
    toast.success(`Weather for ${city.name} Refreshed`);
  };

  //Weather fetch
  const fetchWeatherData = async (cityName) => {
    try {
      console.log('Running Server');
      const apiKey = 'e24b2d35b7c008f51164710e62db7815';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      console.log('Server Completed');
      const data = await response.json();
      console.log('Response Collected:', data);
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <>
      <div className="home weather">
        <div className="weatherHead">
          <h2>Check Weather Of Your City</h2>
        </div>
        <div className="weatherMain">
          <div className="weatherCity">
            {cities.map((cityItem) => (
              <div className="weatherText" key={cityItem.id}>
                <div className="weatherTextTop">
                  <div className="weatherTextLeft">
                    <p>{formattedDateTime}</p>
                    <h2>{cityItem.name}</h2>
                  </div>
                  <div className="weatherTextRight">
                    <p style={{ textTransform: 'capitalize' }}>
                      {cityItem.description}
                    </p>
                  </div>
                </div>
                <div className="weatherDegrees">
                  <span></span>
                  <h3>{cityItem.temperature}°C</h3>
                </div>
                <div className="weatherButton">
                  <button onClick={() => handleRefresh(cityItem)}>
                    Refresh
                  </button>
                  <button onClick={() => handleDelete(cityItem)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter Your City"
            onKeyDown={(e) =>
              e.key === 'Enter' && handleAddCity(e.target.value)
            }
          />
        </div>
      </div>
    </>
  );
};

export default Home;
