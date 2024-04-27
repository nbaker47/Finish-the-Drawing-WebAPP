package util

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// HandleError is a helper function to handle errors
func HandleError(c *gin.Context, err error) {
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
}
