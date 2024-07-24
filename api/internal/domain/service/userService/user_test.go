package userService

import (
	"api/internal/domain/domainObject"
	"api/internal/domain/repository"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestUserService_Create(t *testing.T) {
	repo := &repository.MockUserRepository{}
	service := NewUserService(repo)

	userReq := &domainObject.UserRequest{
		Username: "testuser",
		Password: "password",
	}

	repo.On("Create", mock.AnythingOfType("*domainObject.User")).Return(nil)

	createdUser, err := service.Create(userReq)
	assert.NoError(t, err)
	assert.NotNil(t, createdUser)
}

func TestUserService_Update(t *testing.T) {
	repo := &repository.MockUserRepository{}
	service := NewUserService(repo)

	userID := "55555555-7777-9999-8468-6c541d21734c"
	user := &domainObject.User{
		ID:       1,
		Username: "testuser",
		Password: "password",
	}

	repo.On("Update", userID, user).Return(nil)

	err := service.Update(userID, user)
	assert.NoError(t, err)
}

func TestUserService_GetAll(t *testing.T) {
	repo := &repository.MockUserRepository{}
	service := NewUserService(repo)

	repo.On("GetAll", mock.AnythingOfType("*[]domainObject.User")).Return(nil)

	users, err := service.GetAll()
	assert.NoError(t, err)
	assert.NotNil(t, users)
}

func TestUserService_GetByID(t *testing.T) {
	repo := &repository.MockUserRepository{}
	service := NewUserService(repo)

	userID := "123"

	repo.On("GetByID", userID).Return(domainObject.User{}, nil)

	user, err := service.GetByID(userID)
	assert.NoError(t, err)
	assert.NotNil(t, user)
}

func TestUserService_Delete(t *testing.T) {
	repo := &repository.MockUserRepository{}
	service := NewUserService(repo)

	userID := "123"

	repo.On("Delete", userID).Return(nil)

	err := service.Delete(userID)
	assert.NoError(t, err)
}

func TestUserService_GetHallOfFame(t *testing.T) {
	repo := &repository.MockUserRepository{}
	service := NewUserService(repo)

	user := domainObject.User{
		ID:       1,
		Username: "testuser",
	}
	userList := []domainObject.User{user}

	repo.On("GetAll", mock.Anything).Run(func(args mock.Arguments) {
		arg := args.Get(0).(*[]domainObject.User)
		*arg = userList
	}).Return(nil)

	users, err := service.GetHallOfFame()
	assert.NoError(t, err)
	assert.NotNil(t, users)
}
