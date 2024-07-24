#!/bin/bash
# Get a list of all modified files
files=$(git diff --cached --name-only)

# Check if any of the modified files are Go files
for file in $files
do
  if [[ $file == *.go ]]
  then
    # If a Go file was modified, run the integration tests
    ./api/scripts/integration_test.sh
    exit $?
  fi
done

# If no Go files were modified, exit with a success status code
exit 0