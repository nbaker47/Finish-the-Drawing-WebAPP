package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"

	"fmt"
)

type FTD struct {
	gorm.Model
	Name  string
	Value string
}

var db *gorm.DB

func init() {
	var err error
	db, err = gorm.Open("sqlite3", "ftd.db")
	if err != nil {
		fmt.Println("Failed to connect to database")
		panic("Failed to connect to database")
	}

	db.AutoMigrate(&FTD{})
}

func main() {
	router := gin.Default()

	router.GET("/ftd/:name", func(c *gin.Context) {
		var ftd FTD
		name := c.Params.ByName("name")
		if err := db.Where("name = ?", name).First(&ftd).Error; err != nil {
			c.AbortWithStatus(404)
			fmt.Println(err)
		} else {
			c.JSON(200, ftd)
		}
	})

	router.Run(":8080")
}
