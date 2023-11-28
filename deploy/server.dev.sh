# Pull code
cd ~/apps/dev-alm-backend
git checkout dev
git pull origin dev

# Build and deploy
yarn install
yarn run build
yarn typeorm migration:run -- -d ormdatasource.ts
pm2 startOrRestart ecosystem.config.js --only dev-alm-backend
