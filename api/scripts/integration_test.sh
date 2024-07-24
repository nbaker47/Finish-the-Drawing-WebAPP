#!/bin/bash

set -e

# Start the server in the background
cd api
rm test.db
go run main.go &
# Save the PID of the server process
SERVER_PID=$!
# Wait for the server to start
sleep 1

# Run the tests
/bin/python3 scripts/test_user.py
/bin/python3 scripts/test_daily.py
/bin/python3 scripts/test_drawing.py

# Once the tests are done, kill the server process and its child processes
pkill -P $SERVER_PID