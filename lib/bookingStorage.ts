import { getConnection, sql } from './db';
import { randomBytes } from 'crypto';

export interface PendingBooking {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  timezone?: string;
  notes?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Read all bookings
export async function getAllBookings(): Promise<PendingBooking[]> {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        id,
        name,
        email,
        CONVERT(VARCHAR(10), date, 23) as date,
        time,
        notes,
        status,
        CONVERT(VARCHAR(30), createdAt, 127) as createdAt,
        CONVERT(VARCHAR(30), updatedAt, 127) as updatedAt
      FROM bookings
      ORDER BY createdAt DESC
    `);
    
    return result.recordset;
  } catch (error) {
    console.error('❌ Error getting all bookings:', error);
    throw error;
  }
}

// Get booking by ID
export async function getBookingById(id: string): Promise<PendingBooking | null> {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.NVarChar(50), id)
      .query(`
        SELECT 
          id,
          name,
          email,
          CONVERT(VARCHAR(10), date, 23) as date,
          time,
          notes,
          status,
          CONVERT(VARCHAR(30), createdAt, 127) as createdAt,
          CONVERT(VARCHAR(30), updatedAt, 127) as updatedAt
        FROM bookings
        WHERE id = @id
      `);
    
    return result.recordset[0] || null;
  } catch (error) {
    console.error('❌ Error getting booking by ID:', error);
    throw error;
  }
}

// Create new pending booking
export async function createPendingBooking(
  bookingData: Omit<PendingBooking, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<PendingBooking> {
  try {
    const pool = await getConnection();
    const id = randomBytes(16).toString('hex');
    const now = new Date().toISOString();
    
    await pool.request()
      .input('id', sql.NVarChar(50), id)
      .input('name', sql.NVarChar(255), bookingData.name)
      .input('email', sql.NVarChar(255), bookingData.email)
      .input('date', sql.Date, bookingData.date)
      .input('time', sql.NVarChar(50), bookingData.time)
      .input('timezone', sql.NVarChar(100), bookingData.timezone || 'Europe/Berlin')
      .input('notes', sql.NVarChar(sql.MAX), bookingData.notes || null)
      .input('status', sql.NVarChar(20), 'pending')
      .input('createdAt', sql.DateTime2, now)
      .input('updatedAt', sql.DateTime2, now)
      .query(`
        INSERT INTO bookings (id, name, email, date, time, timezone, notes, status, createdAt, updatedAt)
        VALUES (@id, @name, @email, @date, @time, @timezone, @notes, @status, @createdAt, @updatedAt)
      `);
    
    console.log('✅ Booking created in database:', id);
    
    return {
      id,
      name: bookingData.name,
      email: bookingData.email,
      date: bookingData.date,
      time: bookingData.time,
      timezone: bookingData.timezone,
      notes: bookingData.notes,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    throw error;
  }
}

// Update booking status
export async function updateBookingStatus(
  id: string,
  status: 'approved' | 'rejected'
): Promise<PendingBooking | null> {
  try {
    const pool = await getConnection();
    const now = new Date().toISOString();
    
    await pool.request()
      .input('id', sql.NVarChar(50), id)
      .input('status', sql.NVarChar(20), status)
      .input('updatedAt', sql.DateTime2, now)
      .query(`
        UPDATE bookings
        SET status = @status, updatedAt = @updatedAt
        WHERE id = @id
      `);
    
    console.log('✅ Booking status updated:', id, status);
    
    // Return the updated booking
    return await getBookingById(id);
  } catch (error) {
    console.error('❌ Error updating booking status:', error);
    throw error;
  }
}

// Delete booking
export async function deleteBooking(id: string): Promise<boolean> {
  try {
    const pool = await getConnection();
    
    const result = await pool.request()
      .input('id', sql.NVarChar(50), id)
      .query(`
        DELETE FROM bookings
        WHERE id = @id
      `);
    
    const deleted = result.rowsAffected[0] > 0;
    
    if (deleted) {
      console.log('✅ Booking deleted:', id);
    } else {
      console.log('⚠️ Booking not found for deletion:', id);
    }
    
    return deleted;
  } catch (error) {
    console.error('❌ Error deleting booking:', error);
    throw error;
  }
}

// Get bookings by status
export async function getBookingsByStatus(
  status: 'pending' | 'approved' | 'rejected'
): Promise<PendingBooking[]> {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('status', sql.NVarChar(20), status)
      .query(`
        SELECT 
          id,
          name,
          email,
          CONVERT(VARCHAR(10), date, 23) as date,
          time,
          notes,
          status,
          CONVERT(VARCHAR(30), createdAt, 127) as createdAt,
          CONVERT(VARCHAR(30), updatedAt, 127) as updatedAt
        FROM bookings
        WHERE status = @status
        ORDER BY createdAt DESC
      `);
    
    return result.recordset;
  } catch (error) {
    console.error('❌ Error getting bookings by status:', error);
    throw error;
  }
}
