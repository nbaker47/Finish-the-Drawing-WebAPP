package domainObject

import "github.com/google/uuid"

// Domain Object
type Drawing struct {
	ID          uint   `gorm:"primaryKey" json:"-"`
	UUID        string `gorm:"unique;not null" json:"id"`
	UserID      uint
	User        User   `gorm:"foreignKey:UserID" json:"user"`
	DailyID     uint   `gorm:"not null"`
	Daily       Daily  `gorm:"foreignKey:DailyID" json:"daily"`
	Image       string `gorm:"not null" json:"-"`
	Description string `gorm:"not null" json:"description"`
	Likes       int    `json:"likes"`
	Dislikes    int    `json:"dislikes"`
	LikedBy     []User `gorm:"many2many:drawings_likes;" json:"liked_by"`
	DislikedBy  []User `gorm:"many2many:drawings_dislikes;" json:"disliked_by"`
}

// INCOMING

// Incoming request required fields
type DrawingRequest struct {
	Image       string `json:"image" binding:"required"`
	User        string `json:"user"`
	Description string `json:"description" binding:"required"`
	Daily       string `json:"daily" binding:"required"`
}

// Convert incoming request to domain object
func ConvertToDrawing(drawingReq *DrawingRequest, user User, daily Daily) Drawing {
	return Drawing{
		UUID:        uuid.New().String(),
		UserID:      user.ID,
		User:        user,
		DailyID:     daily.ID,
		Daily:       daily,
		Image:       drawingReq.Image,
		Description: drawingReq.Description,
		Likes:       0,
		Dislikes:    0,
	}
}
