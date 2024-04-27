package repository

import (
	"gorm.io/gorm"
)

// INTERFACE
type GenericRepository[T any] interface {
	Create(value T) error
	GetAll(result *[]T) error
	GetByID(id string) (T, error)
	Update(value T) error
	Delete(id string) error
}

// IMPLEMENTATION
type GenericRepositoryImpl[T any] struct {
	DB *gorm.DB
}

// INIT
func NewGenericRepository[T any](db *gorm.DB) *GenericRepositoryImpl[T] {
	return &GenericRepositoryImpl[T]{
		DB: db,
	}
}

// CREATE
func (r *GenericRepositoryImpl[T]) Create(value T) error {
	// Will return an error if fail-case occurs
	if err := r.DB.Create(value).Error; err != nil {
		return err
	}
	return nil
}

// GET ALL
func (r *GenericRepositoryImpl[T]) GetAll(result *[]T) error {
	if err := r.DB.Find(result).Error; err != nil {
		return err
	}
	return nil
}

// GET BY ID
func (r *GenericRepositoryImpl[T]) GetByID(id string) (T, error) {
	var result T
	if err := r.DB.First(&result, "id = ?", id).Error; err != nil {
		return result, err
	}
	return result, nil
}

// UPDATE
func (r *GenericRepositoryImpl[T]) Update(value T) error {
	return r.DB.Save(value).Error
}

// DELETE
func (r *GenericRepositoryImpl[T]) Delete(id string) error {
	var model T
	return r.DB.Delete(&model, "id = ?", id).Error
}
