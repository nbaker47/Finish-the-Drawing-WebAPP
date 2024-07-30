package router

import (
	"api/internal/application/controller"

	"github.com/gin-gonic/gin"
)

func RegisterDailyRoutes(router *gin.Engine, controller *controller.DailyController) {
	router.GET("/daily", controller.GetToday)
	router.GET("/daily/random-lines", controller.GetTodaysRandomLines)
}
