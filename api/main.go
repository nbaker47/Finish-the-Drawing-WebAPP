package main

import (
	"api/internal/application/controller"
	"api/internal/application/router"
	"api/internal/domain/domainObject"
	"api/internal/domain/service"
	"api/internal/infra/interfacer"
	"api/internal/infra/repositoryImpl"

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

	// repo impl
	userRepoImpl := repositoryImpl.NewGenericRepository[domainObject.User]()
	drawingRepoImpl := repositoryImpl.NewGenericRepository[domainObject.Drawing]()

	// services
	userService := service.NewUserService(userRepoImpl)
	drawingService := service.NewDrawingService(drawingRepoImpl)

	// controllers
	userController := controller.NewUserController(userService)
	drawingController := controller.NewDrawingController(drawingService)

	// routers
	router.RegisterUserRoutes(r, userController)
	router.RegisterDrawingRoutes(r, drawingController)

	// Swagger
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Start the server
	err := r.Run(":8080")
	if err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
