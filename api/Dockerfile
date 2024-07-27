# Stage 1: Build the application
FROM golang:1.23rc2-bullseye AS builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Install Swag
RUN go install github.com/swaggo/swag/cmd/swag@latest

# Build the swagger
RUN swag init

# Build the Go app (note: CGO is enabled by default)
RUN go build -o main .

###

# Stage 2: Create the final image
FROM debian:buster-slim

# Install necessary libraries
RUN apt-get update && \
    apt-get install -y \
    ca-certificates &&\
    rm -rf /var/lib/apt/lists/*
    
WORKDIR /app

# Copy the pre-built binary file from the previous stage
COPY --from=builder /app/main .

# This container exposes port 8080 to the outside world
EXPOSE 8080

# Run the binary program produced by `go build`
CMD ["./main"]