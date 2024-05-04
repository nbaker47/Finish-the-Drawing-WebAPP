package controller

import (
	"api/internal/domain/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DailyController struct {
	DailyService service.DailyService
}

// INIT
func NewDailyController(dailyService *service.DailyService) *DailyController {
	return &DailyController{
		DailyService: *dailyService,
	}
}

// GET TODAY's DAILY
// @Summary Get the seed and word of today
// @Description Get the seed and word of today
// @Tags Daily
// @ID get-today-daily
// @Produce  json
// @Success 200 {object} domainObject.Daily
// @Failure 500 {object} map[string]interface{}
// @Router /daily [get]
func (h *DailyController) GetToday(c *gin.Context) {
	daily, err := h.DailyService.GetToday()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, daily)
}
