package domainObject

import (
	"encoding/json"
	"log"
	"testing"
	"time"

	"github.com/go-playground/assert/v2"
)

func TestConvertToDrawing(t *testing.T) {
	drawingReq := &DrawingRequest{
		Image:       "image",
		User:        "613e38c5-8e90-4926-93cd-f52661767fef",
		Description: "description",
		Daily:       "1111111-1111-1111-1111-111111",
	}
	user := User{
		ID:             1,
		UUID:           "613e38c5-8e90-4926-93cd-f52661767fef",
		Username:       "test_username",
		Password:       "test_password",
		Email:          "test_email",
		Background:     "test_background",
		ProfilePicture: "test_profile_picture",
	}
	daily := Daily{
		ID:   1,
		UUID: "1111111-1111-1111-1111-111111",
		Date: time.Now(),
		Seed: 12345,
		Word: "test_word",
	}
	expectedDrawing := Drawing{
		UUID:        "", // Use the UUID generated for actualDrawing
		UserID:      user.ID,
		User:        user,
		DailyID:     daily.ID,
		Daily:       daily,
		Image:       drawingReq.Image,
		Description: drawingReq.Description,
		Likes:       0,
		Dislikes:    0,
	}

	actualDrawing := ConvertToDrawing(drawingReq, user, daily)

	// Update expectedDrawing with actual UUID
	expectedDrawing.UUID = actualDrawing.UUID

	// Test for expected drawing
	t.Log("Expected Drawing: ", expectedDrawing)
	t.Log("Actual Drawing: ", actualDrawing)

	// Test for safe serialization
	// Convert to JSON
	realJson, err := json.Marshal(actualDrawing)
	if err != nil {
		log.Fatalf("Error occurred during marshaling. Err: %v", err)
	}

	t.Log("Actual Drawing JSON: ", string(realJson))

	// Update expected JSON string with actual UUID
	expected := `{"id":"` + expectedDrawing.UUID + `","UserID":1,"user":{"id":"613e38c5-8e90-4926-93cd-f52661767fef","username":"test_username","background":"test_background","profile_picture":"test_profile_picture"},"DailyID":1,"daily":{"id":"1111111-1111-1111-1111-111111","date":"` + daily.Date.Format("2006-01-02T15:04:05.999999999Z07:00") + `","seed":12345,"word":"test_word"},"description":"description","likes":0,"dislikes":0,"liked_by":null,"disliked_by":null}`
	assert.Equal(t, expected, string(realJson))
}
