module.exports = {
  apps: [
    {
      script: './dist/main.js',
      name: 'qa-alm-backend',
      exec_mode: 'cluster',
      instances: '2',
      env: {
        NODE_ENV: 'qa'
      }
    },
    {
      script: './dist/main.js',
      name: 'dev-alm-backend',
      exec_mode: 'cluster',
      instances: '1',
      env: {
        NODE_ENV: 'prod'
      }
    },
    {
      script: './dist/main.js',
      name: 'prod-alm-backend',
      exec_mode: 'cluster',
      instances: '2',
      env: {
        NODE_ENV: 'prod'
      }
    }
  ]
};
