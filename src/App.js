import React from 'react';
import logo from './logo.svg';
import './App.css';

import Weather from './Weather';
import Info from './Info';
import Form from './Form';

const API_KEY = '7eadd1998df599f4b724719b9a9176e9';

class App extends React.Component {
    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        pressure: undefined,
        error: undefined,
    }
    
    getWeather = async (event) => {
        event.preventDefault();
        
        const city = event.target.elements.city.value;
        
        if ( city ) {
            const api_url = await 
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await api_url.json();
            let date = new Date();
            date.setTime(data.sys.sunset * 1000);
            let sunset_date = date.getHours() + ':' + date.getMinutes();
            date = new Date();
            date.setTime(data.sys.sunrise * 1000);
            let sunrise_date = date.getHours() + ':' + date.getMinutes();
            this.setState({
                city: data.name,
                temp: data.main.temp,
                country: data.sys.country,
                sunrise: sunrise_date,
                sunset: sunset_date,
                pressure: data.main.pressure,
            });
        }
    }
    
    render() {
        return (
            <div>
                <Info />
                <Form weatherMethod={ this.getWeather } />
                <Weather
                    temp={ this.state.temp }
                    city={ this.state.city }
                    country={ this.state.country }
                    sunrise={ this.state.sunrise }
                    sunset={ this.state.sunset }
                    pressure={ this.state.pressure }
                />
            </div>
        )
    }
}

export default App;
