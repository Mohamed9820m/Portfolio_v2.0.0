"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, User, Mail, MessageSquare, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface CustomCalendarProps {
  duration?: string;
  meetingTitle?: string;
  userName?: string;
}

export default function CustomCalendar({ 
  duration = "30m",
  meetingTitle = "30 Min Meeting",
  userName = "Mohamed Habib"
}: CustomCalendarProps) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showTimezoneMenu, setShowTimezoneMenu] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("Europe/Berlin");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: "",
  });

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Available timezones
  const timezones = [
    { label: "Europe/Berlin", offset: "UTC+1" },
    { label: "America/New_York", offset: "UTC-5" },
    { label: "America/Los_Angeles", offset: "UTC-8" },
    { label: "America/Chicago", offset: "UTC-6" },
    { label: "Europe/London", offset: "UTC+0" },
    { label: "Europe/Paris", offset: "UTC+1" },
    { label: "Asia/Dubai", offset: "UTC+4" },
    { label: "Asia/Tokyo", offset: "UTC+9" },
    { label: "Asia/Shanghai", offset: "UTC+8" },
    { label: "Asia/Singapore", offset: "UTC+8" },
    { label: "Australia/Sydney", offset: "UTC+10" },
  ];

  // Time slots - 8:00 AM to 5:00 PM
  const timeSlots = [
    "8:00am", "8:30am", "9:00am", "9:30am", "10:00am",
    "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm",
    "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm",
    "4:30pm", "5:00pm"
  ];

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);

  // Check if a date is in the past
  const isPastDate = (day: number) => {
    const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return dateToCheck < todayMidnight;
  };

  // Check if a date is today
  const isToday = (day: number) => {
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  // Check if a date is weekend (Saturday or Sunday)
  const isWeekend = (day: number) => {
    const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = dateToCheck.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 = Sunday, 6 = Saturday
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateSelect = (day: number | null) => {
    if (day && !isPastDate(day) && !isWeekend(day)) {
      setSelectedDate(day);
      setSelectedTime(null); // Reset time when date changes
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setShowBookingForm(true);
  };

  const handleBack = () => {
    setShowBookingForm(false);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare booking data with timezone info
      const bookingData = {
        name: formData.name,
        email: formData.email,
        notes: formData.notes,
        date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`,
        time: selectedTime,
        timezone: selectedTimezone, // User's selected timezone
        duration: duration,
        meetingTitle: meetingTitle,
      };

      // Send to your backend API
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setShowBookingForm(false);
          setSelectedDate(null);
          setSelectedTime(null);
          setFormData({ name: "", email: "", notes: "" });
        }, 3000);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!showBookingForm ? (
          <motion.div
            key="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col lg:flex-row gap-0 bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 shadow-xl"
          >
      {/* Left Side - Meeting Info */}
      <div className="lg:w-72 bg-[#1a1a1a] p-6 border-b lg:border-b-0 lg:border-r border-white/10">
        <div className="mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mb-3">
            <span className="text-white font-semibold text-sm">
              {userName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <h3 className="text-white font-semibold text-base mb-1">{userName}</h3>
        </div>

        <h2 className="text-white font-bold text-lg mb-4">{meetingTitle}</h2>

        <div className="space-y-2.5 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            {/* Official Google Meet Logo */}
            <Image 
              src="/7089160_google_meet_icon.png" 
              alt="Google Meet" 
              width={24}
              height={24}
              className="flex-shrink-0 object-contain"
            />
            <span className="font-medium">Google Meet</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowTimezoneMenu(!showTimezoneMenu)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span>{selectedTimezone.replace(/_/g, ' ')}</span>
              <ChevronRight className={`w-3 h-3 transition-transform ${showTimezoneMenu ? 'rotate-90' : ''}`} />
            </button>
            
            {/* Timezone Dropdown - Simple list, no animations */}
            {showTimezoneMenu && (
              <div className="absolute left-0 top-full mt-2 w-72 bg-[#1a1a1a] border border-white/10 rounded shadow-2xl max-h-80 overflow-y-auto z-50 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {timezones.map((tz) => (
                  <button
                    key={tz.label}
                    onClick={() => {
                      setSelectedTimezone(tz.label);
                      setShowTimezoneMenu(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm border-b border-white/5 last:border-b-0 ${
                      selectedTimezone === tz.label 
                        ? 'bg-white/5 text-white' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                    }`}
                  >
                    <div className="font-medium">{tz.label.replace(/_/g, ' ')}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{tz.offset}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Middle - Calendar */}
      <div className="flex-1 p-6 bg-[#1a1a1a]">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-semibold text-lg">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex gap-1">
            <button
              onClick={handlePrevMonth}
              className="w-8 h-8 rounded hover:bg-white/5 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500 hover:text-gray-300" />
            </button>
            <button
              onClick={handleNextMonth}
              className="w-8 h-8 rounded hover:bg-white/5 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-500 hover:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-1.5 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((day, index) => {
            const isPast = day ? isPastDate(day) : false;
            const isWeekendDay = day ? isWeekend(day) : false;
            const isTodayDate = day ? isToday(day) : false;
            const isSelected = day === selectedDate;
            const isDisabled = day === null || isPast || isWeekendDay;

            return (
              <motion.button
                key={index}
                whileHover={day && !isDisabled ? { scale: 1.05 } : {}}
                onClick={() => handleDateSelect(day)}
                disabled={isDisabled}
                className={`aspect-square rounded flex items-center justify-center text-sm font-medium transition-all ${
                  !day
                    ? "invisible"
                    : isPast || isWeekendDay
                    ? "bg-transparent text-gray-600 cursor-not-allowed"
                    : isSelected
                    ? "bg-white text-black font-semibold"
                    : isTodayDate
                    ? "bg-white/10 text-white font-semibold ring-1 ring-white/20 hover:bg-white/15"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                {day}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Right Side - Time Slots */}
      <div className="lg:w-64 bg-[#202020] p-6 border-t lg:border-t-0 lg:border-l border-white/10">
        <h3 className="text-white font-semibold mb-4">{selectedDate ? `${weekDays[new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate).getDay()]}, ${monthNames[currentDate.getMonth()].slice(0, 3)} ${selectedDate}` : 'Select a date'}</h3>

        {/* Time Slots List - Simple, no animations */}
        <div className="space-y-1.5 max-h-[450px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              disabled={!selectedDate}
              className={`w-full py-2.5 px-4 rounded text-sm font-medium text-center ${
                selectedTime === time
                  ? "bg-white text-black"
                  : selectedDate
                  ? "bg-transparent text-gray-400 border border-white/10 hover:bg-white/5 hover:text-gray-200"
                  : "bg-transparent text-gray-600 border border-white/5 cursor-not-allowed"
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Confirm Button - Simple, no animation */}
        {selectedTime && (
          <button
            onClick={handleNext}
            className="w-full mt-4 py-3 rounded bg-white hover:bg-gray-100 text-black font-semibold transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-8 md:p-10"
          >
            {isSuccess ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Request Submitted!</h3>
                <p className="text-gray-400 mb-2">Your booking request has been sent for approval.</p>
                <p className="text-gray-500 text-sm">You&apos;ll receive a confirmation email once the meeting is approved.</p>
              </motion.div>
            ) : (
              <>
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">Enter your details</h2>
                <p className="text-gray-400 mb-6">
                  {monthNames[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()} at {selectedTime}
                </p>

                <form onSubmit={handleSubmitBooking} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your name"
                        className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Additional notes (optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Tell me what you'd like to discuss..."
                        className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Scheduling..." : "Schedule Meeting"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

