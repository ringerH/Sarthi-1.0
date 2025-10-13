#!/bin/bash

# This script automates the file and directory setup for the auth-service migration.
# It performs three main tasks:
# 1. Creates the new directory structure for the microservices.
# 2. Copies the relevant authentication files from the monolith to the new service.
# 3. Creates the necessary new (empty) files you will populate later.

echo "🚀 Starting migration scaffolding..."
echo "-------------------------------------"

# Step 1: Create the new directory structure
echo "[1/3] Creating directories..."
mkdir -p services/api-gateway
mkdir -p services/auth-service/models
mkdir -p services/auth-service/routes
mkdir -p services/auth-service/controllers
echo "      Done."

# Step 2: Copy existing auth files from the backend monolith
echo "[2/3] Copying auth files from ./backend ..."
# Note: Using 'cp' is safer than 'mv'. You can delete the old files manually later.
# The script will warn you if a source file is not found.
if [ -f "backend/models/userModel.js" ]; then
    cp backend/models/userModel.js services/auth-service/models/
    echo "      - Copied userModel.js"
else
    echo "      - WARNING: 'backend/models/userModel.js' not found. Skipped."
fi

if [ -f "backend/routes/authRoutes.js" ]; then
    cp backend/routes/authRoutes.js services/auth-service/routes/
    echo "      - Copied authRoutes.js"
else
    echo "      - WARNING: 'backend/routes/authRoutes.js' not found. Skipped."
fi

if [ -f "backend/controllers/authController.js" ]; then
    cp backend/controllers/authController.js services/auth-service/controllers/
    echo "      - Copied authController.js"
else
    echo "      - WARNING: 'backend/controllers/authController.js' not found. Skipped."
fi
echo "      Done."

# Step 3: Create all the new, empty files that need to be populated
echo "[3/3] Creating placeholder files..."
touch docker-compose.yml \
      services/api-gateway/package.json \
      services/api-gateway/gateway.js \
      services/api-gateway/Dockerfile \
      services/auth-service/package.json \
      services/auth-service/server.js \
      services/auth-service/.env \
      services/auth-service/Dockerfile \
      backend/Dockerfile
echo "      Done."

echo "-------------------------------------"
echo "✅ Scaffolding complete. The file structure is ready for your code."