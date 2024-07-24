package dailyService

import (
	"api/internal/domain/domainObject"

	"github.com/stretchr/testify/mock"
)

type MockDailyService struct {
	mock.Mock
}

func (m *MockDailyService) GetToday() (domainObject.Daily, error) {
	args := m.Called()
	return args.Get(0).(domainObject.Daily), args.Error(1)
}

func (m *MockDailyService) Create() error {
	panic("unimplemented")
}

func (m *MockDailyService) GetRandomWord() string {
	panic("unimplemented")
}
