'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface LanyardData {
  discord_user: {
    username: string
    discriminator: string
    avatar: string
    id: string
  }
  discord_status: string
  activities: Array<{
    name: string
    type: number
    state?: string
    details?: string
    timestamps?: {
      start: number
    }
  }>
}

const Lanyard = () => {
  const [data, setData] = useState<LanyardData | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.lanyard.rest/v1/users/your-discord-id')
        const json = await response.json()
        if (json.success) {
          setData(json.data)
        }
      } catch (error) {
        console.error('Error fetching Lanyard data:', error)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (!data) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'idle':
        return 'bg-yellow-500'
      case 'dnd':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg p-4 w-72"
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={`https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`}
            alt={data.discord_user.username}
            className="w-12 h-12 rounded-full"
          />
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(
              data.discord_status
            )}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {data.discord_user.username}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {data.activities[0]?.name || 'Not playing anything'}
          </p>
        </div>
      </div>
      {data.activities[0] && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{data.activities[0].details}</span>
            {data.activities[0].timestamps?.start && (
              <span>
                {Math.floor(
                  (Date.now() - data.activities[0].timestamps.start) / 1000 / 60
                )}{' '}
                min
              </span>
            )}
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{
                width: data.activities[0].timestamps?.start
                  ? `${Math.min(
                      ((Date.now() - data.activities[0].timestamps.start) /
                        (1000 * 60 * 60)) *
                        100,
                      100
                    )}%`
                  : '0%',
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default Lanyard 