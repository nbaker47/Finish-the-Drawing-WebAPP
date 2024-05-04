package domainObject

type User struct {
	ID             uint   `gorm:"primaryKey" json:"id"`
	Username       string `gorm:"not null" json:"username"`
	Password       string `gorm:"not null" json:"password"`
	Email          string `gorm:"not null" json:"email"`
	Background     string `json:"background"`
	ProfilePicture string `json:"profile_picture"`
}

type UserRequest struct {
	Username       string `json:"username" binding:"required"`
	Password       string `json:"password" binding:"required"`
	Email          string `json:"email" binding:"required"`
	Background     string `json:"background" binding:"required"`
	ProfilePicture string `json:"profile_picture" binding:"required"`
}

func ConvertToUser(user *UserRequest) User {
	return User{
		Username:       user.Username,
		Password:       user.Password,
		Email:          user.Email,
		Background:     user.Background,
		ProfilePicture: user.ProfilePicture,
	}
}

type UserResponse struct {
	ID             uint   `json:"id"`
	Username       string `json:"username"`
	Email          string `json:"email"`
	Background     string `json:"background"`
	ProfilePicture string `json:"profile_picture"`
}

func ConvertToUserResponse(user User) UserResponse {
	return UserResponse{
		ID:             user.ID,
		Username:       user.Username,
		Email:          user.Email,
		Background:     user.Background,
		ProfilePicture: user.ProfilePicture,
	}
}
