package repositoryImpl

import (
	"api/internal/domain/domainObject"
	"api/internal/infra/interface/gormInterface"
	"time"

	"gorm.io/gorm"
)

// IMPLEMENTATION
type DailyRepositoryImpl struct {
	DB *gorm.DB
}

// INIT
func NewDailyRepository() *DailyRepositoryImpl {
	return &DailyRepositoryImpl{
		DB: gormInterface.GetGormDBConnection(),
	}
}

// GET BY DATE
func (r *DailyRepositoryImpl) GetByDate(date time.Time) (domainObject.Daily, error) {
	var daily domainObject.Daily
	result := r.DB.Where("Date"+" = ?", date).First(&daily)
	if result.Error != nil {
		return domainObject.Daily{}, result.Error
	}
	return daily, nil
}

// CREATE
func (r *DailyRepositoryImpl) Create(daily *domainObject.Daily) error {
	result := r.DB.Create(daily)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
