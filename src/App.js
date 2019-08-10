import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather'

const API_KEY = 'c117c79223f634582cd813b812d3e14b';

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (city && country) {
      this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ''
    });
  } else {
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: 'Please enter city and country'
    })
  }
  }
  render() { // in the background turns the html into JS using babel
    return (
      <section>
        {/* only use one parent section to put all html in, does not work outside */}
       <section className='wrapper'>
         <section className='main'>
           <section className='container'>
             <section className='row'>
               <section className='col-xs-5 title-container'>
                 <Titles />
               </section>
               <section className='col-xs-7 form-container'>
                 <Form getWeather={this.getWeather}/>
                 <Weather 
                   temperature={this.state.temperature}
                   city={this.state.city}
                   country={this.state.country}
                   humidity={this.state.humidity}
                   description={this.state.description}
                   error={this.state.error}
                  />
               </section>
             </section>
           </section>
         </section>
       </section>

      </section>
    )
  }
}

export default App;
