package main

import (
	"fmt"
	"github.com/go-martini/martini"
	"github.com/k4orta/dashing-board/lunch"
	"github.com/k4orta/dashing-board/news"
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

	m.Get("/transit/muni", func(params martini.Params) string {
		ret := transit.DeparturesByStopCode("16997", "15727")
		// return string(ret)
		return transit.Export(ret)
	})

	m.Get("/transit/bart", func(params martini.Params) string {
		ret := transit.DeparturesByStopCode("11", "12")
		// return string(ret)
		return transit.Export(ret)
	})

	m.Get("/lunch/:marketCode", func(params martini.Params) string {
		return lunch.GetTrucks(params["marketCode"])
	})

	m.Get("/news", func() string {
		return news.YCombinator()
	})

	m.Use(martini.Static("public"))
	m.Run()
	fmt.Println("Started Dashboard Server")
}
