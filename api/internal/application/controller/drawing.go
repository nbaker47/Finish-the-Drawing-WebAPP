package controller

import (
	"api/internal/domain/domainObject"
	"api/internal/domain/service/drawingService"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type DrawingController struct {
	DrawingService drawingService.DrawingService
}

// INIT
func NewDrawingController(drawingService *drawingService.DrawingService) *DrawingController {
	return &DrawingController{
		DrawingService: *drawingService,
	}
}

// CREATE DRAWING
// @Summary Create a new drawing object
// @Description Create a new drawing object with the given data
// @Tags Drawing
// @ID create-drawing
// @Accept  json
// @Produce  json
// @Param drawing body domainObject.DrawingRequest true "Drawing object"
// @Success 201 {object} domainObject.Drawing
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /drawing [post]
func (h *DrawingController) CreateDrawing(c *gin.Context) {
	var drawingReq domainObject.DrawingRequest
	Create(c, &drawingReq, h.DrawingService.Create)
}

// GET ALL DRAWINGS
// @Summary Get all drawings
// @Description Get all drawings
// @Tags Drawing
// @ID get-all-drawings
// @Produce  json
// @Success 200 {array} domainObject.Drawing
// @Failure 500 {object} map[string]interface{}
// @Router /drawing [get]
func (h *DrawingController) GetAllDrawings(c *gin.Context) {
	GetAll(c, h.DrawingService.GetAll)
}

// GET DRAWING BY ID
// @Summary Get a drawing by ID
// @Description Get a drawing by its ID
// @Tags Drawing
// @ID get-drawing-by-id
// @Produce json
// @Param id path string true "Drawing ID"
// @Success 200 {object} domainObject.Drawing
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /drawing/{id} [get]
func (h *DrawingController) GetDrawing(c *gin.Context) {
	GetByID(c, h.DrawingService.GetByID)
}

// DELETE DRAWING
// @Summary Delete a drawing
// @Description Delete a drawing by its ID
// @Tags Drawing
// @ID delete-drawing
// @Param id path string true "Drawing ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /drawing/{id} [delete]
func (h *DrawingController) DeleteDrawing(c *gin.Context) {
	Delete(c, h.DrawingService.Delete)
}

// Like
// @Summary Like a drawing
// @Description Like a drawing by its ID
// @Tags Drawing
// @ID like-drawing
// @Param id path string true "Drawing ID"
// @Param user body uint true "User ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /drawing/{id}/like [post]
func (h *DrawingController) LikeDrawing(c *gin.Context) {
	id := c.Param("id")
	var userID uint
	if err := c.ShouldBindJSON(&userID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	userIDStr := strconv.FormatUint(uint64(userID), 10)
	err := h.DrawingService.Like(id, userIDStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "success"})
}

// Dislike
// @Summary Dislike a drawing
// @Description Dislike a drawing by its ID
// @Tags Drawing
// @ID dislike-drawing
// @Param id path string true "Drawing ID"
// @Param user body uint true "User ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /drawing/{id}/dislike [post]
func (h *DrawingController) DislikeDrawing(c *gin.Context) {
	id := c.Param("id")
	var userID uint
	if err := c.ShouldBindJSON(&userID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	userIDStr := strconv.FormatUint(uint64(userID), 10)
	err := h.DrawingService.Dislike(id, userIDStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "success"})
}
