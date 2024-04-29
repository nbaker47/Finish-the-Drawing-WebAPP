package handler

import (
	"api/internal/domain/domainObject"
	"api/internal/domain/service"
	"api/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DrawingHandler struct {
	DrawingService service.DrawingService
}

// INIT
func NewDrawingHandler(drawingService *service.DrawingService) *DrawingHandler {
	return &DrawingHandler{
		DrawingService: *drawingService,
	}
}

// ROUTER
func (h *DrawingHandler) RegisterRoutes(router *gin.Engine) {
	router.POST("/drawing", h.createDrawing)
	router.GET("/drawing", h.getAllDrawings)
	router.GET("/drawing/:id", h.GetDrawing)
	router.DELETE("/drawing/:id", h.DeleteDrawing)
	router.POST("/drawing/:id/like", h.LikeDrawing)
	router.POST("/drawing/:id/dislike", h.DislikeDrawing)
}

// HANDLERS:

// CREATE DRAWING
func (h *DrawingHandler) createDrawing(c *gin.Context) {
	var drawing domainObject.Drawing
	// Bind the request body to the drawing struct
	if err := c.ShouldBindJSON(&drawing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Call the service to create the drawing
	err := h.DrawingService.Create(&drawing)
	util.HandleGinError(c, err)
	// Return the response
	c.JSON(http.StatusCreated, drawing.ID)
}

// GET ALL DRAWINGS
func (h *DrawingHandler) getAllDrawings(c *gin.Context) {
	drawings, err := h.DrawingService.GetAll()
	util.HandleGinError(c, err)
	c.JSON(http.StatusOK, drawings)
}

// GET DRAWING BY ID
func (h *DrawingHandler) GetDrawing(c *gin.Context) {
	id := c.Param("id")
	drawing, err := h.DrawingService.GetByID(id)
	util.HandleGinError(c, err)
	c.JSON(http.StatusOK, drawing)
}

// DELETE DRAWING
func (h *DrawingHandler) DeleteDrawing(c *gin.Context) {
	id := c.Param("id")
	err := h.DrawingService.Delete(id)
	util.HandleGinError(c, err)
	c.JSON(http.StatusOK, gin.H{"status": "success"})
}

// Like
func (h *DrawingHandler) LikeDrawing(c *gin.Context) {
	id := c.Param("id")
	err := h.DrawingService.Like(id)
	util.HandleGinError(c, err)
	c.JSON(http.StatusOK, gin.H{"status": "success"})
}

// Dislike
func (h *DrawingHandler) DislikeDrawing(c *gin.Context) {
	id := c.Param("id")
	err := h.DrawingService.Dislike(id)
	util.HandleGinError(c, err)
	c.JSON(http.StatusOK, gin.H{"status": "success"})
}
