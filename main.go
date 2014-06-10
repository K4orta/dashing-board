package main

import (
	"fmt"
	"github.com/go-martini/martini"
	"github.com/k4orta/dashing-board/lunch"
	"github.com/k4orta/dashing-board/news"
	"github.com/k4orta/dashing-board/transit"
	"github.com/k4orta/dashing-board/weather"
	"net/http"
	"strconv"
)

func main() {
	m := martini.Classic()

	m.Get("/", func() string {
		return "Hello World"
	})

	m.Get("/weather", func(res http.ResponseWriter, req *http.Request) {
		ret, err := weather.Forecast("37.779352", "-122.413247")
		setMaxAge(&res, 290)
		if err != nil {
			res.WriteHeader(500)
			res.Write([]byte("Error fetching weather"))
		}
		res.Write(ret)
	})

	m.Get("/transit/muni", func(res http.ResponseWriter, req *http.Request) {
		ret := transit.DeparturesByStopCode("16997", "15727")
		setMaxAge(&res, 50)
		res.Write(transit.Export(ret))
	})

	m.Get("/transit/bart", func(res http.ResponseWriter, req *http.Request) {
		ret := transit.DeparturesByStopCode("11", "12")
		setMaxAge(&res, 50)
		res.Write(transit.Export(ret))
	})

	m.Get("/lunch/:marketCode", func(params martini.Params) string {
		return lunch.GetTrucks(params["marketCode"])
	})

	m.Get("/news", func() string {
		return news.YCombinator()
	})

	m.Get("/systems/ping", func() string {
		return "pong"
	})

	m.Use(martini.Static("public"))
	fmt.Println("Started Dashboard Server")
	m.Run()
}

func setMaxAge(res *http.ResponseWriter, maxAge int) {
	(*res).Header().Set("Cache-Control", "public, max-age="+strconv.Itoa(maxAge))
}
