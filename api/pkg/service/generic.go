package service

import (
	"api/pkg/repository"

	"gorm.io/gorm"
)

// INTERFACE
type GenericService[T any] interface {
	Create(value *T) error
	GetAll() ([]T, error)
	GetByID(id string) (T, error)
	Update(value *T) error
	Delete(id string) error
}

// IMPLEMENTATION
type GenericServiceImpl[T any] struct {
	repo repository.GenericRepository[T]
}

// INIT
func NewGenericService[T any](db *gorm.DB) GenericService[T] {
	return &GenericServiceImpl[T]{
		repo: repository.NewGenericRepository[T](db),
	}
}

// METHODS: CRUD

// Create method
func (s *GenericServiceImpl[T]) Create(value *T) error {
	return s.repo.Create(*value)
}

// GetAll method
func (s *GenericServiceImpl[T]) GetAll() ([]T, error) {
	var result []T
	err := s.repo.GetAll(&result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// GetByID method
func (s *GenericServiceImpl[T]) GetByID(id string) (T, error) {
	return s.repo.GetByID(id)
}

// Update method
func (s *GenericServiceImpl[T]) Update(value *T) error {
	return s.repo.Update(*value)
}

// Delete method
func (s *GenericServiceImpl[T]) Delete(id string) error {
	return s.repo.Delete(id)
}
