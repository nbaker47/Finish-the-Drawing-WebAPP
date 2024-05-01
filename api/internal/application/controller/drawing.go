package controller

import (
	"api/internal/domain/domainObject"
	"api/internal/domain/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DrawingController struct {
	DrawingService service.DrawingService
}

// INIT
func NewDrawingController(drawingService *service.DrawingService) *DrawingController {
	return &DrawingController{
		DrawingService: *drawingService,
	}
}

// CREATE DRAWING
// @Summary Create a new drawing object
// @Description Create a new drawing object with the given data
// @ID create-drawing
// @Accept  json
// @Produce  json
// @Param drawing body domainObject.Drawing true "Drawing object"
// @Success 201 {string} string "ID of the created drawing"
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /drawing [post]
func (h *DrawingController) CreateDrawing(c *gin.Context) {
	var drawing domainObject.Drawing
	// Bind the request body to the drawing struct
	if err := c.ShouldBindJSON(&drawing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Call the service to create the drawing
	err := h.DrawingService.Create(&drawing)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Return the response
	c.JSON(http.StatusCreated, drawing.ID)
}

// GET ALL DRAWINGS
// @Summary Get all drawings
// @Description Get all drawings
// @ID get-all-drawings
// @Produce  json
// @Success 200 {array} domainObject.Drawing
// @Failure 500 {object} map[string]interface{}
// @Router /drawing [get]
func (h *DrawingController) GetAllDrawings(c *gin.Context) {
	drawings, err := h.DrawingService.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, drawings)
}

// GET DRAWING BY ID
// @Summary Get a drawing by ID
// @Description Get a drawing by its ID
// @ID get-drawing-by-id
// @Produce json
// @Param id path string true "Drawing ID"
// @Success 200 {object} domainObject.Drawing
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /drawing/{id} [get]
func (h *DrawingController) GetDrawing(c *gin.Context) {
	id := c.Param("id")
	drawing, err := h.DrawingService.GetByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, drawing)
}

// DELETE DRAWING
// @Summary Delete a drawing
// @Description Delete a drawing by its ID
// @ID delete-drawing
// @Param id path string true "Drawing ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /drawing/{id} [delete]
func (h *DrawingController) DeleteDrawing(c *gin.Context) {
	id := c.Param("id")
	err := h.DrawingService.Delete(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "success"})
}

// Like
// @Summary Like a drawing
// @Description Like a drawing by its ID
// @ID like-drawing
// @Param id path string true "Drawing ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /drawing/{id}/like [post]
func (h *DrawingController) LikeDrawing(c *gin.Context) {
	id := c.Param("id")
	err := h.DrawingService.Like(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "success"})
}

// Dislike
// @Summary Dislike a drawing
// @Description Dislike a drawing by its ID
// @ID dislike-drawing
// @Param id path string true "Drawing ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /drawing/{id}/dislike [post]
func (h *DrawingController) DislikeDrawing(c *gin.Context) {
	id := c.Param("id")
	err := h.DrawingService.Dislike(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "success"})
}
