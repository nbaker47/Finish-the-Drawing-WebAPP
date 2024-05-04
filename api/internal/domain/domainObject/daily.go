package domainObject

import "time"

type Daily struct {
	ID   uint      `gorm:"primaryKey" json:"id"`
	Date time.Time `gorm:"not null" json:"date" binding:"required"`
	Seed int       `json:"seed" binding:"required"`
	Word string    `json:"word"`
}
