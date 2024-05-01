package domainObject

type User struct {
	ID             uint
	Username       string `json:"username" binding:"required"`
	Password       string `json:"password" binding:"required"`
	Email          string `json:"email" binding:"required"`
	Background     string `json:"background" binding:"required"`
	ProfilePicture string `json:"profile_picture" binding:"required"`
}

type UserResponse struct {
	ID             uint   `json:"id"`
	Username       string `json:"username"`
	Email          string `json:"email"`
	Background     string `json:"background"`
	ProfilePicture string `json:"profile_picture"`
}

func UserToUserResponse(user User) UserResponse {
	return UserResponse{
		ID:             user.ID,
		Username:       user.Username,
		Email:          user.Email,
		Background:     user.Background,
		ProfilePicture: user.ProfilePicture,
	}
}
