package service

import (
	"api/internal/domain/domainObject"
	"api/internal/domain/repository"

	"api/internal/infra/repositoryImpl"
)

// IMPLEMENTATION
type UserService struct {
	repo repository.GenericRepository[domainObject.User]
}

// INIT
func NewUserService() *UserService {
	return &UserService{
		repo: repositoryImpl.NewGenericRepository[domainObject.User](),
	}
}

// METHODS :

// CREATE USER
func (s *UserService) Create(user *domainObject.User) error {
	// Will return an error if fail-case occurs
	return s.repo.Create(*user)
}

// UPDATE USER
func (s *UserService) Update(user *domainObject.User) error {
	return s.repo.Update(*user)
}

// GET ALL USERS
func (s *UserService) GetAll() (*[]domainObject.User, error) {
	var store []domainObject.User
	err := s.repo.GetAll(&store)
	if err != nil {
		return nil, err
	}
	return &store, nil
}

// GET USER
func (s *UserService) GetByID(id string) (domainObject.User, error) {
	return s.repo.GetByID(id)
}

// DELETE USER
func (s *UserService) Delete(id string) error {
	return s.repo.Delete(id)
}

// GET HALL OF FAME
func (s *UserService) GetHallOfFame() ([]domainObject.User, error) {
	var allUsers []domainObject.User
	if err := s.repo.GetAll(&allUsers); err != nil {
		return nil, err
	}

	// TODO: sort users by likes

	return allUsers, nil
}
