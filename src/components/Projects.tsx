'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { StarIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import axios, { AxiosError } from 'axios'

interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  topics: string[]
  fork: boolean
}

type GitHubResponse = Repository[]

interface ErrorState {
  message: string
  type: 'error'
}

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<ErrorState | null>(null)

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get<GitHubResponse>(
          'https://api.github.com/users/farasalgh/repos?sort=updated&direction=desc',
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            },
          }
        )
        
        const filteredRepos = response.data
          .filter(repo => !repo.fork && repo.name !== 'farasalgh')
          .slice(0, 6)

        const reposWithReadme = await Promise.all(
          filteredRepos.map(async (repo) => {
            try {
              const readmeResponse = await axios.get(
                `https://api.github.com/repos/farasalgh/${repo.name}/readme`,
                {
                  headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github.v3.raw',
                  },
                }
              )
              
              // Convert README content to plain text and limit to 100 words
              const readmeText = readmeResponse.data
                .replace(/[#*`]/g, '') // Remove markdown syntax
                .replace(/\n/g, ' ') // Replace newlines with spaces
                .split(' ')
                .slice(0, 100)
                .join(' ') + '...'
              
              return {
                id: repo.id,
                name: repo.name,
                description: readmeText,
                html_url: repo.html_url,
                stargazers_count: repo.stargazers_count,
                language: repo.language,
                topics: repo.topics || [],
                fork: repo.fork
              }
            } catch (err) {
              if (err instanceof AxiosError) {
                console.error(`Error fetching README for ${repo.name}:`, err.message)
              } else {
                console.error(`Error fetching README for ${repo.name}:`, err)
              }
              return {
                id: repo.id,
                name: repo.name,
                description: repo.description || 'No description available',
                html_url: repo.html_url,
                stargazers_count: repo.stargazers_count,
                language: repo.language,
                topics: repo.topics || [],
                fork: repo.fork
              }
            }
          })
        )
        
        setRepositories(reposWithReadme)
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error('Error fetching repositories:', err.message)
          setError({ 
            message: 'Failed to load projects. Please try again later.',
            type: 'error'
          })
        } else {
          console.error('Error fetching repositories:', err)
          setError({ 
            message: 'An unexpected error occurred. Please try again later.',
            type: 'error'
          })
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepositories()
  }, [])

  return (
    <section id="projects" className="relative py-20 bg-gray-50 dark:bg-gray-800">
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
            My Projects
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Here are some of my recent projects. Each one represents a unique challenge and learning opportunity.
          </motion.p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error.message}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repositories.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {repo.name}
                    </h3>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                    </a>
                  </div>

                  {repo.description && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {repo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    {repo.language && (
                      <div className="flex items-center">
                        <CodeBracketIcon className="h-4 w-4 mr-1" />
                        {repo.language}
                      </div>
                    )}
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 mr-1" />
                      {repo.stargazers_count}
                    </div>
                  </div>

                  {repo.topics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {repo.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects 