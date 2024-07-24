package gormInterface

import "gorm.io/gorm"

// UPDATE
func UpdateByUUID(DB *gorm.DB, id string, model interface{}) error {
	return DB.Model(model).Where("uuid = ?", id).Updates(model).Error
}

// DELETE
func DeleteByUUID(DB *gorm.DB, id string, model interface{}) error {
	return DB.Delete(&model, "uuid = ?", id).Error
}

// GET BY UUID
func GetByUUID(DB *gorm.DB, id string, model interface{}) error {
	return DB.Where("uuid = ?", id).First(&model).Error
}

// GET BY FIELD
func GetByField(DB *gorm.DB, field string, value string, model interface{}) error {
	return DB.Where(field+" = ?", value).First(&model).Error
}

// GET ALL
func GetAll(DB *gorm.DB, result interface{}) error {
	return DB.Find(result).Error
}

// CREATE
func Create(DB *gorm.DB, model interface{}) error {
	return DB.Create(model).Error
}
