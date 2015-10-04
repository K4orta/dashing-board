package video

import (
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os"
	"regexp"
	"strings"

	imap "github.com/mikkeloscar/goimap"
)

var currentVideo string

func GetHandler(res http.ResponseWriter, req *http.Request) {
	res.Write([]byte("ok"))
}

func PostHandler(res http.ResponseWriter, req *http.Request) {
	res.Write([]byte("ok"))
}

func CheckForVideo() {
	conn, err := net.Dial("tcp", "imap.gmail.com:993")
	if err != nil {
		log.Panic(err)
	}
	client, err := imap.NewClient(conn, "imap.gmail.com")
	if err != nil {
		log.Panic(err)
	}
	defer client.Close()

	err = client.Login(os.Getenv("DASHBOARD_EMAIL"), os.Getenv("DASHBOARD_EMAIL_PASSWORD"))
	if err != nil {
		log.Panic(err)
	}
	client.Select(imap.Inbox)
	ids, _ := client.Search("unseen")

	for _, id := range ids {
		client.StoreFlag(id, imap.Seen)

		msg, _ := client.GetMessage(id)

		// fmt.Println("From:", get1st(msg.Header.AddressList("From")))
		// from, _ := msg.Header.AddressList("To")
		// fmt.Println("From:", from[0].Name)
		// fmt.Println("Subject:", msg.Header["Subject"])
		// fmt.Println("Date:", get1st(msg.Header.Date()))
		body, _ := ioutil.ReadAll(msg.Body)
		r, _ := regexp.Compile("http://www\\.youtube\\.com/watch\\?v=(.*)&")
		match := r.FindString(string(body))
		match = strings.Replace(match, "http://www.youtube.com/watch?v=3D", "", 1)
		match = strings.Replace(match, "&", "", 1)
		currentVideo = match
	}
	client.Logout()
}

func get1st(a, b interface{}) interface{} {
	return a
}
