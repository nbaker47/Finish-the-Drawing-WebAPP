package domainObject

type Drawing struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	UserID      uint   `json:"user_id"`
	User        User   `gorm:"foreignKey:UserID" json:"user"`
	DailyID     uint   `json:"daily_id"`
	Daily       Daily  `gorm:"foreignKey:DailyID" json:"daily"`
	Image       string `gorm:"not null" json:"image" binding:"required"`
	Description string `gorm:"not null" json:"description"`
	Likes       int    `json:"likes"`
	Dislikes    int    `json:"dislikes"`
	LikedBy     []User `gorm:"many2many:drawings_likes;" json:"liked_by"`
	DislikedBy  []User `gorm:"many2many:drawings_dislikes;" json:"disliked_by"`
}

type DrawingRequest struct {
	Image       string `json:"image" binding:"required"`
	User        uint   `json:"user" binding:"required"`
	Description string `json:"description" binding:"required"`
	Daily       uint   `json:"daily" binding:"required"`
}

// DrawingResponse represents a drawing with safe users, without passwords
type DrawingResponse struct {
	ID          uint
	Image       string
	User        UserResponse
	Description string
	Daily       Daily
	Likes       int
	Dislikes    int
	LikedBy     []UserResponse
	DislikedBy  []UserResponse
}

func ConvertToDrawingResponse(drawing Drawing) DrawingResponse {
	var safeDrawing DrawingResponse
	safeDrawing.ID = drawing.ID
	safeDrawing.Image = drawing.Image
	safeDrawing.Description = drawing.Description
	safeDrawing.Daily = drawing.Daily
	safeDrawing.Likes = drawing.Likes
	safeDrawing.Dislikes = drawing.Dislikes

	for _, user := range drawing.LikedBy {
		safeDrawing.LikedBy = append(safeDrawing.LikedBy, ConvertToUserResponse(user))
	}

	for _, user := range drawing.DislikedBy {
		safeDrawing.DislikedBy = append(safeDrawing.DislikedBy, ConvertToUserResponse(user))
	}

	safeDrawing.User = ConvertToUserResponse(drawing.User)

	return safeDrawing
}
