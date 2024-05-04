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
	database.AutoMigrate(&domainObject.Daily{})
	database.AutoMigrate(&domainObject.User{})
	database.AutoMigrate(&domainObject.Drawing{})
}

// @title	Finish the Drawing API
func main() {

	// Gin
	r := gin.Default()

	// repo impl
	dailyRepository := repositoryImpl.NewDailyRepository()
	userRepoImpl := repositoryImpl.NewUserRepository()
	drawingRepoImpl := repositoryImpl.NewDrawingRepository()

	// services
	dailyService := service.NewDailyService(dailyRepository)
	userService := service.NewUserService(userRepoImpl)
	drawingService := service.NewDrawingService(drawingRepoImpl, userRepoImpl, *dailyService)

	// controllers
	dailyController := controller.NewDailyController(dailyService)
	userController := controller.NewUserController(userService)
	drawingController := controller.NewDrawingController(drawingService)

	// routers
	router.RegisterDailyRoutes(r, dailyController)
	router.RegisterUserRoutes(r, userController)
	router.RegisterDrawingRoutes(r, drawingController)

	// Swagger
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Generate the daily
	dailyService.Create()

	// Start the server
	err := r.Run(":8080")
	if err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
