package repository

import "api/internal/domain/domainObject"

// INTERFACE
type UserRepository interface {
	Create(value *domainObject.User) error
	GetAll(result *[]domainObject.User) error
	GetByID(id string) (domainObject.User, error)
	GetByField(field string, value string) (domainObject.User, error)
	Update(id string, value *domainObject.User) error
	Delete(id string) error
}
