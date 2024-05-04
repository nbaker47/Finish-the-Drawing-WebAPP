package controller

import (
	"api/internal/domain/domainObject"
	"api/internal/domain/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	UserService service.UserService
}

// INIT
func NewUserController(userService *service.UserService) *UserController {
	return &UserController{
		UserService: *userService,
	}
}

// CREATE USER
// @Summary Create user
// @Description Create user
// @Tags Users
// @Accept json
// @Produce json
// @Param user body domainObject.UserRequest true "User object"
// @Success 201 {object} map[string]interface{}
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /users [post]
func (h *UserController) CreateUser(c *gin.Context) {
	userReq := &domainObject.UserRequest{}
	// Bind the request body to the user struct
	if err := c.ShouldBindJSON(userReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Call the service to create the user
	user, err := h.UserService.Create(userReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Bind the user to the response struct
	userResponse := domainObject.ConvertToUserResponse(user)
	// Return the response
	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully", "user": userResponse})
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
func (h *UserController) GetAllUsers(c *gin.Context) {
	usersP, err := h.UserService.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Bind the users to the response struct
	var usersResponse []domainObject.UserResponse
	for _, user := range *usersP {
		usersResponse = append(usersResponse, domainObject.ConvertToUserResponse(user))
	}
	c.JSON(http.StatusOK, usersResponse)
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
func (h *UserController) GetUser(c *gin.Context) {
	userID := c.Param("id")
	user, err := h.UserService.GetByID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Bind the user to the response struct
	userResponse := domainObject.ConvertToUserResponse(user)
	c.JSON(http.StatusOK, userResponse)
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
func (h *UserController) UpdateUser(c *gin.Context) {
	userID := c.Param("id")
	var updatedUser domainObject.User
	// Bind the request body to the user struct
	if err := c.ShouldBindJSON(&updatedUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// update via service
	err := h.UserService.Update(userID, &updatedUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Bind the user to the response struct
	userResponse := domainObject.ConvertToUserResponse(updatedUser)
	c.JSON(http.StatusOK, gin.H{"message": "User updated successfully", "user": userResponse})
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
func (h *UserController) DeleteUser(c *gin.Context) {
	userID := c.Param("id")
	err := h.UserService.Delete(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
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
func (h *UserController) GetHallOfFame(c *gin.Context) {
	hallOfFame, err := h.UserService.GetHallOfFame()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Bind the users to the response struct
	var hallOfFameResponse []domainObject.UserResponse
	for _, user := range hallOfFame {
		hallOfFameResponse = append(hallOfFameResponse, domainObject.ConvertToUserResponse(user))
	}
	c.JSON(http.StatusOK, hallOfFameResponse)
}
