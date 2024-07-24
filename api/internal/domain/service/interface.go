package service

// Common service interface
type Service interface {
	// TODO: fix the generics
	// Create(T) (T, error)
	// Update(string, T) error
	// GetAll() (T, error)
	// GetByID(string) (T, error)
	Delete(string) error
}
