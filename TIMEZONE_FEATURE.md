# 🌍 Timezone Conversion Feature

## Overview
Users can now book meetings in their preferred timezone, and the system automatically handles timezone conversions. The admin receives booking requests with both the user's timezone and the converted Europe/Berlin time.

---

## ✨ Features Implemented

### 1. **Timezone Selector** 🌐
- **11 Available Timezones:**
  - Europe/Berlin (UTC+1)
  - America/New York (UTC-5)
  - America/Los Angeles (UTC-8)
  - America/Chicago (UTC-6)
  - Europe/London (UTC+0)
  - Europe/Paris (UTC+1)
  - Asia/Dubai (UTC+4)
  - Asia/Tokyo (UTC+9)
  - Asia/Shanghai (UTC+8)
  - Asia/Singapore (UTC+8)
  - Australia/Sydney (UTC+10)

- **User Experience:**
  - Click on the timezone button to open a dropdown menu
  - Each timezone shows its name and GMT offset
  - Selected timezone is highlighted in blue
  - Smooth animation when opening/closing

### 2. **Real Google Meet Logo** 📹
- Replaced the generic SVG with the authentic Google Meet logo
- Uses official Google Meet colors (green, blue, red, orange)

### 3. **Business Hours Only** ⏰
- Time slots: **8:00 AM to 5:00 PM**
- Half-hour increments (8:00, 8:30, 9:00... 5:00 PM)
- Perfect for professional business meetings

### 4. **Weekdays Only** 📅
- **Saturdays and Sundays are disabled**
- Users can only book Monday-Friday
- Weekend dates are grayed out and unclickable

---

## 🔄 How Timezone Conversion Works

### For Users:
1. Select their preferred timezone (e.g., America/New York)
2. Choose a date and time in **their local timezone**
3. Submit the booking with their timezone information
4. Receive confirmation email with times in **their timezone**

### For Admin (You):
1. Receive an approval email showing:
   - **User's Time:** The time the user selected in their timezone
   - **Your Time (Europe/Berlin):** Automatically converted time
2. The converted time is highlighted in amber for easy visibility
3. You see exactly when the meeting is in your local time

### Example:
- **User selects:** 2:00 PM in America/New York (GMT-5)
- **You receive:** 
  - User's Time: 2:00 PM (America/New York)
  - 🇩🇪 Your Time: 8:00 PM (Europe/Berlin)

---

## 📧 Email Updates

### Admin Approval Email:
```
Guest: John Doe
Email: john@example.com
Date: Monday, October 14, 2024
User's Time: 2:00pm (America/New York)
🇩🇪 Your Time: 8:00pm (Europe/Berlin)    [Highlighted in amber]
Meeting: 30 Min Meeting
```

### User Confirmation Email:
```
📅 Date: Monday, October 14, 2024
⏰ Time: 2:00pm
⏱️ Duration: 30 minutes
🌍 Timezone: America/New York
📍 Location: Google Meet
```

---

## 🗄️ Database Updates

### New Field Added:
```sql
timezone NVARCHAR(100)
```

The `bookings` table now stores:
- User's original date and time
- User's selected timezone
- All other booking details

**Note:** The timezone column has been automatically added to your existing Azure SQL database.

---

## 🧪 Testing the Feature

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to:** `http://localhost:3000/contact`

3. **Test timezone conversion:**
   - Click on "Europe/Berlin" timezone selector
   - Choose a different timezone (e.g., America/New York)
   - Select a date (weekday only)
   - Select a time between 8:00 AM - 5:00 PM
   - Fill out the booking form
   - Check your email for the approval request
   - You should see both the user's time and your converted time

4. **Test restrictions:**
   - Try clicking on Saturday/Sunday → Should be disabled
   - Try selecting a time before 8:00 AM or after 5:00 PM → Should not be available
   - Try clicking on past dates → Should be disabled

---

## 📁 Files Modified

1. **`components/CustomCalendar.tsx`**
   - Added timezone selector with 11 timezones
   - Added weekend detection (`isWeekend`)
   - Added Google Meet logo SVG
   - Updated time slots to 8:00 AM - 5:00 PM
   - Send timezone info with booking request

2. **`lib/timezoneUtils.ts`** ✨ NEW
   - `convertToEuropeBerlin()`: Converts any timezone to Europe/Berlin
   - `formatTimezone()`: Formats timezone names for display
   - `getTimezoneOffset()`: Returns GMT offset for any timezone

3. **`lib/bookingStorage.ts`**
   - Updated `PendingBooking` interface with `timezone` field
   - Modified `createPendingBooking()` to store timezone

4. **`lib/db.ts`**
   - Updated database schema to include `timezone` column
   - Added migration to add column to existing tables

5. **`app/api/bookings/route.ts`**
   - Imports `convertToEuropeBerlin` utility
   - Converts user's time to Berlin time
   - Passes both timezones to admin email

6. **`lib/email.ts`**
   - Updated `BookingEmailData` and `PendingBookingEmailData` interfaces
   - Modified admin email template to show both timezones
   - Modified user confirmation email to show their timezone

7. **`app/api/bookings/confirm/route.ts`**
   - Passes timezone to user confirmation and rejection emails

---

## 🎯 Key Benefits

1. **Global Reach:** Accept bookings from clients worldwide
2. **No Confusion:** Both parties see times in their own timezone
3. **Admin Convenience:** You always see converted times in your local timezone (Europe/Berlin)
4. **Professional:** Clean, organized calendar interface
5. **Business Hours:** Only allows bookings during working hours on weekdays

---

## 🚀 Next Steps (Optional Enhancements)

- Add more timezones if needed
- Create an admin dashboard to view all bookings with their timezones
- Add iCalendar (.ics) file attachments to emails
- Send reminder emails 24 hours before meetings
- Allow users to reschedule or cancel bookings

---

**All timezone conversions are handled automatically! Just approve or reject bookings, and the system takes care of the rest.** 🎉

