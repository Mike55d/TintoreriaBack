module.exports = {
  apps: [
    {
      script: './dist/main.js',
      name: 'prod-adv-tickets-backend',
      exec_mode: 'cluster',
      instances: '1',
      env: {
        NODE_ENV: 'prod'
      }
    }
  ]
};
