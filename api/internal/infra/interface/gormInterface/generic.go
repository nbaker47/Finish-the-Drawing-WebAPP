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
