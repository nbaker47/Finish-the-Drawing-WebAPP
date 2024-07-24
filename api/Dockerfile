# Start from the official Go image which contains all the necessary build tools and libraries
FROM golang:1.22

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Install Swag
RUN go install github.com/swaggo/swag/cmd/swag@latest
# Build the swagger
RUN swag init

RUN go mod download

# Build the Go app
RUN go build -o main .

# This container exposes port 8080 to the outside world
EXPOSE 8080

# Run the binary program produced by `go build`
CMD ["./main"]