#!/bin/bash

# Navigate to your project directory
cd /root/github-progress-tracking

# Pull latest changes
git pull origin main 

# Install any new dependencies
npm install

# Restart PM2 process
pm2 restart github-project-tracker