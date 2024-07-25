#!/bin/bash

# Function to tear down the servers
teardown() {
    echo "Tearing down servers..."
    pkill -P $SERVER_PID
    pkill -P $FRONTEND_PID
    exit
}

# Catch SIGINT and SIGHUP signals and call the teardown function
trap teardown SIGINT SIGHUP

cd api
go run main.go &
# Save the PID of the server process
SERVER_PID=$!

cd ../frontend
yarn dev &
# Save the PID of the server process
FRONTEND_PID=$!

# Wait indefinitely
while true; do sleep 1; done