#!/bin/bash

DEPLOY_SERVER=$DEPLOY_SERVER

echo "Deploying to ${DEPLOY_SERVER}"
ssh root@${DEPLOY_SERVER} -p 3779 'bash' < ./deploy/server.dev.sh