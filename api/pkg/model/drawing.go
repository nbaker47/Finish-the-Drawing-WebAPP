package model

import (
	"time"

	"gorm.io/gorm"
)

type Drawing struct {
	gorm.Model
	DatePosted  time.Time
	Image       string
	ID          uint
	User        User
	Description string
	Word        string
	Likes       int
	Dislikes    int
	LikedBy     []User `gorm:"many2many:user_likes;"`
	DislikedBy  []User `gorm:"many2many:user_dislikes;"`
}
