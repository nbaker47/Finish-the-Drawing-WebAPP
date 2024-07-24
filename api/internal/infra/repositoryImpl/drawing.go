package repositoryImpl

import (
	"api/internal/domain/domainObject"
	"api/internal/infra/interface/gormInterface"

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
	// Will return an error if fail-case occurs
	if err := r.DB.Create(value).Error; err != nil {
		return err
	}
	return nil
}

// GET ALL
func (r *DrawingRepositoryImpl) GetAll(result *[]domainObject.Drawing) error {
	if err := r.DB.Preload("User").Preload("Daily").Preload("LikedBy").Preload("DislikedBy").Find(result).Error; err != nil {
		return err
	}
	return nil
}

// GET BY ID
func (r *DrawingRepositoryImpl) GetByID(id string) (domainObject.Drawing, error) {
	var drawing domainObject.Drawing
	preloadedDB := r.DB.Preload("User").Preload("Daily").Preload("LikedBy").Preload("DislikedBy")
	err := gormInterface.GetByUUID(preloadedDB, id, &drawing)
	if err != nil {
		return drawing, err
	}
	return drawing, nil
}

// GET BY FIELD
func (r *DrawingRepositoryImpl) GetByField(field string, value string) (domainObject.Drawing, error) {
	var drawing domainObject.Drawing
	result := r.DB.Preload("LikedBy").Preload("DislikedBy").Where(field+" = ?", value).First(&drawing)
	if result.Error != nil {
		return domainObject.Drawing{}, result.Error
	}
	return drawing, nil
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
