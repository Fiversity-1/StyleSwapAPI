#!/bin/bash

KEY=$(openssl rand -hex 32)
IV=$(openssl rand -hex 16)

echo -e "KEY=${KEY}\nIV=${IV}" > .env

echo "Key and IV generated and saved to .env file"

