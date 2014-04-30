package transit

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

type Query struct {
	XMLName    xml.Name `xml:"RTT" json:"-"`
	AgencyList []Route  `xml:"AgencyList>Agency>RouteList>Route" json:"agencyList"`
}

type Agency struct {
	Name   string  `xml:"Name,attr" json:"name"`
	Mode   string  `xml:"Mode,attr" json:"mode"`
	Routes []Route `xml:"RouteList>Route" json:"routes"`
}

type Route struct {
	Name       string      `xml:"Name,attr" json:"name"`
	Code       string      `xml:"Code,attr" json:"code"`
	Directions []Direction `xml:"RouteDirectionList>RouteDirection" json:"directions,omitempty"`
	// For BART stops
	Departures []int16 `xml:"StopList>Stop>DepartureTimeList>DepartureTime" json:"departures,omitempty"`
}

type Direction struct {
	Name       string  `xml:"Name,attr"`
	Code       string  `xml:"Code,attr"`
	Departures []int16 `xml:"StopList>Stop>DepartureTimeList>DepartureTime" json:"departures"`
}

func DeparturesByStopCode(code string) *Query {
	apiKey := os.Getenv("TRANSIT_API_KEY")
	apiUrl := "http://services.my511.org/Transit2.0/GetNextDeparturesByStopCode.aspx?token=" + apiKey + "&stopcode="
	resp, err := http.Get(apiUrl + code)
	defer resp.Body.Close()
	if err != nil {
		fmt.Println("Can't Reach Transit API")
		return nil
	}
	b, _ := ioutil.ReadAll(resp.Body)
	var al Query
	xml.Unmarshal(b, &al)
	return &al
}

func Export(q Query) string {
	out, _ := json.Marshal(q.AgencyList)
	return string(out)
}
