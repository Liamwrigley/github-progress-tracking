#!/bin/bash

# Navigate to your project directory
cd /root/github-progress-tracking

# Pull latest changes
git pull origin main 

# Install dependencies for the root (if any)
npm install

# Navigate to api directory and install its dependencies
cd api
npm install
cd ..

# Navigate to ui directory and install its dependencies
cd ui
npm install
npm run build
cd ..

# Restart PM2 process
pm2 restart github-project-tracker