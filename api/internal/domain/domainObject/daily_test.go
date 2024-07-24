package domainObject

import (
	"encoding/json"
	"log"
	"testing"
	"time"

	"github.com/go-playground/assert/v2"
	"github.com/google/uuid"
)

// Test for CreateDaily basic functionality
func TestCreateDaily(t *testing.T) {
	date := time.Now()
	seed := 12345
	word := "test"

	daily := CreateDaily(date, seed, word)

	if daily.UUID == "" && len(daily.UUID) < 5 {
		t.Error("UUID should not be empty")
	}

	if daily.Date != date {
		t.Errorf("Expected date to be %v, but got %v", date, daily.Date)
	}

	if daily.Seed != seed {
		t.Errorf("Expected seed to be %v, but got %v", seed, daily.Seed)
	}

	if daily.Word != word {
		t.Errorf("Expected word to be %v, but got %v", word, daily.Word)
	}
}

// Test for valid UUID
func TestCreateDaily_UUID(t *testing.T) {
	date := time.Now()
	seed := 12345
	word := "test"

	daily := CreateDaily(date, seed, word)

	if _, err := uuid.Parse(daily.UUID); err != nil {
		t.Error("Failed to parse UUID")
	}
}

// Test for unique UUID generation
func TestCreateDaily_UniqueUUID(t *testing.T) {
	date := time.Now()
	seed := 12345
	word := "test"

	daily1 := CreateDaily(date, seed, word)
	daily2 := CreateDaily(date, seed, word)

	if daily1.UUID == daily2.UUID {
		t.Error("UUIDs should be unique")
	}
}

// Test for JSON serialization
// ID should not be exposed
func TestCreateDaily_JSON(t *testing.T) {
	// find todays date
	todaysDate := time.Now()
	year, month, day := todaysDate.Date()
	todaysDate = time.Date(year, month, day, 0, 0, 0, 0, todaysDate.Location())
	seed := 12345
	word := "test"

	daily := CreateDaily(todaysDate, seed, word)

	uuid := daily.UUID
	// Convert to JSON
	realJson, err := json.Marshal(daily)
	if err != nil {
		log.Fatalf("Error occurred during marshaling. Err: %v", err)
	}

	expected := `{"id":"` + uuid + `","date":"` + todaysDate.Format(
		"2006-01-02T15:04:05Z07:00",
	) + `","seed":12345,"word":"test"}`

	assert.Equal(t, expected, string(realJson))
}
