package service

import (
	"api/pkg/model"
	"api/pkg/repository"

	"gorm.io/gorm"
)

// INTERFACE
type UserService interface {
	Create(user *model.User) error
	GetAll() ([]model.User, error)
	GetByID(id string) (*model.User, error)
	Delete(id string) error
	Update(user *model.User) error
	GetHallOfFame() ([]model.User, error)
}

// IMPLEMENTATION
type UserServiceImpl struct {
	repo repository.GenericRepository[model.User]
}

// INIT
func NewUserService(db *gorm.DB) UserService {
	return &UserServiceImpl{
		repo: repository.NewGenericRepository[model.User](db),
	}
}

// METHODS :

// CREATE USER
func (s *UserServiceImpl) Create(user *model.User) error {
	// Will return an error if fail-case occurs
	err := s.repo.Create(*user)
	if err != nil {
		return err
	}
	return nil
}

// UPDATE USER
func (s *UserServiceImpl) Update(user *model.User) error {
	return s.repo.Update(*user)
}

// GET ALL USERS
func (s *UserServiceImpl) GetAll() ([]model.User, error) {
	var users []model.User
	err := s.repo.GetAll(&users)
	if err != nil {
		return nil, err
	}
	return users, nil
}

// GET USER
func (s *UserServiceImpl) GetByID(id string) (*model.User, error) {
	user, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// DELETE USER
func (s *UserServiceImpl) Delete(id string) error {
	return s.repo.Delete(id)
}

// GET HALL OF FAME
func (s *UserServiceImpl) GetHallOfFame() ([]model.User, error) {
	var allUsers []model.User
	if err := s.repo.GetAll(&allUsers); err != nil {
		return nil, err
	}

	// TODO: sort users by likes

	return allUsers, nil
}
