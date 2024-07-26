package crudService

func GetAll[T any](store *[]T, repo interface{ GetAll(store *[]T) error }) error {
	err := repo.GetAll(store)
	if err != nil {
		return err
	}
	return nil
}

func GetByID[T any](id string, repo interface {
	GetByID(id string) (T, error)
}) (T, error) {
	return repo.GetByID(id)
}

func Delete(id string, repo interface{ Delete(id string) error }) error {
	return repo.Delete(id)
}
