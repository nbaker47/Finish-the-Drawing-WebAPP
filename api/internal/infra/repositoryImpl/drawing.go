package repositoryImpl

import (
	"api/internal/domain/domainObject"
	"api/internal/infra/interface/gormInterface"
	"time"

	"gorm.io/gorm"
)

// IMPLEMENTATION
type DrawingRepositoryImpl struct {
	DB *gorm.DB
}

// INIT
func NewDrawingRepository() *DrawingRepositoryImpl {
	return &DrawingRepositoryImpl{
		DB: gormInterface.GetGormDBConnection(),
	}
}

// CREATE
func (r *DrawingRepositoryImpl) Create(value *domainObject.Drawing) error {
	return gormInterface.Create(r.DB, value)
}

// GET ALL
func (r *DrawingRepositoryImpl) GetAll(result *[]domainObject.Drawing) error {
	preloadedDB := r.DB.Preload("User").Preload("Daily").Preload("LikedBy").Preload("DislikedBy")
	err := gormInterface.GetAll(preloadedDB, result)
	return err
}

// GET BY ID
func (r *DrawingRepositoryImpl) GetByID(id string) (domainObject.Drawing, error) {
	var drawing domainObject.Drawing
	preloadedDB := r.DB.Preload("User").Preload("Daily").Preload("LikedBy").Preload("DislikedBy")
	err := gormInterface.GetByUUID(preloadedDB, id, &drawing)
	return drawing, err
}

// GET BY FIELD
func (r *DrawingRepositoryImpl) GetByField(field string, value string, store *[]domainObject.Drawing) error {
	preloadedDB := r.DB.Preload("LikedBy").Preload("DislikedBy")
	err := gormInterface.GetByField(preloadedDB, field, value, store)
	return err
}

// UPDATE
func (r *DrawingRepositoryImpl) Update(id string, value *domainObject.Drawing) error {
	return gormInterface.UpdateByUUID(r.DB, id, value)
}

// DELETE
func (r *DrawingRepositoryImpl) Delete(id string) error {
	var model domainObject.Drawing
	return gormInterface.DeleteByUUID(r.DB, id, model)
}

func (r *DrawingRepositoryImpl) GetToday(date time.Time, store *[]domainObject.Drawing) error {
	preloadedDB := r.DB.Preload("User").Preload("Daily").Preload("LikedBy").Preload("DislikedBy")
	err := preloadedDB.Joins("Daily").Where("daily.date = ?", date).Find(store).Error
	return err
}
