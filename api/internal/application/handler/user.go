package handler

import (
	"api/internal/domain/domainObject"
	"api/internal/domain/service"
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
	var user domainObject.User
	// Bind the request body to the user struct
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Call the service to create the user
	err := h.UserService.Create(&user)
	HandleGinError(c, err)
	// Return the response
	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully"})
}

// GET ALL USERS
// @Summary Get all users
// @Description Get all users
// @Tags Users
// @Accept json
// @Produce json
// @Success 200 {object} []domainObject.User
// @Failure 500 {object} map[string]interface{}
// @Router /users [get]
func (h *UserHandler) getAllUsers(c *gin.Context) {
	users, err := h.UserService.GetAll()
	HandleGinError(c, err)
	c.JSON(http.StatusOK, users)
}

// GET USER BY ID
// @Summary Get user by ID
// @Description Get user by ID
// @Tags Users
// @Accept json
// @Produce json
// @Param id path string true "User ID"
// @Success 200 {object} domainObject.User
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /users/{id} [get]
func (h *UserHandler) getUser(c *gin.Context) {
	userID := c.Param("id")
	user, err := h.UserService.GetByID(userID)
	HandleGinError(c, err)
	c.JSON(http.StatusOK, user)
}

// UPDATE USER
// @Summary Update user
// @Description Update user
// @Tags Users
// @Accept json
// @Produce json
// @Param id path string true "User ID"
// @Param user body domainObject.User true "User object"
// @Success 200 {object} domainObject.User
// @Failure 400 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /users/{id} [patch]
func (h *UserHandler) updateUser(c *gin.Context) {
	//userID := c.Param("id")
	var updatedUser domainObject.User
	// Bind the request body to the user struct
	if err := c.ShouldBindJSON(&updatedUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// update via service
	err := h.UserService.Update(&updatedUser)
	HandleGinError(c, err)
	// return response
	c.JSON(http.StatusOK, updatedUser)
}

// DELETE USER
// @Summary Delete user
// @Description Delete user
// @Tags Users
// @Accept json
// @Produce json
// @Param id path string true "User ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /users/{id} [delete]
func (h *UserHandler) deleteUser(c *gin.Context) {
	userID := c.Param("id")
	err := h.UserService.Delete(userID)
	HandleGinError(c, err)
	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

// GET HALL OF FAMERS
// @Summary Get hall of famers
// @Description Get hall of famers
// @Tags Users
// @Accept json
// @Produce json
// @Success 200 {object} []domainObject.User
// @Failure 500 {object} map[string]interface{}
// @Router /users/hall-of-fame [get]
func (h *UserHandler) getHallOfFame(c *gin.Context) {
	hallOfFame, err := h.UserService.GetHallOfFame()
	HandleGinError(c, err)
	c.JSON(http.StatusOK, hallOfFame)
}
