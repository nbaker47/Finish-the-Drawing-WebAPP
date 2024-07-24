package domainObject

import (
	"time"

	"github.com/google/uuid"
)

// Domain Object
type Daily struct {
	ID   uint      `gorm:"primaryKey"`
	UUID string    `gorm:"unique;not null"`
	Date time.Time `gorm:"not null"`
	Seed int       `gorm:"not null"`
	Word string    `gorm:"not null"`
}

// INCOMING

func CreateDaily(date time.Time, seed int, word string) Daily {
	return Daily{
		UUID: uuid.New().String(),
		Date: date,
		Seed: seed,
		Word: word,
	}
}

// OUTGOING

type DailyResponse struct {
	UUID string    `json:"id"`
	Date time.Time `json:"date"`
	Seed int       `json:"seed"`
	Word string    `json:"word"`
}

// Convert domain object to response
func ConvertToDailyResponse(daily Daily) DailyResponse {
	return DailyResponse{
		UUID: daily.UUID,
		Date: daily.Date,
		Seed: daily.Seed,
		Word: daily.Word,
	}
}
