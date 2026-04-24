module.exports = {
  port: 3000,
  jwt: {
    secret: 'petpal_jwt_secret_key_2026',
    expiresIn: '7d'
  },
  db: {
    host: '127.0.0.1',
    port: 3306,
    username: 'TRAE',
    password: 'TRAE',
    database: 'TRAE',
    dialect: 'mysql',
    logging: false,
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
    define: { charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci', timestamps: true, underscored: true }
  },
  upload: {
    dir: './uploads'
  }
};
