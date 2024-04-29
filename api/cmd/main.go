package main

import (
	"api/internal/application/handler"

	"api/internal/domain/domainObject"
	"api/internal/domain/service"

	"api/internal/infra/interfaces"

	"fmt"

	"github.com/gin-gonic/gin"
)

func init() {
	// migrate the schema
	database := interfaces.GetGormDBConnection()
	database.AutoMigrate(&domainObject.User{})
}

func main() {

	// Gin
	r := gin.Default()

	// services
	userService := service.NewUserService()
	drawingService := service.NewDrawingService()

	// Handlers
	handlers := []handler.Handler{
		handler.NewUserHandler(userService),
		handler.NewDrawingHandler(drawingService),
	}

	// Register routes
	for _, h := range handlers {
		h.RegisterRoutes(r)
	}

	// Start the server
	err := r.Run(":8080")
	if err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
