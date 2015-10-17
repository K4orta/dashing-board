package video

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"

	imap "github.com/mikkeloscar/goimap"
)

var currentVideo string
var lastSubmission time.Time

func GetHandler(res http.ResponseWriter, req *http.Request) {
	now := time.Now()
	if now.Sub(lastSubmission) > time.Hour {
		currentVideo = ""
	}

	out, _ := json.Marshal(map[string]string{
		"videoId":        currentVideo,
		"lastSubmission": lastSubmission.Format(time.RFC3339),
	})

	res.Write(out)
}

func PostHandler(res http.ResponseWriter, req *http.Request) {
	defer req.Body.Close()
	err := CheckForVideo()
	if err != nil {
		res.Write([]byte("bad"))
	}
	res.Write([]byte("ok"))
}

func CheckForVideo() error {
	conn, err := net.Dial("tcp", "imap.gmail.com:993")
	if err != nil {
		log.Panic(err)
	}
	client, err := imap.NewClient(conn, "imap.gmail.com")
	if err != nil {
		return err
	}
	defer client.Close()

	err = client.Login(os.Getenv("DASHBOARD_EMAIL"), os.Getenv("DASHBOARD_EMAIL_PASSWORD"))
	if err != nil {
		return err
	}
	client.Select(imap.Inbox)
	ids, _ := client.Search("unseen")
	defer client.Logout()

	for _, id := range ids {
		client.StoreFlag(id, imap.Seen)

		msg, _ := client.GetMessage(id)

		body, _ := ioutil.ReadAll(msg.Body)
		r, _ := regexp.Compile("http://www\\.youtube\\.com/watch\\?v=(.*)&")
		match := r.FindString(string(body))
		match = strings.Replace(match, "http://www.youtube.com/watch?v=3D", "", 1)
		match = strings.Replace(match, "&", "", 1)
		currentVideo = match
		lastSubmission = time.Now()
	}
	return nil
}

func get1st(a, b interface{}) interface{} {
	return a
}
