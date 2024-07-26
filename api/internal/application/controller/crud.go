package controller

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func handleError(c *gin.Context, err error) {
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
}

func Create[A any, B any](
	c *gin.Context,
	req A,
	createFunc func(req A) (B, error)) {

	if err := c.ShouldBindJSON(req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result, err := createFunc(req)
	if err != nil {
		handleError(c, err)
		return
	}
	c.JSON(http.StatusCreated, result)
}

func GetAll[A any](c *gin.Context, getAllFunc func(*[]A) error, store *[]A) {
	err := getAllFunc(store)
	if err != nil {
		handleError(c, err)
		return
	}
	c.JSON(http.StatusOK, *store)
}

func GetByID[T any](c *gin.Context, getByIDFunc func(id string) (T, error)) {
	id := c.Param("id")
	result, err := getByIDFunc(id)
	if err != nil {
		handleError(c, err)
		return
	}
	c.JSON(http.StatusOK, result)
}

func Delete(c *gin.Context, deleteFunc func(id string) error) {
	id := c.Param("id")
	err := deleteFunc(id)
	if err != nil {
		handleError(c, err)
		return
	}
	c.JSON(http.StatusNoContent, gin.H{"status": "success"})
}
