package domainObject

type Drawing struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Image       string `json:"image" binding:"required"`
	User        uint   `gorm:"foreignKey:UserID" json:"user"`
	Description string `json:"description"`
	Word        string `json:"word"`
	Likes       int    `json:"likes"`
	Dislikes    int    `json:"dislikes"`
	LikedBy     []User `gorm:"many2many:drawings_likes;" json:"liked_by"`
	DislikedBy  []User `gorm:"many2many:drawings_dislikes;" json:"disliked_by"`
}

// DrawingResponse represents a drawing with safe users, without passwords
type DrawingResponse struct {
	ID          uint
	Image       string
	User        uint
	Description string
	Word        string
	Likes       int
	Dislikes    int
	LikedBy     []UserResponse
	DislikedBy  []UserResponse
}

func ConvertDrawingResponse(drawing Drawing) DrawingResponse {
	var safeDrawing DrawingResponse
	safeDrawing.ID = drawing.ID
	safeDrawing.Image = drawing.Image
	safeDrawing.User = drawing.User
	safeDrawing.Description = drawing.Description
	safeDrawing.Word = drawing.Word
	safeDrawing.Likes = drawing.Likes
	safeDrawing.Dislikes = drawing.Dislikes

	for _, user := range drawing.LikedBy {
		safeDrawing.LikedBy = append(safeDrawing.LikedBy, UserResponse{
			ID:             user.ID,
			Username:       user.Username,
			Email:          user.Email,
			Background:     user.Background,
			ProfilePicture: user.ProfilePicture,
		})
	}

	for _, user := range drawing.DislikedBy {
		safeDrawing.DislikedBy = append(safeDrawing.DislikedBy, UserResponse{
			ID:             user.ID,
			Username:       user.Username,
			Email:          user.Email,
			Background:     user.Background,
			ProfilePicture: user.ProfilePicture,
		})
	}

	return safeDrawing
}
