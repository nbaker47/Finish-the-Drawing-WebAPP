package service

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/Pallinder/go-randomdata"

	"api/internal/domain/domainObject"
	"api/internal/domain/repository"
)

// IMPLEMENTATION
type DailyService struct {
	repo repository.DailyRepository
}

// INIT
func NewDailyService(repo repository.DailyRepository) *DailyService {
	return &DailyService{
		repo: repo,
	}
}

// METHODS :

// private, get the date today
func (s *DailyService) GetTodaysDate() time.Time {
	// find todays date
	todaysDate := time.Now()
	year, month, day := todaysDate.Date()
	todaysDate = time.Date(year, month, day, 0, 0, 0, 0, todaysDate.Location())
	return todaysDate
}

// GET Todays Daily
func (s *DailyService) GetToday() (domainObject.Daily, error) {
	todaysDate := s.GetTodaysDate()
	// get the daily, whose date is todays date
	daily, err := s.repo.GetByDate(todaysDate)
	if err != nil {
		return domainObject.Daily{}, err

	}
	return daily, nil
}

// CREATE DAILY
func (s *DailyService) Create() error {
	// is there a daily for today?
	_, err := s.GetToday()
	if err == nil {
		return nil
	}
	// if an error occurred, there isn't a daily yet.

	// set the date
	todaysDate := s.GetTodaysDate()
	// set the seed
	seed := rand.Intn(1000)
	// generate a random word
	randomWord := randomdata.SillyName()
	// print
	fmt.Println(randomWord, seed, todaysDate)

	// create the domain object
	daily := domainObject.CreateDaily(todaysDate, seed, randomWord)

	// call repo to effect DB
	err = s.repo.Create(&daily)
	if err != nil {
		return err
	}
	return nil
}
