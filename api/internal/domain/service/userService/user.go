package userService

import (
	"api/internal/domain/domainObject"
	"api/internal/domain/repository"
	"api/internal/domain/service/crudService"

	"golang.org/x/crypto/bcrypt"
)

// IMPLEMENTATION
type UserService struct {
	repo repository.UserRepository
}

// INIT
func NewUserService(repo repository.UserRepository) *UserService {
	return &UserService{
		repo: repo,
	}
}

// METHODS :

// CREATE GUEST

func (s *UserService) CreateGuest() (domainObject.User, error) {
	// Check if guest user already exists
	if user, err := s.repo.GetByField("username", "Guest Artist"); err == nil {
		return user, nil
	}
	user := domainObject.User{
		Username:       "Guest Artist",
		Background:     "bg-pokadot",
		ProfilePicture: "PLACEHOLDER",
	}
	s.repo.Create(&user)
	return user, nil
}

// CREATE USER
func (s *UserService) Create(userReq *domainObject.UserRequest) (domainObject.User, error) {
	// hash the password
	bytes, err := bcrypt.GenerateFromPassword([]byte(userReq.Password), 14)
	if err != nil {
		return domainObject.User{}, err
	}
	userReq.Password = string(bytes)
	// bind to the user struct
	user := domainObject.ConvertToUser(userReq)
	// Will return an error if fail-case occurs
	s.repo.Create(&user)
	return user, nil
}

// UPDATE USER
func (s *UserService) Update(userID string, user *domainObject.User) error {
	// hash the password
	bytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		return err
	}
	user.Password = string(bytes)
	return s.repo.Update(userID, user)
}

// GET ALL USERS
func (s *UserService) GetAll(store *[]domainObject.User) error {
	return crudService.GetAll(store, s.repo)
}

// GET USER BY ID
func (s *UserService) GetByID(id string) (domainObject.User, error) {
	return crudService.GetByID(id, s.repo)
}

// DELETE USER
func (s *UserService) Delete(id string) error {
	return crudService.Delete(id, s.repo)
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
