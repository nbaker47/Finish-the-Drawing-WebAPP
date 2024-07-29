package repositoryImpl

import (
	"api/internal/domain/domainObject"
	"api/internal/infra/interfacer/gormInterfacer"
)

type UserRepositoryImpl struct {
	gormInterfacer.GormRepository
}

func NewUserRepository() *UserRepositoryImpl {
	return &UserRepositoryImpl{
		GormRepository: gormInterfacer.GormRepository{
			DB: gormInterfacer.GetGormDBConnection(),
		},
	}
}

func (r *UserRepositoryImpl) Create(value *domainObject.User) error {
	return r.GormRepository.Create(value)
}

func (r *UserRepositoryImpl) GetAll(result *[]domainObject.User) error {
	return r.GormRepository.GetAll(result)
}

func (r *UserRepositoryImpl) GetByID(id string) (domainObject.User, error) {
	var user domainObject.User
	err := r.GormRepository.GetByUUID(id, &user)
	return user, err
}

func (r *UserRepositoryImpl) GetByField(field string, value string, store *[]domainObject.User) error {
	return r.GormRepository.GetByField(field, value, store)
}

func (r *UserRepositoryImpl) Update(id string, value *domainObject.User) error {
	return r.GormRepository.UpdateByUUID(id, value)
}

func (r *UserRepositoryImpl) Delete(id string) error {
	var model domainObject.User
	return r.GormRepository.DeleteByUUID(id, &model)
}
