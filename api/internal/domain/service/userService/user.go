package userService

import (
	"api/internal/domain/domainObject"
	"api/internal/domain/repository"
	"api/internal/domain/service/crudService"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type UserService interface {
	GetGuestUUID() string
	CreateGuest() (domainObject.User, error)
	Create(userReq *domainObject.UserRequest) (domainObject.User, error)
	Update(userID string, user *domainObject.User) error
	GetAll(store *[]domainObject.User) error
	GetByID(id string) (domainObject.User, error)
	Delete(id string) error
	GetHallOfFame() ([]domainObject.User, error)
}

// IMPLEMENTATION
type UserServiceImpl struct {
	repo repository.UserRepository
}

// INIT
func NewUserService(repo repository.UserRepository) *UserServiceImpl {
	return &UserServiceImpl{
		repo: repo,
	}
}

// METHODS :

// CREATE GUEST

func (s *UserServiceImpl) GetGuestUUID() string {
	store := &[]domainObject.User{}
	s.repo.GetByField("username", "Guest Artist", store)
	deref := *store
	guestArtistUUId := deref[0].UUID
	fmt.Println("GUEST UUID: ", guestArtistUUId)
	return guestArtistUUId
}

func (s *UserServiceImpl) CreateGuest() (domainObject.User, error) {
	// Check if guest user already exists
	store := &[]domainObject.User{}
	if err := s.repo.GetByField("username", "Guest Artist", store); err == nil {
		deref := *store
		return deref[0], nil
	}
	user := domainObject.User{
		Username:       "Guest Artist",
		Background:     "bg-pokadot",
		ProfilePicture: "PLACEHOLDER",
		UUID:           "NULL_USER",
	}
	s.repo.Create(&user)
	return user, nil
}

// CREATE USER
func (s *UserServiceImpl) Create(userReq *domainObject.UserRequest) (domainObject.User, error) {
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
func (s *UserServiceImpl) Update(userID string, user *domainObject.User) error {
	// hash the password
	bytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		return err
	}
	user.Password = string(bytes)
	return s.repo.Update(userID, user)
}

// GET ALL USERS
func (s *UserServiceImpl) GetAll(store *[]domainObject.User) error {
	return crudService.GetAll(store, s.repo)
}

// GET USER BY ID
func (s *UserServiceImpl) GetByID(id string) (domainObject.User, error) {
	return crudService.GetByID(id, s.repo)
}

// DELETE USER
func (s *UserServiceImpl) Delete(id string) error {
	return crudService.Delete(id, s.repo)
}

// GET HALL OF FAME
func (s *UserServiceImpl) GetHallOfFame() ([]domainObject.User, error) {
	var allUsers []domainObject.User
	if err := s.repo.GetAll(&allUsers); err != nil {
		return nil, err
	}

	// TODO: sort users by likes

	return allUsers, nil
}
