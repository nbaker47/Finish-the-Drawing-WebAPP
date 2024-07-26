package repository

import (
	"api/internal/domain/domainObject"

	"github.com/stretchr/testify/mock"
)

type MockUserRepository struct {
	mock.Mock
}

// Create implements repository.UserRepository.
func (m *MockUserRepository) Create(value *domainObject.User) error {
	args := m.Called(value)
	return args.Error(0)
}

// Delete implements repository.UserRepository.
func (m *MockUserRepository) Delete(id string) error {
	args := m.Called(id)
	return args.Error(0)
}

// GetAll implements repository.UserRepository.
func (m *MockUserRepository) GetAll(result *[]domainObject.User) error {
	args := m.Called(result)
	return args.Error(0)
}

// GetByField implements repository.UserRepository.
func (m *MockUserRepository) GetByField(field string, value string, store *[]domainObject.User) error {
	args := m.Called(field, value)
	return args.Error(1)
}

// Update implements repository.UserRepository.
func (m *MockUserRepository) Update(id string, value *domainObject.User) error {
	args := m.Called(id, value)
	return args.Error(0)
}

func (m *MockUserRepository) GetByID(id string) (domainObject.User, error) {
	args := m.Called(id)
	return args.Get(0).(domainObject.User), args.Error(1)
}
