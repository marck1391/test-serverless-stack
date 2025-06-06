#!/bin/bash

# Set environment variables with defaults if not provided
MARIADB_CONTAINER_NAME="${MARIADB_CONTAINER_NAME:-mariadb-container}"
MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD:-rootpassword}"
MYSQL_DATABASE="${MYSQL_DATABASE:-app_db}"
MYSQL_USER="${MYSQL_USER:-root}"
MYSQL_PASSWORD="${MYSQL_PASSWORD:-rootpassword}"
MARIADB_PORT="${MARIADB_PORT:-3306}"

docker run \
    --name "$MARIADB_CONTAINER_NAME" \
    -e MYSQL_ROOT_PASSWORD="$MYSQL_ROOT_PASSWORD" \
    -e MYSQL_DATABASE="$MYSQL_DATABASE" \
    -e MYSQL_USER="$MYSQL_USER" \
    -e MYSQL_PASSWORD="$MYSQL_PASSWORD" \
    -p "$MARIADB_PORT":3306 \
    -d mariadb:latest