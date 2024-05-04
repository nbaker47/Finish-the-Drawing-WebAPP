package repositoryImpl

import (
	"api/internal/domain/domainObject"
	"api/internal/infra/interfacer"

	"gorm.io/gorm"
)

// IMPLEMENTATION
type UserRepositoryImpl struct {
	DB *gorm.DB
}

// INIT
func NewUserRepository() *UserRepositoryImpl {
	return &UserRepositoryImpl{
		DB: interfacer.GetGormDBConnection(),
	}
}

// CREATE
func (r *UserRepositoryImpl) Create(value *domainObject.User) error {
	// Will return an error if fail-case occurs
	if err := r.DB.Create(value).Error; err != nil {
		return err
	}
	return nil
}

// GET ALL
func (r *UserRepositoryImpl) GetAll(result *[]domainObject.User) error {
	if err := r.DB.Find(result).Error; err != nil {
		return err
	}
	return nil
}

// GET BY ID
func (r *UserRepositoryImpl) GetByID(id string) (domainObject.User, error) {
	var result domainObject.User
	if err := r.DB.First(&result, "id = ?", id).Error; err != nil {
		return result, err
	}
	return result, nil
}

// GET BY FIELD
func (r *UserRepositoryImpl) GetByField(field string, value string) (domainObject.User, error) {
	var result domainObject.User
	if err := r.DB.Where(field+" = ?", value).First(&result).Error; err != nil {
		return result, err
	}
	return result, nil
}

// UPDATE
func (r *UserRepositoryImpl) Update(id string, value *domainObject.User) error {
	return r.DB.Model(value).Where("id = ?", id).Updates(value).Error
}

// DELETE
func (r *UserRepositoryImpl) Delete(id string) error {
	var model domainObject.User
	return r.DB.Delete(&model, "id = ?", id).Error
}
