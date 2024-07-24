package domainObject

import "github.com/google/uuid"

// Domain Object
type User struct {
	ID             uint   `gorm:"primaryKey" json:"-"`
	UUID           string `gorm:"unique;not null" json:"id"`
	Username       string `gorm:"not null" json:"username"`
	Password       string `gorm:"not null" json:"-"`
	Email          string `gorm:"not null" json:"-"`
	Background     string `json:"background"`
	ProfilePicture string `json:"profile_picture"`
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
