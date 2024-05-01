package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler interface {
	RegisterRoutes(router *gin.Engine)
}

func HandleGinError(c *gin.Context, err error) {
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
}
