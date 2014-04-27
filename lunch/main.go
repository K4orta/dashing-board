package lunch

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func GetTrucks(marketCode string) string {
	apiUrl := "http://offthegridsf.com/wp-admin/admin-ajax.php?action=otg_market&delta=0&market="
	resp, err := http.Get(apiUrl + marketCode)
	defer resp.Body.Close()
	if err != nil {
		fmt.Println("Can't Reach Off THe Grid API")
		return ""
	}
	b, _ := ioutil.ReadAll(resp.Body)
	return string(b)
}
