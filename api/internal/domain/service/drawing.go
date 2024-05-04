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
func (s *DrawingService) Create(drawingReq *domainObject.DrawingRequest) (domainObject.Drawing, error) {
	// get the user from the drawing.UserID
	user, err := s.userRepo.GetByID(strconv.Itoa(int(drawingReq.User)))
	if err != nil {
		return domainObject.Drawing{}, err
	}
	// get the daily
	daily, err := s.dailyService.GetToday()
	if err != nil {
		return domainObject.Drawing{}, err
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
	s.repo.Create(&drawing)
	return drawing, nil
}

// GET ALL DRAWINGS
func (s *DrawingService) GetAll() (*[]domainObject.Drawing, error) {
	store := &[]domainObject.Drawing{}
	err := s.repo.GetAll(store)
	if err != nil {
		return nil, err
	}
	return store, nil
}

// GET DRAWING
func (s *DrawingService) GetByID(id string) (domainObject.Drawing, error) {
	drawing, err := s.repo.GetByID(id)
	if err != nil {
		return domainObject.Drawing{}, err
	}
	return drawing, nil
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
