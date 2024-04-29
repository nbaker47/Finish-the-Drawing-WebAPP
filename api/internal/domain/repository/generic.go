package repository

// INTERFACE
type GenericRepository[T any] interface {
	Create(value T) error
	GetAll(result *[]T) error
	GetByID(id string) (T, error)
	Update(value T) error
	Delete(id string) error
}
