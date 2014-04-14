package main

import(
	"github.com/go-martini/martini"
	"net/http"
	"io/ioutil"
)

func main() {
	m := martini.Classic()

	m.Get("/", func() string {
		return "Hello World"
	})

	m.Get("/weather", func() string {
		resp, _ := http.Get("https://api.forecast.io/forecast/e47470c25722a8f5a4b6bf16ea1cfd74/37.7796643,-122.4136685")
		defer resp.Body.Close()
		content, _ := ioutil.ReadAll(resp.Body)
		return string(content)
	})

	m.Use(martini.Static("public"))
	m.Run()
}