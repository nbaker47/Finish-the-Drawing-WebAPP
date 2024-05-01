package main

import (
	"api/internal/application/handler"
	"api/internal/domain/domainObject"
	"api/internal/domain/service"
	"api/internal/infra/interfacer"

	"fmt"

	_ "api/docs"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func init() {
	// migrate the schema
	database := interfacer.GetGormDBConnection()
	database.AutoMigrate(&domainObject.User{})
}

// @title	Finish the Drawing API
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

	// Swagger
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Start the server
	err := r.Run(":8080")
	if err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
