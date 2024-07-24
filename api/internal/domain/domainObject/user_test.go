package domainObject

import (
	"encoding/json"
	"log"
	"testing"

	"github.com/go-playground/assert/v2"
)

func TestConvertToUser(t *testing.T) {
	userReq := &UserRequest{
		Username:       "test_username",
		Password:       "test_password",
		Email:          "test_email",
		Background:     "test_background",
		ProfilePicture: "test_profile_picture",
	}

	expectedUser := User{
		UUID:           "", // Use the UUID generated for actualUser
		Username:       userReq.Username,
		Password:       userReq.Password,
		Email:          userReq.Email,
		Background:     userReq.Background,
		ProfilePicture: userReq.ProfilePicture,
	}

	actualUser := ConvertToUser(userReq)

	// Update expectedUser with actual UUID
	expectedUser.UUID = actualUser.UUID

	// Test for expected user
	t.Log("Expected User: ", expectedUser)
	t.Log("Actual User: ", actualUser)

	// Test for safe serialization
	// Convert to JSON
	realJson, err := json.Marshal(actualUser)
	if err != nil {
		log.Fatalf("Error occurred during marshaling. Err: %v", err)
	}

	t.Log("Actual User JSON: ", string(realJson))

	// Update expected JSON string with actual UUID
	expected := `{"id":"` + expectedUser.UUID + `","username":"test_username","background":"test_background","profile_picture":"test_profile_picture"}`
	assert.Equal(t, expected, string(realJson))
}
