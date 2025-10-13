import { convertToEuropeBerlin } from '../lib/timezoneUtils';

console.log('\n🧪 Testing Timezone Conversions\n');
console.log('='.repeat(60));

// Test cases
const tests = [
  {
    name: 'New York to Berlin (afternoon)',
    date: '2024-10-15',
    time: '2:00pm',
    timezone: 'America/New_York',
    expected: '8:00pm (same day)'
  },
  {
    name: 'Los Angeles to Berlin (morning)',
    date: '2024-10-15',
    time: '9:00am',
    timezone: 'America/Los_Angeles',
    expected: '6:00pm (same day)'
  },
  {
    name: 'Tokyo to Berlin (afternoon)',
    date: '2024-10-15',
    time: '3:00pm',
    timezone: 'Asia/Tokyo',
    expected: '8:00am (same day)'
  },
  {
    name: 'London to Berlin',
    date: '2024-10-15',
    time: '10:00am',
    timezone: 'Europe/London',
    expected: '11:00am (same day)'
  },
  {
    name: 'Berlin to Berlin (control)',
    date: '2024-10-15',
    time: '3:00pm',
    timezone: 'Europe/Berlin',
    expected: '3:00pm (same day)'
  },
];

tests.forEach(test => {
  console.log(`\n📍 ${test.name}`);
  console.log(`   Input:    ${test.date} ${test.time} (${test.timezone})`);
  console.log(`   Expected: ${test.expected}`);
  
  const result = convertToEuropeBerlin(test.date, test.time, test.timezone);
  console.log(`   Result:   ${result.date} ${result.time} (Europe/Berlin)`);
  console.log('   ' + '-'.repeat(50));
});

console.log('\n✅ Test complete!\n');

