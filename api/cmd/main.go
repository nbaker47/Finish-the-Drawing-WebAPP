package main

import (
	"api/pkg/handler"
	"api/pkg/model"
	"api/pkg/service"
	"fmt"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func init() {
	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&model.User{})
	DB = database
}

func main() {

	// Gin
	r := gin.Default()

	// services
	userService := service.NewUserService(DB)
	drawingService := service.NewDrawingService(DB)

	// Handlers
	drawingHandler := handler.NewDrawingHandler(drawingService)
	userHandler := handler.NewUserHandler(userService)

	// Register routes
	userHandler.RegisterRoutes(r)
	drawingHandler.RegisterRoutes(r)

	// Start the server
	err := r.Run(":8080")
	if err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
