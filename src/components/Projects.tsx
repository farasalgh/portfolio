'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import { StarIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  language: string
  stargazers_count: number
  readme?: string
}

const ProjectCard = ({ 
  title, 
  description, 
  language, 
  stars, 
  url,
  readme 
}: { 
  title: string
  description: string
  language: string
  stars: number
  url: string
  readme?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  // Function to extract the first paragraph from README
  const getFirstParagraph = (content: string) => {
    // Remove markdown syntax and get first paragraph
    const cleanContent = content
      .replace(/^#+\s+/gm, '') // Remove headers
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
      .replace(/`([^`]+)`/g, '$1') // Remove inline code
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic
      .trim()

    // Get the first paragraph
    const firstParagraph = cleanContent.split('\n\n')[0]
    return firstParagraph || description
  }

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl bg-white dark:bg-gray-700 shadow-xl transition-all duration-300 hover:shadow-2xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <motion.div
            animate={isHovered ? { rotate: 45 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </motion.div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
          {readme ? getFirstParagraph(readme) : description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CodeBracketIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">{language}</span>
          </div>
          <div className="flex items-center space-x-1">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">{stars}</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.a>
  )
}

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true)
        
        // Check if token exists
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
        const headers = token 
          ? {
              Authorization: `Bearer ${token}`,
              Accept: 'application/vnd.github.v3+json'
            }
          : {
              Accept: 'application/vnd.github.v3+json'
            }

        // Fetch repositories
        const reposResponse = await axios.get(
          'https://api.github.com/users/farasalgh/repos?sort=updated&direction=desc&per_page=10',
          { headers }
        )
        
        // Filter out 'farasalgh' and take only the 4 newest
        const filteredRepos = reposResponse.data
          .filter((repo: any) => repo.name.toLowerCase() !== 'farasalgh')
          .slice(0, 4)

        // Only try to fetch READMEs if we have a token
        const reposWithReadme = await Promise.all(
          filteredRepos.map(async (repo: any) => {
            if (!token) return repo // Skip README fetch if no token
            
            try {
              // First check if README exists
              const readmeCheck = await axios.get(
                `https://api.github.com/repos/farasalgh/${repo.name}/contents`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.github.v3+json'
                  }
                }
              )

              // Find README file (case insensitive)
              const readmeFile = readmeCheck.data.find((file: any) => 
                file.name.toLowerCase().includes('readme')
              )

              if (readmeFile) {
                const readmeResponse = await axios.get(
                  `https://api.github.com/repos/farasalgh/${repo.name}/readme`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      Accept: 'application/vnd.github.v3.raw'
                    }
                  }
                )
                return {
                  ...repo,
                  readme: readmeResponse.data
                }
              }
              return repo
            } catch (error) {
              if (axios.isAxiosError(error) && error.response?.status === 404) {
                console.log(`No README found for ${repo.name}`)
              } else {
                console.error(`Error fetching README for ${repo.name}:`, error)
              }
              return repo
            }
          })
        )

        setRepos(reposWithReadme)
      } catch (error) {
        console.error('Error fetching repositories:', error)
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setError('GitHub token is invalid or expired. Please check your .env.local file.')
          } else if (error.response?.status === 403) {
            setError('Rate limit exceeded. Please try again later or add a GitHub token.')
          } else {
            setError('Failed to fetch repositories. Please try again later.')
          }
        } else {
          setError('An unexpected error occurred. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
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
            Featured Projects
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore my latest projects, where I combine creativity with technical expertise to build innovative solutions.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-300">
            Loading projects...
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 * index }}
              >
                <ProjectCard
                  title={repo.name}
                  description={repo.description || 'No description available'}
                  language={repo.language || 'N/A'}
                  stars={repo.stargazers_count}
                  url={repo.html_url}
                  readme={repo.readme}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects 