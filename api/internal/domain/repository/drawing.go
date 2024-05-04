package repository

import "api/internal/domain/domainObject"

// INTERFACE
type DrawingRepository interface {
	Create(value *domainObject.Drawing) error
	GetAll(result *[]domainObject.Drawing) error
	GetByID(id string) (domainObject.Drawing, error)
	GetByField(field string, value string) (domainObject.Drawing, error)
	Update(id string, value *domainObject.Drawing) error
	Delete(id string) error
}
