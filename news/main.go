package news

import (
	"io/ioutil"
	"net/http"
)

type apiResp struct {
	Items []Story
}

type Story struct {
	Title        string `json:"title"`
	Url          string `json:"url"`
	CommentCount int32
	PostedAgo    string
	Points       int32
}

func YCombinator() string {
	resp, _ := http.Get("http://api.ihackernews.com/page")
	defer resp.Body.Close()
	bytes, _ := ioutil.ReadAll(resp.Body)
	return string(bytes)
}
