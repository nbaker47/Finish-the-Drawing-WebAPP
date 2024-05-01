.PHONY: test build clean

build:
	go build -o bin/ftd_api cmd/main.go

run:
	go run main.go

test:
	go test ./...

clean:
	go clean
	rm -f bin/ftd_api