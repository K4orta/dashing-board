package main

import (
	"github.com/go-martini/martini"
	"github.com/k4orta/dashing-board/transit"
	"io/ioutil"
	"net/http"
	"os"
)

func main() {
	m := martini.Classic()
	weatherApiKey := os.Getenv("FORECAST_API_KEY")

	m.Get("/", func() string {
		return "Hello World"
	})

	m.Get("/weather", func() string {
		resp, _ := http.Get("https://api.forecast.io/forecast/" + weatherApiKey + "/37.7796643,-122.4136685")
		defer resp.Body.Close()
		content, _ := ioutil.ReadAll(resp.Body)
		return string(content)
	})

	m.Get("/transit/:stopCode", func(params martini.Params) string {
		ret := transit.DeparturesByStopCode(params["stopCode"])
		return transit.Export(*ret)
	})

	m.Use(martini.Static("public"))
	m.Run()
}
