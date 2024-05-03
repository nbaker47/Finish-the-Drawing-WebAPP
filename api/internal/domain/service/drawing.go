package service

import (
	"api/internal/domain/domainObject"
	"api/internal/domain/repository"
	"strconv"
)

// IMPLEMENTATION
type DrawingService struct {
	repo     repository.GenericRepository[domainObject.Drawing]
	userRepo repository.GenericRepository[domainObject.User]
}

// INIT
func NewDrawingService(
	repo repository.GenericRepository[domainObject.Drawing],
	userRepo repository.GenericRepository[domainObject.User]) *DrawingService {
	return &DrawingService{
		repo:     repo,
		userRepo: userRepo,
	}
}

// METHODS :

// CREATE DRAWING
func (s *DrawingService) Create(drawing *domainObject.Drawing) error {
	// extract the drawing from the drawing.Image
	// upload drawing to the cloud -> get the image URL
	// set the drawing.Image to the URL
	// create the drawing
	return s.repo.Create(drawing)
}

func (s *DrawingService) GetAll() (*[]domainObject.DrawingResponse, error) {
	var store []domainObject.Drawing
	err := s.repo.GetAll(&store)
	if err != nil {
		return nil, err
	}

	var drawingsResponse []domainObject.DrawingResponse
	for _, drawing := range store {
		drawingSafe := domainObject.ConvertDrawingResponse(drawing)
		user, err := s.userRepo.GetByID(strconv.Itoa(int(drawing.User)))
		if err != nil {
			return nil, err
		}
		drawingSafe.User = domainObject.ConvertToUserResponse(user)
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
	drawingSafe := domainObject.ConvertDrawingResponse(drawing)
	user, err := s.userRepo.GetByID(strconv.Itoa(int(drawing.User)))
	if err != nil {
		return domainObject.DrawingResponse{}, err
	}
	drawingSafe.User = domainObject.ConvertToUserResponse(user)
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
