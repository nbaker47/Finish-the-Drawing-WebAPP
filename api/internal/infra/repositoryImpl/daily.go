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
	err := r.DB.Where("date = ?", date).First(&daily).Error
	return daily, err
}

// CREATE
func (r *DailyRepositoryImpl) Create(daily *domainObject.Daily) error {
	return gormInterface.Create(r.DB, daily)
}
