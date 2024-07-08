#!/bin/bash

# 경로 설정
BUILD_DIR="/home/ubuntu/build"
DEPLOY_DIR="/home/ubuntu/solcast-frontend"

# 기존 애플리케이션 종료
echo "Stopping existing application..."
pkill -f "node" || true

# 배포 디렉토리 초기화
echo "Removing existing build..."
sudo rm -rf ${DEPLOY_DIR}/*

# 새로운 빌드를 배포 디렉토리로 복사
echo "Copying new build to ${DEPLOY_DIR}..."
sudo cp -r ${BUILD_DIR}/* ${DEPLOY_DIR}/

# 배포 디렉토리로 이동
cd ${DEPLOY_DIR}

# npm install (필요한 경우)
echo "Installing dependencies..."
sudo npm install

# 애플리케이션 시작
echo "Starting application..."
nohup npm start &

echo "Deployment completed."

