package transit

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"
)

// The following types are used to parse and normalize transit queries
type Query struct {
	XMLName    xml.Name `xml:"RTT" json:"-"`
	AgencyList []route  `xml:"AgencyList>Agency>RouteList>Route" json:"agencyList"`
}

type Agency struct {
	Name   string  `xml:"Name,attr" json:"name"`
	Mode   string  `xml:"Mode,attr" json:"mode"`
	Routes []route `xml:"RouteList>Route" json:"routes"`
}

type route struct {
	Name       string      `xml:"Name,attr" json:"name"`
	Code       string      `xml:"Code,attr" json:"code"`
	Directions []direction `xml:"RouteDirectionList>RouteDirection" json:"directions,omitempty"`
	// For BART stops
	Departures []int16 `xml:"StopList>Stop>DepartureTimeList>DepartureTime" json:"departures,omitempty"`
}

type direction struct {
	Name       string  `xml:"Name,attr"`
	Code       string  `xml:"Code,attr"`
	Departures []int16 `xml:"StopList>Stop>DepartureTimeList>DepartureTime" json:"departures"`
}

// The following types are normalized and returned to the user
type RouteDirection struct {
	Name   string             `json:"name"`
	Routes []*NormalizedRoute `json:"routes"`
}

type NormalizedRoute struct {
	Name       string  `json:"name"`
	Code       string  `json:"code"`
	Departures []int16 `json:"departures,omitempty"`
}

func normalizeRouteDirection(routes *[]route) RouteDirection {
	dir := RouteDirection{}
	for _, route := range *routes {
		// BART does not have a Directions object, so use that to figure out if this is a MUNI stop or not.
		if route.Directions != nil {
			// Normalize to Muni
			dir.Name = route.Directions[0].Code
			dir.Routes = append(dir.Routes, &NormalizedRoute{
				route.Name,
				route.Code,
				route.Directions[0].Departures})
		} else {
			// Nomralize to BART
			dir.Name = route.Name
			dir.Routes = append(dir.Routes, &NormalizedRoute{
				route.Name,
				route.Code,
				route.Departures})
		}
	}

	// Normalize BART direction names
	if dir.Name == "SF Airport then Millbrae" {
		dir.Name = "SF Airport"
	} else if dir.Name == "Richmond" {
		dir.Name = "East Bay"
	}

	return dir
}

var apiKey string = os.Getenv("TRANSIT_API_KEY")
var apiUrl string = "http://services.my511.org/Transit2.0/GetNextDeparturesByStopCode.aspx?token=" + apiKey + "&stopcode="

func DeparturesByStopCode(codes ...string) []*RouteDirection {
	responses := make(chan Query, len(codes))
	routeList := []*RouteDirection{}

	for _, code := range codes {
		go func(code string) {
			responses <- requestStopCode(code)
		}(code)
	}

	for {
		select {
		case resp := <-responses:
			nr := normalizeRouteDirection(&resp.AgencyList)
			routeList = append(routeList, &nr)
			if len(routeList) == len(codes) {
				return routeList
			}
		case <-time.After(7 * time.Second):
			fmt.Println("Transit request timed out")
			return routeList
		}
	}

	return routeList
}

func requestStopCode(code string) Query {
	resp, err := http.Get(apiUrl + code)
	defer resp.Body.Close()
	if err != nil {
		fmt.Println("Can't Reach Transit API")
	}
	b, _ := ioutil.ReadAll(resp.Body)
	var al Query
	xml.Unmarshal(b, &al)
	return al
}

func Export(q []*RouteDirection) string {
	out, _ := json.Marshal(q)
	return string(out)
}
