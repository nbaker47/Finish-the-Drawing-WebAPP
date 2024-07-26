package repository

import (
	"api/internal/domain/domainObject"
	"time"

	"github.com/stretchr/testify/mock"
)

type MockDrawingRepository struct {
	mock.Mock
}

func (m *MockDrawingRepository) Create(drawing *domainObject.Drawing) error {
	args := m.Called(drawing)
	return args.Error(0)
}

// Delete implements repository.DrawingRepository.
func (m *MockDrawingRepository) Delete(id string) error {
	args := m.Called(id)
	return args.Error(0)
}

// GetAll implements repository.DrawingRepository.
func (m *MockDrawingRepository) GetAll(result *[]domainObject.Drawing) error {
	args := m.Called(result)
	return args.Error(0)
}

// GetByField implements repository.DrawingRepository.
func (m *MockDrawingRepository) GetByField(field string, value string, store *[]domainObject.Drawing) error {
	args := m.Called(field, value)
	return args.Error(1)
}

// GetByID implements repository.DrawingRepository.
func (m *MockDrawingRepository) GetByID(id string) (domainObject.Drawing, error) {
	args := m.Called(id)
	return args.Get(0).(domainObject.Drawing), args.Error(1)
}

// Update implements repository.DrawingRepository.
func (m *MockDrawingRepository) Update(id string, value *domainObject.Drawing) error {
	args := m.Called(id, value)
	return args.Error(0)
}

func (m *MockDrawingRepository) GetToday(date time.Time, store *[]domainObject.Drawing) error {
	args := m.Called(date, store)
	return args.Error(0)
}
