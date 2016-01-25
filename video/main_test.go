package video

import "testing"

func TestVideoParse(t *testing.T) {
	testString := `http://www.youtube.com/attribution_link?a=oehqRwd27Ok&u=/watch%3Fv%3Dlse2Lix6j3k%26feature%3Dem-share_video_user`
	resultID := "lse2Lix6j3k"
	if val := parseVideoString(testString); val != resultID {
		t.Error("Parsing error", val)
	}
}
