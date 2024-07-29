package repositoryImpl

import (
	"api/internal/domain/domainObject"
	"api/internal/infra/interfacer/gormInterfacer"
	"time"
)

type DailyRepositoryImpl struct {
	gormInterfacer.GormRepository
}

func NewDailyRepository() *DailyRepositoryImpl {
	return &DailyRepositoryImpl{
		GormRepository: gormInterfacer.GormRepository{
			DB: gormInterfacer.GetGormDBConnection(),
		},
	}
}

func (r *DailyRepositoryImpl) GetByDate(date time.Time) (domainObject.Daily, error) {
	var daily domainObject.Daily
	err := r.DB.Where("date = ?", date).First(&daily).Error
	return daily, err
}

func (r *DailyRepositoryImpl) Create(daily *domainObject.Daily) error {
	return r.GormRepository.Create(daily)
}
