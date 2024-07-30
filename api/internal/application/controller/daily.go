package controller

import (
	"api/internal/domain/service/dailyService"
	"strconv"

	"net/http"

	"github.com/gin-gonic/gin"
)

type DailyController struct {
	DailyService dailyService.DailyService
}

// INIT
func NewDailyController(dailyService dailyService.DailyService) *DailyController {
	return &DailyController{
		DailyService: dailyService,
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
	// dailyResponse := domainObject.ConvertToDailyResponse(daily)
	c.JSON(http.StatusOK, daily)
}

// GET TODAY's DAILY RANDOM LINES
// @Summary Get the line array for today
// @DescriptionGet the line array for today (based on todays daily.seed)
// @Tags Daily
// @ID get-today-daily-random-lines
// @Produce json
// @Param canvas-width query int true "Canvas Width"
// @Param canvas-height query int true "Canvas Height"
// @Success 200
// @Failure 500
// @Router /daily/random-lines [get]
func (h *DailyController) GetTodaysRandomLines(c *gin.Context) {
	params := []string{c.Query("canvas-width"), c.Query("canvas-height")}
	var paramsInt []int
	for _, param := range params {
		paramInt, err := strconv.Atoi(param)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "canvas-width and canvas-height must be integers"})
			return
		}
		paramsInt = append(paramsInt, paramInt)
	}

	randomLines, err := h.DailyService.GetRandomLines(paramsInt[0], paramsInt[1])
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, randomLines)
}
