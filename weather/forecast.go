package weather

import (
	"io/ioutil"
	"net/http"
	"os"
)

var weatherApiUrl string = "https://api.forecast.io/forecast"
var weatherApiKey string = os.Getenv("FORECAST_API_KEY")

func Forecast(lat string, lng string) ([]byte, error) {
	resp, err := http.Get(weatherApiUrl + "/" + weatherApiKey + "/" + lat + "," + lng)
	if err != nil {
		return []byte{}, err
	}
	defer resp.Body.Close()

	content, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return []byte{}, err
	}

	return content, nil
}
