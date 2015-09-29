let weatherIcons = {
	'partly-cloudy-day': 'day-cloudy',
	'partly-cloudy-night': 'night-cloudy',
	'clear-night': 'night-clear',
	'clear-day': 'day-sunny',
	'fog': 'fog',
	'rain': 'rain',
	'cloudy': 'cloudy',
	'wind': 'cloudy-gusts'
};

export default input => {
	if (weatherIcons[input]) {
		return weatherIcons[input];
	}
	return input;
}
