export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'erp_user',
    password: process.env.DATABASE_PASSWORD || 'erp_password',
    database: process.env.DATABASE_NAME || 'construction_erp',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'super-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },

  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  },

  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 10 * 1024 * 1024, // 10MB
    uploadPath: process.env.UPLOAD_PATH || './uploads',
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/vnd.dwg',
      'application/x-dwg',
    ],
  },

  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
    credentials: true,
  },

  encryption: {
    key: process.env.ENCRYPTION_KEY || '32-character-default-key-change',
  },

  audit: {
    enabled: process.env.AUDIT_ENABLED === 'true',
    retentionDays: parseInt(process.env.AUDIT_RETENTION_DAYS, 10) || 365,
  },

  notification: {
    vapid: {
      publicKey: process.env.VAPID_PUBLIC_KEY,
      privateKey: process.env.VAPID_PRIVATE_KEY,
      subject: process.env.VAPID_SUBJECT,
    },
  },
})