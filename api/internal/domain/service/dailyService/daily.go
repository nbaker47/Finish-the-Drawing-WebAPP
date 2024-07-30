package dailyService

import (
	"fmt"
	"math"
	"math/rand"
	"time"

	"api/internal/domain/domainObject"
	"api/internal/domain/repository"
)

type DailyService interface {
	GetRandomWord() string
	GetToday() (domainObject.Daily, error)
	// Create() error
	GetTodaysDate() time.Time
	GetRandomLines(canvasWidth int, canvasHeight int) ([][][]float64, error)
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

func (s *DailyServiceImpl) GetRandomLines(canvasWidth int, canvasHeight int) ([][][]float64, error) {

	getSeed := func() (int, error) {
		// is there a daily for today?
		todaysDaily, err := s.GetToday()
		if err != nil {
			return 0, err
		}
		seed := todaysDaily.Seed
		return seed, nil
	}

	jumbleUp := func(seed int) (int, error) {
		x := math.Sin(float64(seed)) * 10000
		return int(x - math.Floor(x)), nil
	}

	// generate 7 lines
	randomLines := [][][]float64{}
	for i := 0; i < 7; i++ {

		// HYPER PARAMS
		// line segments (500 points)
		n := 500
		// aperture parameter (variation in angle per segment)
		a := 0.1
		// stay within 0.7 of the canvas boundary
		boundaryRange := 0.7
		// min length of line segment
		minLength := float64(min(canvasWidth, canvasHeight)) * 0.3

		// CANVAS PARAMS
		centerX := float64(canvasWidth) / 2
		centerY := float64(canvasHeight) / 2
		boundaryWidth := float64(canvasWidth) * boundaryRange
		boundaryHeight := float64(canvasHeight) * boundaryRange

		// get today's seed
		seed, err := getSeed()
		if err != nil {
			return nil, err
		}
		// get random x and y start pos based on seed
		xSeed := int(i) * seed
		ySeed := int(i) * seed * 2
		xSeed, err = jumbleUp(xSeed)
		if err != nil {
			return nil, err
		}
		ySeed, err = jumbleUp(ySeed)
		if err != nil {
			return nil, err
		}
		x := centerX - boundaryWidth/2 + float64(xSeed)*boundaryWidth
		y := centerY - boundaryHeight/2 + float64(ySeed)*boundaryHeight

		angle := 0.0
		lineLength := 0.0

		linePoints := [][]float64{}
		for k := 1; k <= n; k++ {
			randomizedPoint, err := jumbleUp((i * seed) * 3)
			if err != nil {
				return nil, err
			}
			angleVariation := float64(2*randomizedPoint-1) * a * math.Pi
			angle += angleVariation

			maxDistanceX := min(boundaryWidth/2-math.Abs(x-centerX), boundaryWidth/2)
			maxDistanceY := min(boundaryHeight/2-math.Abs(y-centerY), boundaryHeight/2)

			maxLength := min(maxDistanceX, maxDistanceY)

			remainingLength := minLength - lineLength
			randomizedPoint, err = jumbleUp((i * seed) * 4)
			if err != nil {
				return nil, err
			}
			r := min(remainingLength, float64(randomizedPoint)*maxLength)

			x += r * math.Cos(angle)
			y += r * math.Sin(angle)

			lineLength += r

			linePoints = append(linePoints, []float64{x, y})

			if lineLength >= minLength {
				break
			}
		}
		randomLines = append(randomLines, linePoints)
	}
	return randomLines, nil
}

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

	// CREATE DAILY
	createDaily := func() error {
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
		err := s.repo.Create(&daily)
		if err != nil {
			return err
		}
		return nil
	}

	todaysDate := s.GetTodaysDate()
	// get the daily, whose date is todays date
	daily, err := s.repo.GetByDate(todaysDate)
	if err != nil {
		err := createDaily()
		if err != nil {
			return domainObject.Daily{}, err
		}
	}
	return daily, nil
}
