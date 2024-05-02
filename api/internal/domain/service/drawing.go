package service

import (
	"api/internal/domain/domainObject"
	"api/internal/domain/repository"
)

// IMPLEMENTATION
type DrawingService struct {
	repo repository.GenericRepository[domainObject.Drawing]
}

// INIT
func NewDrawingService(repo repository.GenericRepository[domainObject.Drawing]) *DrawingService {
	return &DrawingService{
		repo: repo,
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

// GET ALL DRAWINGS
func (s *DrawingService) GetAll() (*[]domainObject.Drawing, error) {
	var store []domainObject.Drawing
	err := s.repo.GetAll(&store)
	if err != nil {
		return nil, err
	}
	return &store, nil
}

// GET DRAWING
func (s *DrawingService) GetByID(id string) (domainObject.Drawing, error) {
	return s.repo.GetByID(id)
}

// DELETE DRAWING
func (s *DrawingService) Delete(id string) error {
	return s.repo.Delete(id)
}

// LIKE
func (s *DrawingService) Like(id string) error {
	drawing, err := s.repo.GetByID(id)
	if err != nil {
		return err
	}

	drawing.Likes++
	return s.repo.Update(drawing)
}

// DISLIKE
func (s *DrawingService) Dislike(id string) error {
	drawing, err := s.repo.GetByID(id)
	if err != nil {
		return err
	}

	drawing.Dislikes++
	return s.repo.Update(drawing)
}
