import sql from 'mssql';

const config: sql.config = {
  server: 'portfolio12.database.windows.net',
  port: 1433,
  database: 'porto',
  user: 'root44',
  password: 'admin9820@',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true,
    connectTimeout: 30000,
    requestTimeout: 30000,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getConnection(): Promise<sql.ConnectionPool> {
  try {
    if (!pool) {
      console.log('🔌 Creating new SQL connection pool...');
      pool = await sql.connect(config);
      console.log('✅ Connected to Azure SQL Database');
    }
    return pool;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
}

export async function closeConnection() {
  if (pool) {
    await pool.close();
    pool = null;
    console.log('🔌 Database connection closed');
  }
}

// Initialize database tables
export async function initializeDatabase() {
  try {
    const connection = await getConnection();
    
    console.log('📋 Initializing database tables...');
    
    // Create bookings table if it doesn't exist
    await connection.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='bookings' AND xtype='U')
      CREATE TABLE bookings (
        id NVARCHAR(50) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time NVARCHAR(50) NOT NULL,
        timezone NVARCHAR(100),
        notes NVARCHAR(MAX),
        status NVARCHAR(20) NOT NULL DEFAULT 'pending',
        createdAt DATETIME2 NOT NULL DEFAULT GETDATE(),
        updatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
      )
    `);
    
    // Add timezone column if it doesn't exist (for existing tables)
    await connection.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('bookings') AND name = 'timezone')
      ALTER TABLE bookings ADD timezone NVARCHAR(100)
    `);
    
    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}

export { sql };

