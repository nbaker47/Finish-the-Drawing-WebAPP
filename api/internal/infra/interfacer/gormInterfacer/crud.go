package gormInterfacer

import (
	"gorm.io/gorm"
)

type GormRepository struct {
	DB *gorm.DB
}

func (r *GormRepository) PreloadDB(preloads ...string) *gorm.DB {
	db := r.DB
	for _, preload := range preloads {
		db = db.Preload(preload)
	}
	return db
}

func (r *GormRepository) UpdateByUUID(id string, model interface{}) error {
	return r.DB.Model(model).Where("uuid = ?", id).Updates(model).Error
}

func (r *GormRepository) DeleteByUUID(id string, model interface{}) error {
	return r.DB.Delete(&model, "uuid = ?", id).Error
}

func (r *GormRepository) GetByUUID(id string, model interface{}) error {
	return r.DB.Where("uuid = ?", id).First(&model).Error
}

func (r *GormRepository) GetByField(field string, value string, model interface{}) error {
	return r.DB.Where(field+" = ?", value).First(model).Error
}

func (r *GormRepository) GetAll(result interface{}) error {
	return r.DB.Find(result).Error
}

func (r *GormRepository) Create(model interface{}) error {
	return r.DB.Create(model).Error
}
