package domainObject

import "github.com/google/uuid"

// Domain Object
type User struct {
	ID             uint   `gorm:"primaryKey"`
	UUID           string `gorm:"unique;not null"`
	Username       string `gorm:"not null"`
	Password       string `gorm:"not null"`
	Email          string `gorm:"not null"`
	Background     string
	ProfilePicture string
}

// INCOMING

// Incoming request required fields
type UserRequest struct {
	Username       string `json:"username" binding:"required"`
	Password       string `json:"password" binding:"required"`
	Email          string `json:"email" binding:"required"`
	Background     string `json:"background" binding:"required"`
	ProfilePicture string `json:"profile_picture" binding:"required"`
}

// Convert incoming request to domain object
func ConvertToUser(user *UserRequest) User {
	return User{
		UUID:           uuid.New().String(),
		Username:       user.Username,
		Password:       user.Password,
		Email:          user.Email,
		Background:     user.Background,
		ProfilePicture: user.ProfilePicture,
	}
}

// OUTGOING

// User response
type UserResponse struct {
	UUID           string `json:"id"`
	Username       string `json:"username"`
	Email          string `json:"email"`
	Background     string `json:"background"`
	ProfilePicture string `json:"profile_picture"`
}

// Convert domain object to response
func ConvertToUserResponse(user User) UserResponse {
	return UserResponse{
		UUID:           user.UUID,
		Username:       user.Username,
		Email:          user.Email,
		Background:     user.Background,
		ProfilePicture: user.ProfilePicture,
	}
}
