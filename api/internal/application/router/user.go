package router

import (
	"api/internal/application/controller"

	"github.com/gin-gonic/gin"
)

func RegisterUserRoutes(router *gin.Engine, controller *controller.UserController) {
	router.POST("/users", controller.CreateUser)
	router.GET("/users", controller.GetAllUsers)
	router.GET("/users/hall-of-fame", controller.GetHallOfFame)
	router.GET("/users/:id", controller.GetUser)
	router.PATCH("/users/:id", controller.UpdateUser)
	router.DELETE("/users/:id", controller.DeleteUser)
}
