package repositoryImpl

import (
	"api/internal/domain/domainObject"
	"api/internal/infra/interfacer/gormInterfacer"
	"time"
)

type DrawingRepositoryImpl struct {
	gormInterfacer.GormRepository
}

func NewDrawingRepository() *DrawingRepositoryImpl {
	return &DrawingRepositoryImpl{
		GormRepository: gormInterfacer.GormRepository{
			DB: gormInterfacer.GetGormDBConnection(),
		},
	}
}

func (r *DrawingRepositoryImpl) Create(value *domainObject.Drawing) error {
	return r.GormRepository.Create(value)
}

func (r *DrawingRepositoryImpl) GetAll(result *[]domainObject.Drawing) error {
	preloadedDB := r.GormRepository.PreloadDB("User", "Daily", "LikedBy", "DislikedBy")
	return preloadedDB.Find(result).Error
}

func (r *DrawingRepositoryImpl) GetByID(id string) (domainObject.Drawing, error) {
	var drawing domainObject.Drawing
	preloadedDB := r.GormRepository.PreloadDB("User", "Daily", "LikedBy", "DislikedBy")
	err := preloadedDB.Where("uuid = ?", id).First(&drawing).Error
	return drawing, err
}

func (r *DrawingRepositoryImpl) GetByField(field string, value string, store *[]domainObject.Drawing) error {
	preloadedDB := r.PreloadDB("LikedBy", "DislikedBy")
	return preloadedDB.Where(field+" = ?", value).Find(store).Error
}

func (r *DrawingRepositoryImpl) Update(id string, value *domainObject.Drawing) error {
	return r.GormRepository.UpdateByUUID(id, value)
}

func (r *DrawingRepositoryImpl) Delete(id string) error {
	var model domainObject.Drawing
	return r.GormRepository.DeleteByUUID(id, &model)
}

func (r *DrawingRepositoryImpl) GetToday(date time.Time, store *[]domainObject.Drawing) error {
	preloadedDB := r.PreloadDB("User", "Daily", "LikedBy", "DislikedBy")
	return preloadedDB.Joins("Daily").Where("daily.date = ?", date).Find(store).Error
}
