# Pull code
cd ~/apps/prod-adv-tickets-backend
git checkout master
git pull origin master

# Build and deploy
yarn install
yarn run build
yarn typeorm migration:run -- -d ormdatasource.ts
pm2 startOrRestart ecosystem.config.js --only prod-adv-tickets-backend
