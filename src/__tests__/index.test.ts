import WeatherSDK from '../index';

describe('WeatherSDK', () => {
  let instance: WeatherSDK;
  const mockApiKey = '1234567890';
  const mockLocation = 'New York,NY';
  const mockWeatherData = {
    main: {
      temp: 290.15,
      humidity: 80,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
      },
    ],
  };

  beforeEach(() => {
    instance = new WeatherSDK(mockApiKey);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockWeatherData),
      })) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have a constructor that sets the apiKey and baseUrl properties', () => {
    expect(instance.apiKey).toEqual(mockApiKey);
    expect(instance.baseUrl).toEqual(
      'https://api.openweathermap.org/data/2.5/weather',
    );
  });

  it('should have a getWeather method that makes an API call and returns the weather data', async () => {
    const weatherData = await instance.getWeather(mockLocation);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?q=${mockLocation}&appid=${mockApiKey}`,
    );
    expect(weatherData).toEqual(mockWeatherData);
  });

  it('should handle errors in the getWeather method', async () => {
    const mockError = new Error('API Error');
    const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    global.fetch = jest.fn().mockRejectedValueOnce(mockError);
    const weatherData = await instance.getWeather(mockLocation);
    expect(error).toHaveBeenCalledWith(mockError);
    expect(weatherData).toBeNull();
    error.mockReset();
  });
});
