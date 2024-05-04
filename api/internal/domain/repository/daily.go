package repository

import (
	"api/internal/domain/domainObject"
	"time"
)

// INTERFACE
type DailyRepository interface {
	Create(value *domainObject.Daily) error
	GetByDate(date time.Time) (domainObject.Daily, error)
}
