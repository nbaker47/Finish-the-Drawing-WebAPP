package repository

import (
	"api/internal/domain/domainObject"
	"time"

	"github.com/stretchr/testify/mock"
)

// Mock Daily Repo
type MockDailyRepository struct {
	mock.Mock
}

// Mock called daily repo methods
func (m *MockDailyRepository) GetByDate(date time.Time) (domainObject.Daily, error) {
	args := m.Called(date)
	return args.Get(0).(domainObject.Daily), args.Error(1)
}

func (m *MockDailyRepository) Create(daily *domainObject.Daily) error {
	args := m.Called(daily)
	return args.Error(0)
}
