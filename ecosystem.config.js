const dotenv = require("dotenv");
dotenv.config();

const PROJECT_NAME = process.env.PROJECT_NAME || "proj";
const MODE = process.env.MODE || "stag";
const PORT = process.env.PORT || 8001;

module.exports = {
  apps: [
    {
      name: `${PROJECT_NAME}-${MODE}`,
      script: "yarn start",
      env: {
        PORT,
        NODE_ENV: "production",
      },
      autorestart: true,
      error_file: "./logs/pm2/error.log",
      out_file: "./logs/pm2/out.log",
      log_file: "./logs/pm2/combined.log",
      time: true,
      interpreter: "none",
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "1G",
      exp_backoff_restart_delay: 100,
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env_production: {
        NODE_ENV: "production",
        PORT,
      },
    },
    {
      name: `${PROJECT_NAME}-${MODE}-cronjob`,
      script: "./scripts/cronjob.sh",
      cron_restart: "*/10 * * * *",
      autorestart: false,
    },
  ],
  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "yarn install && yarn build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
