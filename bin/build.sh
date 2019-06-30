#!/usr/bin/env bash

start=`date +%s`

# Empty log file
printf "\nBuild started: $(date)\n\n" > ./bin/build.log

echo "$(tput setaf 4)Running unit tests...$(tput sgr 0)"

# Run tests
jest  >> ./bin/build.log 2>&1

echo "$(tput setaf 2)Unit tests completed successfully.$(tput sgr 0)"

echo $(tput setaf 4)"Compiling...$(tput sgr 0)"

# Build .js files
ENV=dev webpack >> ./bin/build.log 2>&1

# Build .min.js files
ENV=prod webpack  >> ./bin/build.log 2>&1

# Concat files
ENV=dev gulp build  >> ./bin/build.log 2>&1
ENV=prod gulp build  >> ./bin/build.log 2>&1

echo "$(tput setaf 2)Compiled successfully.$(tput sgr 0)"


end=`date +%s`

runtime=$((end-start))

echo "$(tput setaf 0)Build complete. Duration: ${runtime}s.$(tput sgr 0)"

printf "\nBuild finished: $(date)\n" >> ./bin/build.log
echo "Duration: ${runtime}s." >> ./bin/build.log
