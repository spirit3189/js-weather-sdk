export default class WeatherSDK {
  apiKey: string;

  baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  }

  async getWeather(location: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}?q=${location}&appid=${this.apiKey}`,
      );
      const weather = await response.json();
      return weather;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
