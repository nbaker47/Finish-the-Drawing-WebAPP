package drawingService

import (
	"api/internal/domain/domainObject"
	"api/internal/domain/repository"
	"api/internal/domain/service/crudService"
	"api/internal/domain/service/dailyService"
)

// IMPLEMENTATION
type DrawingService struct {
	repo         repository.DrawingRepository
	userRepo     repository.UserRepository
	dailyService dailyService.DailyService
}

// INIT
func NewDrawingService(
	repo repository.DrawingRepository,
	userRepo repository.UserRepository,
	dailyService dailyService.DailyService) *DrawingService {
	return &DrawingService{
		repo:         repo,
		userRepo:     userRepo,
		dailyService: dailyService,
	}
}

///////////////////////////////////////////////////////
// METHODS
///////////////////////////////////////////////////////

// CREATE DRAWING
func (s *DrawingService) Create(drawingReq *domainObject.DrawingRequest) (domainObject.Drawing, error) {

	// check if the user is a guest
	if drawingReq.User == "NULL_USER" {
		store := &[]domainObject.User{}
		err := s.userRepo.GetByField("username", "Guest Artist", store)
		if err != nil {
			return domainObject.Drawing{}, err
		}
		deref := *store
		drawingReq.User = deref[0].UUID
	}

	// get the user
	user, err := s.userRepo.GetByID((drawingReq.User))
	if err != nil {
		return domainObject.Drawing{}, err
	}

	// get the daily
	daily, err := s.dailyService.GetToday()
	if err != nil {
		return domainObject.Drawing{}, err
	}
	// make the drawing object
	var drawing = domainObject.ConvertToDrawing(drawingReq, user, daily)

	// TODO:
	// extract the drawing from the drawing.Image
	// upload drawing to the cloud -> get the image URL
	// set the drawing.Image to the URL
	// create the drawing
	s.repo.Create(&drawing)
	return drawing, nil
}

// GET ALL DRAWINGS
func (s *DrawingService) GetAll(store *[]domainObject.Drawing) error {
	return crudService.GetAll(store, s.repo)
}

// GET TODAY'S DRAWINGS
func (s *DrawingService) GetTodays(store *[]domainObject.Drawing) error {
	date := s.dailyService.GetTodaysDate()
	err := s.repo.GetToday(date, store)
	if err != nil {
		return err
	}
	return nil
}

// GET DRAWING
func (s *DrawingService) GetByID(id string) (domainObject.Drawing, error) {
	return crudService.GetByID(id, s.repo)
}

// DELETE DRAWING
func (s *DrawingService) Delete(id string) error {
	return crudService.Delete(id, s.repo)
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
