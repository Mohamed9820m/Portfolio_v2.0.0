"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, ArrowLeft, Check, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import CustomCalendar from "@/components/CustomCalendar";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "form">("calendar");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        setIsError(true);
        setTimeout(() => setIsError(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen text-white tech-grid-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Link href="/">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Simple Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Get in </span>
            <span className="gradient-text-animated">touch</span>
          </h1>
          <a href="mailto:mohamedhabibmarouani8@gmail.com" className="text-gray-400 hover:text-white transition-colors">
          mohamedhabibmarouani8@gmail.com
          </a>
        </motion.div>

        {/* Simple Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4 mb-8 max-w-md mx-auto"
        >
          <button
            onClick={() => setActiveTab("calendar")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "calendar"
                ? "bg-white text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Book a call
          </button>
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "form"
                ? "bg-white text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Send a message
          </button>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          {activeTab === "calendar" ? (
            <CustomCalendar
              duration="30m"
              meetingTitle="30 Min Meeting"
              userName="Mohamed Habib"
            />
          ) : (
            <div className="bg-black rounded-2xl border border-white/10 p-8 md:p-10">
              <AnimatePresence mode="wait">
                {!isSuccess && !isError && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                  {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </motion.form>
                )}

                {/* Success Message - Inside Card */}
                {isSuccess && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-white mb-3">Message Sent! ✉️</h3>
                    <p className="text-gray-400 mb-2">Thank you for reaching out!</p>
                    <p className="text-gray-500 text-sm mb-8">Mohamed will get back to you soon.</p>
                    
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}

                {/* Error Message - Inside Card */}
                {isError && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <AlertCircle className="w-10 h-10 text-red-500" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-white mb-3">Oops! ⚠️</h3>
                    <p className="text-gray-400 mb-2">Failed to send message</p>
                    <p className="text-gray-500 text-sm mb-8">
                      Please try again or email directly at<br />
                      <a href="mailto:mohamedhabibmarouani8@gmail.com" className="text-blue-400 hover:underline">
                        mohamedhabibmarouani8@gmail.com
                      </a>
                    </p>
                    
                    <button
                      onClick={() => setIsError(false)}
                      className="px-8 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300"
                    >
                      Try Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

    </main>
  );
}

