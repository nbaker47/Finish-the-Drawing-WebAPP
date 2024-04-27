package service

import (
	"api/pkg/model"

	"gorm.io/gorm"
)

// INTERFACE
type DrawingService interface {
	GenericService[model.Drawing]
	CreateDrawing(drawing *model.Drawing) error
	Like(id string) error
	Dislike(id string) error
}

// IMPLEMENTATION
type DrawingServiceImpl struct {
	GenericService[model.Drawing]
}

// INIT
func NewDrawingService(db *gorm.DB) DrawingService {
	return &DrawingServiceImpl{
		GenericService: NewGenericService[model.Drawing](db),
	}
}

// METHODS :

// CREATE DRAWING
func (s *DrawingServiceImpl) CreateDrawing(drawing *model.Drawing) error {
	// extract the drawing from the drawing.Image
	// upload drawing to the cloud -> get the image URL
	// set the drawing.Image to the URL
	// create the drawing
	err := s.GenericService.Create(drawing)
	if err != nil {
		return err
	}
	return nil
}

// LIKE
func (s *DrawingServiceImpl) Like(id string) error {
	drawing, err := s.GetByID(id)
	if err != nil {
		return err
	}

	drawing.Likes++
	return s.Update(&drawing)
}

// DISLIKE
func (s *DrawingServiceImpl) Dislike(id string) error {
	drawing, err := s.GetByID(id)
	if err != nil {
		return err
	}

	drawing.Dislikes++
	return s.Update(&drawing)
}
