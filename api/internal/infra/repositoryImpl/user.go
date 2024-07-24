package repositoryImpl

import (
	"api/internal/domain/domainObject"
	"api/internal/infra/interface/gormInterface"

	"gorm.io/gorm"
)

// IMPLEMENTATION
type UserRepositoryImpl struct {
	DB *gorm.DB
}

// INIT
func NewUserRepository() *UserRepositoryImpl {
	return &UserRepositoryImpl{
		DB: gormInterface.GetGormDBConnection(),
	}
}

// CREATE
func (r *UserRepositoryImpl) Create(value *domainObject.User) error {
	return gormInterface.Create(r.DB, value)
}

// GET ALL
func (r *UserRepositoryImpl) GetAll(result *[]domainObject.User) error {
	err := gormInterface.GetAll(r.DB, result)
	return err
}

// GET BY ID
func (r *UserRepositoryImpl) GetByID(id string) (domainObject.User, error) {
	var user domainObject.User
	err := gormInterface.GetByUUID(r.DB, id, &user)
	return user, err
}

// GET BY FIELD
func (r *UserRepositoryImpl) GetByField(field string, value string) (domainObject.User, error) {
	var user domainObject.User
	err := gormInterface.GetByField(r.DB, field, value, &user)
	return user, err
}

// UPDATE
func (r *UserRepositoryImpl) Update(id string, value *domainObject.User) error {
	return gormInterface.UpdateByUUID(r.DB, id, value)
}

// DELETE
func (r *UserRepositoryImpl) Delete(id string) error {
	var model domainObject.User
	return gormInterface.DeleteByUUID(r.DB, id, model)
}
