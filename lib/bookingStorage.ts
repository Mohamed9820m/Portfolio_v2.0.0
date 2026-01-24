import mongoose, { Schema, Document } from 'mongoose';
import dbConnect from './mongodb';

export interface IBooking extends Document {
  id: string; // We'll map the custom hex ID here for compatibility
  name: string;
  email: string;
  date: string;
  time: string;
  timezone?: string;
  notes?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    timezone: { type: String, default: 'Europe/Berlin' },
    notes: { type: String },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Prevent re-compiling the model if it already exists
const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

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

function mapToPendingBooking(doc: any): PendingBooking {
  return {
    id: doc.id,
    name: doc.name,
    email: doc.email,
    date: doc.date,
    time: doc.time,
    timezone: doc.timezone,
    notes: doc.notes,
    status: doc.status,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export async function getAllBookings(): Promise<PendingBooking[]> {
  await dbConnect();
  const bookings = await Booking.find({}).sort({ createdAt: -1 });
  return bookings.map(mapToPendingBooking);
}

export async function getBookingById(id: string): Promise<PendingBooking | null> {
  await dbConnect();
  const booking = await Booking.findOne({ id });
  return booking ? mapToPendingBooking(booking) : null;
}

export async function createPendingBooking(
  bookingData: Omit<PendingBooking, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<PendingBooking> {
  await dbConnect();

  const { randomBytes } = await import('crypto');
  const id = randomBytes(16).toString('hex');

  const booking = await Booking.create({
    id,
    ...bookingData,
    status: 'pending',
  });

  console.log('✅ Booking created in MongoDB:', id);

  return mapToPendingBooking(booking);
}

export async function updateBookingStatus(
  id: string,
  status: 'approved' | 'rejected'
): Promise<PendingBooking | null> {
  await dbConnect();
  const booking = await Booking.findOneAndUpdate(
    { id },
    { status },
    { new: true }
  );

  if (booking) {
    console.log('✅ Booking status updated in MongoDB:', id, status);
    return mapToPendingBooking(booking);
  }

  return null;
}

export async function deleteBooking(id: string): Promise<boolean> {
  await dbConnect();
  const result = await Booking.deleteOne({ id });
  return result.deletedCount > 0;
}

export async function getBookingsByStatus(
  status: 'pending' | 'approved' | 'rejected'
): Promise<PendingBooking[]> {
  await dbConnect();
  const bookings = await Booking.find({ status }).sort({ createdAt: -1 });
  return bookings.map(mapToPendingBooking);
}
