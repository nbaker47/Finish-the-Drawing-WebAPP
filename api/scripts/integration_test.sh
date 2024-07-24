# /bin/bash

cd ..

# Start the server in the background
make run-clean &
# Save the PID of the server process
SERVER_PID=$!
# Wait for the server to start
sleep 1




# Once the tests are done, kill the server process
kill $SERVER_PID