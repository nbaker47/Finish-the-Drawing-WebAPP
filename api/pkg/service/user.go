package service

import (
	"api/pkg/model"
	"api/pkg/repository"

	"gorm.io/gorm"
)

// IMPLEMENTATION
type UserService struct {
	repo repository.GenericRepository[model.User]
}

// INIT
func NewUserService(db *gorm.DB) *UserService {
	return &UserService{
		repo: repository.NewGenericRepository[model.User](db),
	}
}

// METHODS :

// CREATE USER
func (s *UserService) Create(user *model.User) error {
	// Will return an error if fail-case occurs
	return s.repo.Create(*user)
}

// UPDATE USER
func (s *UserService) Update(user *model.User) error {
	return s.repo.Update(*user)
}

// GET ALL USERS
func (s *UserService) GetAll() (*[]model.User, error) {
	var store []model.User
	err := s.repo.GetAll(&store)
	if err != nil {
		return nil, err
	}
	return &store, nil
}

// GET USER
func (s *UserService) GetByID(id string) (model.User, error) {
	return s.repo.GetByID(id)
}

// DELETE USER
func (s *UserService) Delete(id string) error {
	return s.repo.Delete(id)
}

// GET HALL OF FAME
func (s *UserService) GetHallOfFame() ([]model.User, error) {
	var allUsers []model.User
	if err := s.repo.GetAll(&allUsers); err != nil {
		return nil, err
	}

	// TODO: sort users by likes

	return allUsers, nil
}
