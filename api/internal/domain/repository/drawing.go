package repository

import (
	"api/internal/domain/domainObject"
	"time"
)

// INTERFACE
type DrawingRepository interface {
	Create(value *domainObject.Drawing) error
	GetAll(result *[]domainObject.Drawing) error
	GetByID(id string) (domainObject.Drawing, error)
	GetByField(field string, value string, store *[]domainObject.Drawing) error
	GetToday(date time.Time, store *[]domainObject.Drawing) error
	Update(id string, value *domainObject.Drawing) error
	Delete(id string) error
}
