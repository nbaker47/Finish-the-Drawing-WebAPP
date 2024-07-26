package userService

import (
	"api/internal/domain/domainObject"

	"github.com/stretchr/testify/mock"
)

type MockUserService struct {
	mock.Mock
}

func (m *MockUserService) GetGuestUUID() string {
	args := m.Called()
	return args.String(0)
}

func (m *MockUserService) CreateGuest() (domainObject.User, error) {
	args := m.Called()
	return args.Get(0).(domainObject.User), args.Error(1)
}

func (m *MockUserService) Create(userReq *domainObject.UserRequest) (domainObject.User, error) {
	args := m.Called(userReq)
	return args.Get(0).(domainObject.User), args.Error(1)
}

func (m *MockUserService) Update(userID string, user *domainObject.User) error {
	args := m.Called(userID, user)
	return args.Error(0)
}

func (m *MockUserService) GetAll(store *[]domainObject.User) error {
	args := m.Called(store)
	return args.Error(0)
}

func (m *MockUserService) GetByID(id string) (domainObject.User, error) {
	args := m.Called(id)
	return args.Get(0).(domainObject.User), args.Error(1)
}

func (m *MockUserService) Delete(id string) error {
	args := m.Called(id)
	return args.Error(0)
}

func (m *MockUserService) GetHallOfFame() ([]domainObject.User, error) {
	args := m.Called()
	return args.Get(0).([]domainObject.User), args.Error(1)
}
