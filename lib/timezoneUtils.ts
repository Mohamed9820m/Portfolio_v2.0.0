// Timezone conversion utilities

// Get timezone offset in hours (from UTC - Standard Time, no DST)
// Note: These are standard offsets. DST is not accounted for.
function getTimezoneOffsetHours(timezone: string): number {
  const offsets: Record<string, number> = {
    'Europe/Berlin': 1,        // CET (UTC+1)
    'America/New_York': -5,    // EST (UTC-5)
    'America/Los_Angeles': -8, // PST (UTC-8)
    'America/Chicago': -6,     // CST (UTC-6)
    'Europe/London': 0,        // GMT (UTC+0)
    'Europe/Paris': 1,         // CET (UTC+1)
    'Asia/Dubai': 4,           // GST (UTC+4)
    'Asia/Tokyo': 9,           // JST (UTC+9)
    'Asia/Shanghai': 8,        // CST (UTC+8)
    'Asia/Singapore': 8,       // SGT (UTC+8)
    'Australia/Sydney': 10,    // AEST (UTC+10)
  };
  return offsets[timezone] !== undefined ? offsets[timezone] : 1;
}

// Convert time from user's timezone to Europe/Berlin
export function convertToEuropeBerlin(date: string, time: string, fromTimezone: string): { date: string; time: string } {
  try {
    console.log('🔄 Converting time:', { date, time, fromTimezone });
    
    // Parse the time (e.g., "2:00pm" -> 14:00)
    const timeParts = time.match(/(\d+):?(\d*)([ap]m)/i);
    if (!timeParts) {
      console.error('❌ Failed to parse time:', time);
      return { date, time };
    }
    
    let hours = parseInt(timeParts[1]);
    const minutes = timeParts[2] ? parseInt(timeParts[2]) : 0;
    const meridiem = timeParts[3].toLowerCase();
    
    // Convert to 24-hour format
    if (meridiem === 'pm' && hours !== 12) hours += 12;
    if (meridiem === 'am' && hours === 12) hours = 0;
    
    console.log('📊 Parsed time:', { hours, minutes, meridiem });
    
    // Get timezone offsets (from UTC)
    const fromOffset = getTimezoneOffsetHours(fromTimezone);
    const berlinOffset = getTimezoneOffsetHours('Europe/Berlin');
    
    console.log('🌍 Timezone offsets:', { fromOffset, berlinOffset });
    
    // Parse the date parts
    const [year, month, day] = date.split('-').map(Number);
    
    // Create a UTC timestamp representing the user's local time
    // We create a UTC date, then subtract the user's timezone offset to get the actual UTC time
    const userUTCDate = Date.UTC(year, month - 1, day, hours, minutes, 0);
    const userTimezoneOffsetMs = fromOffset * 60 * 60 * 1000;
    const actualUTCTime = userUTCDate - userTimezoneOffsetMs;
    
    // Convert to Berlin time by adding Berlin's offset
    const berlinTimezoneOffsetMs = berlinOffset * 60 * 60 * 1000;
    const berlinLocalTime = actualUTCTime + berlinTimezoneOffsetMs;
    const berlinDateTime = new Date(berlinLocalTime);
    
    console.log('🕐 Timestamps:', {
      userLocal: new Date(userUTCDate).toISOString(),
      actualUTC: new Date(actualUTCTime).toISOString(),
      berlinLocal: berlinDateTime.toISOString()
    });
    
    // Format Berlin date (using UTC methods since berlinDateTime is in UTC but adjusted)
    const berlinYear = berlinDateTime.getUTCFullYear();
    const berlinMonth = String(berlinDateTime.getUTCMonth() + 1).padStart(2, '0');
    const berlinDay = String(berlinDateTime.getUTCDate()).padStart(2, '0');
    const berlinDate = `${berlinYear}-${berlinMonth}-${berlinDay}`;
    
    // Format Berlin time (using UTC methods)
    const berlinHours = berlinDateTime.getUTCHours();
    const berlinMinutes = String(berlinDateTime.getUTCMinutes()).padStart(2, '0');
    const berlinHour12 = berlinHours > 12 ? berlinHours - 12 : (berlinHours === 0 ? 12 : berlinHours);
    const berlinMeridiem = berlinHours >= 12 ? 'pm' : 'am';
    const berlinTimeFormatted = `${berlinHour12}:${berlinMinutes}${berlinMeridiem}`;
    
    console.log('✅ Converted to Berlin:', { date: berlinDate, time: berlinTimeFormatted });
    
    return {
      date: berlinDate,
      time: berlinTimeFormatted
    };
  } catch (error) {
    console.error('❌ Error converting timezone:', error);
    return { date, time };
  }
}

// Format timezone display name
export function formatTimezone(timezone: string): string {
  return timezone.replace(/_/g, ' ');
}

// Get timezone offset
export function getTimezoneOffset(timezone: string): string {
  const timezoneMap: Record<string, string> = {
    'Europe/Berlin': 'GMT+1',
    'America/New_York': 'GMT-5',
    'America/Los_Angeles': 'GMT-8',
    'America/Chicago': 'GMT-6',
    'Europe/London': 'GMT+0',
    'Europe/Paris': 'GMT+1',
    'Asia/Dubai': 'GMT+4',
    'Asia/Tokyo': 'GMT+9',
    'Asia/Shanghai': 'GMT+8',
    'Asia/Singapore': 'GMT+8',
    'Australia/Sydney': 'GMT+11',
  };
  
  return timezoneMap[timezone] || 'GMT+0';
}

