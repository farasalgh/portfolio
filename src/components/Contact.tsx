'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GlobeAltIcon, BriefcaseIcon, AcademicCapIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react'

interface TimelineItemProps {
  title: string
  subtitle: string
  date: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  isLast?: boolean
}

const TimelineItem = ({ 
  title, 
  subtitle, 
  date, 
  description, 
  icon: Icon, 
  isLast = false 
}: TimelineItemProps) => (
  <div className="relative pl-8 pb-8">
    {!isLast && (
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
    )}
    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <Icon className="h-4 w-4" />
    </div>
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h4>
        <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
      </div>
      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{subtitle}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </div>
)

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`}
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5" />
      ) : (
        <AlertCircle className="w-5 h-5" />
      )}
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 hover:opacity-80 transition-opacity"
      >
        ✕
      </button>
    </motion.div>
  )
}

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await axios.post('/api/contact', formData)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setToast({ message: 'Pesan berhasil dikirim!', type: 'success' })
    } catch (err) {
      setToast({ 
        message: 'Gagal mengirim pesan. Silakan coba lagi.', 
        type: 'error' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const experiences = [
    {
      title: "Vocational High School",
      subtitle: "Software Development",
      date: "2023 - 2026",
      description: "Specialized in web development and software engineering, learning modern programming languages and development practices.",
      icon: AcademicCapIcon
    },
    {
      title: "Freelance Developer",
      subtitle: "Web Development",
      date: "2023 - Present",
      description: "Working on various web projects, focusing on modern frameworks and technologies while building a diverse portfolio.",
      icon: CodeBracketIcon
    },
    {
      title: "Current Status",
      subtitle: "Active Development",
      date: "Present",
      description: "Continuously learning and improving skills while working on personal and client projects.",
      icon: BriefcaseIcon,
      isLast: true
    }
  ]

  return (
    <section id="contact" className="relative py-20 bg-gray-50 dark:bg-gray-800">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Contact Me
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Have a question or want to work together? Feel free to reach out!
          </motion.p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Top Row - Form and Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all ${
                    isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Kirim Pesan</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Timeline Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Experience Timeline
              </h3>
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <TimelineItem
                    key={index}
                    title={exp.title}
                    subtitle={exp.subtitle}
                    date={exp.date}
                    description={exp.description}
                    icon={exp.icon}
                    isLast={exp.isLast}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Row - Connect with me */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Connect with me
              </h3>
              <div className="flex justify-center gap-8">
                <a
                  href="https://github.com/farasalgh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center space-y-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl group-hover:from-blue-600 group-hover:to-purple-600 transition-colors">
                    <GlobeAltIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/faras-alghani-29nov207/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center space-y-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl group-hover:from-blue-600 group-hover:to-purple-600 transition-colors">
                    <BriefcaseIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium">LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact 