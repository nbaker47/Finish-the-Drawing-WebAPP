package service

import (
	"api/pkg/model"

	"gorm.io/gorm"
)

// UserService interface
type UserService interface {
	GenericService[model.User]
	GetHallOfFame() ([]model.User, error)
}

// UserServiceImpl struct
type UserServiceImpl struct {
	GenericService[model.User]
}

// NewUserService function
func NewUserService(db *gorm.DB) UserService {
	return &UserServiceImpl{
		GenericService: NewGenericService[model.User](db),
	}
}

// METHODS :

// GET HALL OF FAME
func (s *UserServiceImpl) GetHallOfFame() ([]model.User, error) {
	allUsers, err := s.GetAll()
	if err != nil {
		return nil, err
	}

	// TODO: sort users by likes

	return allUsers, nil
}
