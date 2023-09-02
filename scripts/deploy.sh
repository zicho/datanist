#!/bin/bash

# Change into the target directory
cd ..

# Run "npm run build" inside the target directory
npm run build

# Change into the "dist" directory
cd dist/

# Run the lftp command to upload files to the remote server
lftp --env-password sftp://deployment_user@192.168.0.100/var/www/html -e "mirror -R; bye"
