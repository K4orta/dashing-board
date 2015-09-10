package lunch

import (
	"encoding/json"
	"github.com/PuerkitoBio/goquery"
	"log"
	"strconv"
	"strings"
)

type offTheGrid struct {
	Month   int      `json:"month"`
	Day     int      `json:"day"`
	Vendors []string `json:"vendors"`
}

func GetTrucks(marketCode string) ([]byte, error) {
	apiUrl := "http://offthegridsf.com/wp-admin/admin-ajax.php?action=otg_market&delta=0&market="
	doc, err := goquery.NewDocument(apiUrl + marketCode)
	if err != nil {
		log.Fatal(err)
		return []byte{}, err
	}

	days := []offTheGrid{}

	doc.Find(".otg-market-data-events-pagination").Each(func(i int, s *goquery.Selection) {
		date := strings.Split(strings.TrimSpace(s.Text()), ".")
		vendorsElement := doc.Find(".otg-market-data-vendors-names").Eq(i)
		vendors := []string{}
		vendorsElement.Find(".otg-markets-data-vendor-name").Each(func(j int, vendor *goquery.Selection) {
			vendorName := strings.TrimSpace(vendor.Text())
			vendorName = strings.Replace(vendorName, " (1)", "", -1)
			vendors = append(vendors, vendorName)
		})

		intMonth, err := strconv.Atoi(date[0])
		intDay, err := strconv.Atoi(date[1])

		if err == nil {
			days = append(days, offTheGrid{intMonth, intDay, vendors})
		} else {
			log.Fatal(err)
		}
	})

	out, err := json.Marshal(days)

	if err != nil {
		log.Fatal(err)
		return []byte{}, err
	}

	return out, nil
}
