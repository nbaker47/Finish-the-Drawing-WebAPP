package interfaces

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GetGormDBConnection() *gorm.DB {
	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}
	return database
}
