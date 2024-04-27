package service

import (
	"api/pkg/model"
	"api/pkg/repository"

	"gorm.io/gorm"
)

// INTERFACE
type DrawingService interface {
	Create(drawing *model.Drawing) error
	GetAll() ([]model.Drawing, error)
	GetByID(id string) (*model.Drawing, error)
	Like(id string) error
	Dislike(id string) error
	Delete(id string) error
}

// IMPLEMENTATION
type DrawingServiceImpl struct {
	repo repository.GenericRepository[model.Drawing]
}

// INIT
func NewDrawingService(db *gorm.DB) DrawingService {
	return &DrawingServiceImpl{
		repo: repository.NewGenericRepository[model.Drawing](db),
	}
}

// METHODS :

// CREATE DRAWING
func (s *DrawingServiceImpl) Create(drawing *model.Drawing) error {
	// extract the drawing from the drawing.Image
	// upload drawing to the cloud -> get the image URL
	// set the drawing.Image to the URL
	// create the drawing
	err := s.repo.Create(*drawing)
	if err != nil {
		return err
	}
	return nil
}

// GET ALL DRAWINGS
func (s *DrawingServiceImpl) GetAll() ([]model.Drawing, error) {
	var drawings []model.Drawing
	err := s.repo.GetAll(&drawings)
	if err != nil {
		return nil, err
	}
	return drawings, nil
}

// VIEW DRAWING
func (s *DrawingServiceImpl) GetByID(id string) (*model.Drawing, error) {
	drawing, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}
	return &drawing, nil
}

// LIKE
func (s *DrawingServiceImpl) Like(id string) error {
	drawing, err := s.repo.GetByID(id)
	if err != nil {
		return err
	}

	drawing.Likes++
	return s.repo.Update(drawing)
}

// DISLIKE
func (s *DrawingServiceImpl) Dislike(id string) error {
	drawing, err := s.repo.GetByID(id)
	if err != nil {
		return err
	}

	drawing.Dislikes++
	return s.repo.Update(drawing)
}

// DELETE
func (s *DrawingServiceImpl) Delete(id string) error {
	return s.repo.Delete(id)
}
