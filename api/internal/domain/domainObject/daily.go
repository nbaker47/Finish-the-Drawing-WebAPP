package domainObject

import (
	"time"

	"github.com/google/uuid"
)

// Domain Object
type Daily struct {
	ID   uint      `gorm:"primaryKey" json:"-"`
	UUID string    `gorm:"unique;not null" json:"id"`
	Date time.Time `gorm:"not null" json:"date"`
	Seed int       `gorm:"not null" json:"seed"`
	Word string    `gorm:"not null" json:"word"`
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
