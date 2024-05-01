package router

import (
	"api/internal/application/controller"

	"github.com/gin-gonic/gin"
)

func RegisterDrawingRoutes(router *gin.Engine, controller *controller.DrawingController) {
	router.POST("/drawing", controller.CreateDrawing)
	router.GET("/drawing", controller.GetAllDrawings)
	router.GET("/drawing/:id", controller.GetDrawing)
	router.DELETE("/drawing/:id", controller.DeleteDrawing)
	router.POST("/drawing/:id/like", controller.LikeDrawing)
	router.POST("/drawing/:id/dislike", controller.DislikeDrawing)
}
