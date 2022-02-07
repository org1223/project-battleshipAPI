module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'fallback',
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 2
  }