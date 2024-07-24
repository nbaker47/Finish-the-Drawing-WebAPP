package domainObject

import "github.com/google/uuid"

// Domain Object
type Drawing struct {
	ID          uint   `gorm:"primaryKey"`
	UUID        string `gorm:"unique;not null"`
	UserID      uint
	User        User   `gorm:"foreignKey:UserID"`
	DailyID     uint   `gorm:"not null"`
	Daily       Daily  `gorm:"foreignKey:DailyID"`
	Image       string `gorm:"not null"`
	Description string `gorm:"not null"`
	Likes       int
	Dislikes    int
	LikedBy     []User `gorm:"many2many:drawings_likes;"`
	DislikedBy  []User `gorm:"many2many:drawings_dislikes;"`
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

// OUTGOING

// Drawing response
// DrawingResponse represents a drawing with safe users, without passwords
type DrawingResponse struct {
	UUID        string         `json:"id"`
	Image       string         `json:"image"`
	User        UserResponse   `json:"user"`
	Description string         `json:"description"`
	Daily       Daily          `json:"daily"`
	Likes       int            `json:"likes"`
	Dislikes    int            `json:"dislikes"`
	LikedBy     []UserResponse `json:"liked_by"`
	DislikedBy  []UserResponse `json:"disliked_by"`
}

// Convert domain object to response
func ConvertToDrawingResponse(drawing Drawing) DrawingResponse {
	var drawingResponse DrawingResponse

	drawingResponse.UUID = drawing.UUID
	// TODO: convert image to b64
	drawingResponse.Image = drawing.Image
	drawingResponse.Description = drawing.Description
	drawingResponse.Daily = drawing.Daily
	drawingResponse.Likes = drawing.Likes
	drawingResponse.Dislikes = drawing.Dislikes

	for _, user := range drawing.LikedBy {
		drawingResponse.LikedBy = append(drawingResponse.LikedBy, ConvertToUserResponse(user))
	}

	for _, user := range drawing.DislikedBy {
		drawingResponse.DislikedBy = append(drawingResponse.DislikedBy, ConvertToUserResponse(user))
	}

	drawingResponse.User = ConvertToUserResponse(drawing.User)

	return drawingResponse
}
