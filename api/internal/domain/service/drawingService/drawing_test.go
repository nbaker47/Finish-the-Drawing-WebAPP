package drawingService

import (
	"testing"
	"time"

	"api/internal/domain/domainObject"
	"api/internal/domain/repository"
	"api/internal/domain/service/dailyService"
	"api/internal/domain/service/userService"

	// "api/internal/infra/repositoryImpl"

	"github.com/stretchr/testify/mock"
)

func TestCreateDrawing(t *testing.T) {
	// NOTE: are using real drawing repo, rest are mocked
	drawingRepo := &repository.MockDrawingRepository{}
	userRepo := &repository.MockUserRepository{}
	dailyService := &dailyService.MockDailyService{}
	userService := &userService.MockUserService{}

	service := NewDrawingService(drawingRepo, userRepo, dailyService, userService)

	drawingReq := &domainObject.DrawingRequest{
		User:        "55555555-7777-9999-8468-6c541d21734c",
		Image:       "668877df-2f9e-4c8d-8468-6c541d21734c",
		Description: "test_description",
		Daily:       "86593fc3-92d7-4f6a-9971-b257f84a5728",
	}

	returnedUser := domainObject.User{
		ID:             0,
		UUID:           "55555555-7777-9999-8468-6c541d21734c",
		Username:       "test_username",
		Background:     "test_background",
		ProfilePicture: "test_profile_picture",
	}

	returnedDaily := domainObject.Daily{
		ID:   0,
		UUID: "86593fc3-92d7-4f6a-9971-b257f84a5728",
		Date: time.Now(),
		Seed: 905,
		Word: "Spaceship",
	}

	// Mock the dependencies' behavior
	userRepo.On("GetByID", drawingReq.User).Return(returnedUser, nil)
	dailyService.On("GetToday").Return(returnedDaily, nil)
	drawingRepo.On("Create", mock.AnythingOfType("*domainObject.Drawing")).Return(nil)

	// Call the Create method
	drawing, err := service.Create(drawingReq)
	if err != nil {
		t.Errorf("Create failed: %v", err)
	}
	if drawing.UUID == "" {
		t.Errorf("Create failed: drawing.UUID is empty")
	}
	if drawing.User.UUID != drawingReq.User {

		t.Errorf("Create failed: drawing.User.UUID is incorrect %v != %v",
			drawing.User.UUID, drawingReq.User)
	}
	if drawing.Daily.UUID != drawingReq.Daily {
		t.Errorf("Create failed: drawing.Daily.UUID is incorrect %v != %v",
			drawing.Daily.UUID, drawingReq.Daily)
	}

}

func TestGetAllDrawings(t *testing.T) {
	repo := &repository.MockDrawingRepository{}
	userRepo := &repository.MockUserRepository{}
	dailyService := &dailyService.MockDailyService{}
	userService := &userService.MockUserService{}

	service := NewDrawingService(repo, userRepo, dailyService, userService)

	// Mock the dependencies' behavior
	repo.On("GetAll", mock.AnythingOfType("*[]domainObject.Drawing")).Return(nil)

	// Call the GetAll method
	var store *[]domainObject.Drawing
	err := service.GetAll(store)
	if err != nil {
		t.Errorf("GetAll failed: %v", err)
	}

	// Add assertions for the expected behavior
}

func TestGetDrawingByID(t *testing.T) {
	repo := &repository.MockDrawingRepository{}
	userRepo := &repository.MockUserRepository{}
	dailyService := &dailyService.MockDailyService{}
	userService := &userService.MockUserService{}

	service := NewDrawingService(repo, userRepo, dailyService, userService)

	id := "drawing1"

	// Mock the dependencies' behavior
	repo.On("GetByID", id).Return(domainObject.Drawing{}, nil)

	// Call the GetByID method
	_, err := service.GetByID(id)
	if err != nil {
		t.Errorf("GetByID failed: %v", err)
	}

	// Add assertions for the expected behavior
}

func TestDeleteDrawing(t *testing.T) {
	repo := &repository.MockDrawingRepository{}
	userRepo := &repository.MockUserRepository{}
	dailyService := &dailyService.MockDailyService{}
	userService := &userService.MockUserService{}

	service := NewDrawingService(repo, userRepo, dailyService, userService)

	id := "drawing1"

	// Mock the dependencies' behavior
	repo.On("Delete", id).Return(nil)

	// Call the Delete method
	err := service.Delete(id)
	if err != nil {
		t.Errorf("Delete failed: %v", err)
	}

	// Add assertions for the expected behavior
}

func TestLikeDrawing(t *testing.T) {
	repo := &repository.MockDrawingRepository{}
	userRepo := &repository.MockUserRepository{}
	dailyService := &dailyService.MockDailyService{}
	userService := &userService.MockUserService{}

	service := NewDrawingService(repo, userRepo, dailyService, userService)

	id := "drawing1"
	userID := "user1"

	// Mock the dependencies' behavior
	repo.On("GetByID", id).Return(domainObject.Drawing{}, nil)
	userRepo.On("GetByID", userID).Return(domainObject.User{}, nil)
	repo.On("Update", id, mock.AnythingOfType("*domainObject.Drawing")).Return(nil)

	// Call the Like method
	err := service.Like(id, userID)
	if err != nil {
		t.Errorf("Like failed: %v", err)
	}

	// Add assertions for the expected behavior
}

func TestDislikeDrawing(t *testing.T) {
	repo := &repository.MockDrawingRepository{}
	userRepo := &repository.MockUserRepository{}
	dailyService := &dailyService.MockDailyService{}
	userService := &userService.MockUserService{}

	service := NewDrawingService(repo, userRepo, dailyService, userService)

	id := "drawing1"
	userID := "user1"

	// Mock the dependencies' behavior
	repo.On("GetByID", id).Return(domainObject.Drawing{}, nil)
	userRepo.On("GetByID", userID).Return(domainObject.User{}, nil)
	repo.On("Update", id, mock.AnythingOfType("*domainObject.Drawing")).Return(nil)

	// Call the Dislike method
	err := service.Dislike(id, userID)
	if err != nil {
		t.Errorf("Dislike failed: %v", err)
	}

	// Add assertions for the expected behavior
}
