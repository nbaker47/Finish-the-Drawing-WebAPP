package handler

import (
	"api/pkg/model"
	"api/pkg/service"
	"api/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	UserService service.UserService
}

// INIT
func NewUserHandler(userService *service.UserService) *UserHandler {
	return &UserHandler{
		UserService: *userService,
	}
}

// ROUTER
func (h *UserHandler) RegisterRoutes(router *gin.Engine) {
	router.POST("/users", h.createUser)
	router.GET("/users", h.getAllUsers)
	router.GET("/users/hall-of-fame", h.getHallOfFame)
	router.GET("/users/:id", h.getUser)
	router.PATCH("/users/:id", h.updateUser)
	router.DELETE("/users/:id", h.deleteUser)
}

// HANDLERS:

// CREATE USER
func (h *UserHandler) createUser(c *gin.Context) {
	var user model.User
	// Bind the request body to the user struct
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Call the service to create the user
	err := h.UserService.Create(&user)
	util.HandleError(c, err)
	// Return the response
	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully"})
}

// GET ALL USERS
func (h *UserHandler) getAllUsers(c *gin.Context) {
	users, err := h.UserService.GetAll()
	util.HandleError(c, err)
	c.JSON(http.StatusOK, users)
}

// GET USER BY ID
func (h *UserHandler) getUser(c *gin.Context) {
	userID := c.Param("id")
	user, err := h.UserService.GetByID(userID)
	util.HandleError(c, err)
	c.JSON(http.StatusOK, user)
}

// UPDATE USER
func (h *UserHandler) updateUser(c *gin.Context) {
	//userID := c.Param("id")
	var updatedUser model.User
	// Bind the request body to the user struct
	if err := c.ShouldBindJSON(&updatedUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// update via service
	err := h.UserService.Update(&updatedUser)
	util.HandleError(c, err)
	// return response
	c.JSON(http.StatusOK, updatedUser)
}

// DELETE USER
func (h *UserHandler) deleteUser(c *gin.Context) {
	userID := c.Param("id")
	err := h.UserService.Delete(userID)
	util.HandleError(c, err)
	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

// GET HALL OF FAMERS
func (h *UserHandler) getHallOfFame(c *gin.Context) {
	hallOfFame, err := h.UserService.GetHallOfFame()
	util.HandleError(c, err)
	c.JSON(http.StatusOK, hallOfFame)
}
