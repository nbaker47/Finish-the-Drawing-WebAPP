package service

import (
	"errors"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"

	"api/internal/domain/domainObject"
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

// Mock Domain Object for daily
type MockDomainObject struct {
	mock.Mock
}

func (m *MockDomainObject) CreateDaily() domainObject.Daily {
	args := m.Called()
	return args.Get(0).(domainObject.Daily)
}

func TestDailyService_Create(t *testing.T) {
	mockRepo := new(MockDailyRepository)
	service := NewDailyService(mockRepo)

	todaysDate := service.GetTodaysDate()

	// Test case when there is already a daily for today
	// no, error, daily exists and was found
	mockRepo.On("GetByDate", todaysDate).Return(domainObject.Daily{}, nil)

	err := service.Create()
	assert.Nil(t, err)

	////////////////////////////////////////////////
	mockDomainObject := new(MockDomainObject)

	// Test case when there is no daily for today
	// error, daily not found, so make one
	mockRepo.On("GetByDate", todaysDate).
		Return(domainObject.Daily{}, errors.New("not found"))
	mockDomainObject.On("CreateDaily").Return(domainObject.Daily{})

	mockRepo.On("Create", mock.Anything).Return(nil)

	err = service.Create()
	assert.Nil(t, err)

}
