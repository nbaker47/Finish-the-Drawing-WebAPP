package domain_testpackage service_test

import (
    "testing"
    "errors"

    "github.com/stretchr/testify/mock"
    "github.com/stretchr/testify/assert"

    "yourmodule/internal/domain/service"
    "yourmodule/internal/domain/domainObject"
)

type MockRepository struct {
    mock.Mock
}

func (m *MockRepository) GetAll(store *[]domainObject.Drawing) error {
    args := m.Called(store)
    return args.Error(0)
}

func TestDrawingService_GetAll(t *testing.T) {
    mockRepo := new(MockRepository)
    service := service.DrawingService{Repo: mockRepo}

    t.Run("returns drawings when no error occurs", func(t *testing.T) {
        drawings := []domainObject.Drawing{
            {ID: "1", Name: "Drawing1"},
            {ID: "2", Name: "Drawing2"},
        }
        mockRepo.On("GetAll", mock.Anything).Return(nil).Run(func(args mock.Arguments) {
            arg := args.Get(0).(*[]domainObject.Drawing)
            *arg = drawings
        })

        result, err := service.GetAll()

        assert.NoError(t, err)
        assert.Equal(t, 2, len(*result))
        assert.Equal(t, "1", (*result)[0].ID)
        assert.Equal(t, "Drawing1", (*result)[0].Name)
        assert.Equal(t, "2", (*result)[1].ID)
        assert.Equal(t, "Drawing2", (*result)[1].Name)
        mockRepo.AssertExpectations(t)
    })

    t.Run("returns error when repository fails", func(t *testing.T) {
        mockRepo.On("GetAll", mock.Anything).Return(errors.New("test error"))

        _, err := service.GetAll()

        assert.Error(t, err)
        assert.Equal(t, "test error", err.Error())
        mockRepo.AssertExpectations(t)
    })
}