package domainObject

import (
	"time"
)

type Drawing struct {
	DatePosted  time.Time
	Image       string
	ID          uint
	User        User
	Description string
	Word        string
	Likes       int
	Dislikes    int
	LikedBy     []User
	DislikedBy  []User
}
