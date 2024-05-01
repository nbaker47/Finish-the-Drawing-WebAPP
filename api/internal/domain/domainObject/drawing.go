package domainObject

import (
	"time"
)

type Drawing struct {
	ID          uint
	DatePosted  time.Time
	Image       string
	User        User
	Description string
	Word        string
	Likes       int
	Dislikes    int
	LikedBy     []User
	DislikedBy  []User
}
