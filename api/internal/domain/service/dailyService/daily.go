package dailyService

import (
	"fmt"
	"math/rand"
	"time"

	"api/internal/domain/domainObject"
	"api/internal/domain/repository"
)

type DailyService interface {
	GetRandomWord() string
	GetToday() (domainObject.Daily, error)
	Create() error
	GetTodaysDate() time.Time
}

// IMPLEMENTATION
type DailyServiceImpl struct {
	repo repository.DailyRepository
}

// INIT
func NewDailyService(repo repository.DailyRepository) *DailyServiceImpl {
	return &DailyServiceImpl{
		repo: repo,
	}
}

// METHODS :

func (s *DailyServiceImpl) GetRandomWord() string {
	return words[rand.Intn(len(words))]
}

// private, get the date today
func (s *DailyServiceImpl) GetTodaysDate() time.Time {
	// find todays date
	todaysDate := time.Now()
	year, month, day := todaysDate.Date()
	todaysDate = time.Date(year, month, day, 0, 0, 0, 0, todaysDate.Location())
	return todaysDate
}

// GET Todays Daily
func (s *DailyServiceImpl) GetToday() (domainObject.Daily, error) {
	todaysDate := s.GetTodaysDate()
	// get the daily, whose date is todays date
	daily, err := s.repo.GetByDate(todaysDate)
	if err != nil {
		return domainObject.Daily{}, err

	}
	return daily, nil
}

// CREATE DAILY
func (s *DailyServiceImpl) Create() error {
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
	randomWord := s.GetRandomWord()
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
