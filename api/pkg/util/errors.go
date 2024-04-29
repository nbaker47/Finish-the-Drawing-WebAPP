package util

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleGinError(c *gin.Context, err error) {
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
}
