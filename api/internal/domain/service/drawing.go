package service

import (
	"api/internal/domain/domainObject"
	"api/internal/domain/repository"
	"strconv"
)

// IMPLEMENTATION
type DrawingService struct {
	repo         repository.DrawingRepository
	userRepo     repository.UserRepository
	dailyService DailyService
}

// INIT
func NewDrawingService(
	repo repository.DrawingRepository,
	userRepo repository.UserRepository,
	dailyService DailyService) *DrawingService {
	return &DrawingService{
		repo:         repo,
		userRepo:     userRepo,
		dailyService: dailyService,
	}
}

// METHODS :

// CREATE DRAWING
func (s *DrawingService) Create(drawingReq *domainObject.DrawingRequest) error {
	// get the user from the drawing.UserID
	user, err := s.userRepo.GetByID(strconv.Itoa(int(drawingReq.User)))
	if err != nil {
		return err
	}
	// get the daily
	daily, err := s.dailyService.GetToday()
	if err != nil {
		return err
	}
	// make the drawing object
	var drawing = domainObject.Drawing{
		UserID:      user.ID,
		User:        user,
		DailyID:     daily.ID,
		Daily:       daily,
		Image:       drawingReq.Image,
		Description: drawingReq.Description,
		Likes:       0,
		Dislikes:    0,
	}
	// extract the drawing from the drawing.Image
	// upload drawing to the cloud -> get the image URL
	// set the drawing.Image to the URL
	// create the drawing
	return s.repo.Create(&drawing)
}

// GET ALL DRAWINGS
func (s *DrawingService) GetAll() (*[]domainObject.DrawingResponse, error) {
	var store []domainObject.Drawing
	err := s.repo.GetAll(&store)
	if err != nil {
		return nil, err
	}

	var drawingsResponse []domainObject.DrawingResponse
	for _, drawing := range store {
		drawingSafe := domainObject.ConvertToDrawingResponse(drawing)
		drawingsResponse = append(drawingsResponse, drawingSafe)
	}
	return &drawingsResponse, nil
}

// GET DRAWING
func (s *DrawingService) GetByID(id string) (domainObject.DrawingResponse, error) {
	drawing, err := s.repo.GetByID(id)
	if err != nil {
		return domainObject.DrawingResponse{}, err
	}
	drawingSafe := domainObject.ConvertToDrawingResponse(drawing)
	return drawingSafe, nil
}

// DELETE DRAWING
func (s *DrawingService) Delete(id string) error {
	return s.repo.Delete(id)
}

// LIKE
func (s *DrawingService) Like(id string, userID string) error {
	drawing, err := s.repo.GetByID(id)
	if err != nil {
		return err
	}
	drawing.Likes++
	userObj, err := s.userRepo.GetByID(userID)
	if err != nil {
		return err
	}
	drawing.LikedBy = append(drawing.LikedBy, userObj)
	err = s.repo.Update(id, &drawing)
	if err != nil {
		return err
	}
	return nil
}

// DISLIKE
func (s *DrawingService) Dislike(id string, userID string) error {
	drawing, err := s.repo.GetByID(id)
	if err != nil {
		return err
	}

	drawing.Dislikes++
	userObj, err := s.userRepo.GetByID(userID)
	if err != nil {
		return err
	}
	drawing.DislikedBy = append(drawing.DislikedBy, userObj)
	err = s.repo.Update(id, &drawing)
	if err != nil {
		return err
	}
	return nil
}
