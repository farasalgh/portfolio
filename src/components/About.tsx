'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import * as SimpleIcons from 'simple-icons'

const skills = [
  { 
    name: 'React', 
    icon: SimpleIcons.siReact,
    description: 'Building modern, responsive user interfaces with React hooks and context API',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  { 
    name: 'Next.js', 
    icon: SimpleIcons.siNextdotjs,
    description: 'Server-side rendering, static site generation, and API routes',
    color: 'bg-gradient-to-br from-black to-gray-800'
  },
  { 
    name: 'TypeScript', 
    icon: SimpleIcons.siTypescript,
    description: 'Type-safe development with interfaces, generics, and type inference',
    color: 'bg-gradient-to-br from-blue-600 to-blue-400'
  },
  { 
    name: 'Node.js', 
    icon: SimpleIcons.siNodedotjs,
    description: 'Building scalable backend services and RESTful APIs',
    color: 'bg-gradient-to-br from-green-500 to-emerald-500'
  },
  { 
    name: 'Express', 
    icon: SimpleIcons.siExpress,
    description: 'Creating robust web applications and APIs with Express.js',
    color: 'bg-gradient-to-br from-gray-600 to-gray-400'
  },
  { 
    name: 'Laravel', 
    icon: SimpleIcons.siLaravel,
    description: 'Building elegant web applications with Laravel PHP framework',
    color: 'bg-gradient-to-br from-red-500 to-red-700'
  },
  { 
    name: 'Flask', 
    icon: SimpleIcons.siFlask,
    description: 'Developing lightweight Python web applications with Flask',
    color: 'bg-gradient-to-br from-gray-800 to-gray-600'
  },
  { 
    name: 'MongoDB', 
    icon: SimpleIcons.siMongodb,
    description: 'NoSQL database design and management with MongoDB',
    color: 'bg-gradient-to-br from-green-600 to-green-400'
  },
  { 
    name: 'PostgreSQL', 
    icon: SimpleIcons.siPostgresql,
    description: 'Relational database design and SQL query optimization',
    color: 'bg-gradient-to-br from-blue-700 to-blue-500'
  },
  { 
    name: 'Tailwind CSS', 
    icon: SimpleIcons.siTailwindcss,
    description: 'Utility-first CSS framework for rapid UI development',
    color: 'bg-gradient-to-br from-cyan-500 to-blue-500'
  },
  { 
    name: 'Git', 
    icon: SimpleIcons.siGit,
    description: 'Version control and collaborative development workflows',
    color: 'bg-gradient-to-br from-orange-500 to-red-500'
  },
  { 
    name: 'Docker', 
    icon: SimpleIcons.siDocker,
    description: 'Containerization and deployment automation',
    color: 'bg-gradient-to-br from-blue-400 to-blue-600'
  }
]

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  return (
    <section id="about" className="relative py-20 bg-gray-50 dark:bg-gray-800">
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-16 h-16 bg-blue-400/20 dark:bg-blue-400/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-purple-400/20 dark:bg-purple-400/10 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h2
            className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Me
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I&apos;m a passionate Full Stack Developer with a strong foundation in modern web technologies.
              I specialize in building responsive, user-friendly applications using React, Node.js, and TypeScript.
              My goal is to create efficient and scalable solutions that provide great user experiences.
            </motion.p>
            
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.h3
                className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Skills
              </motion.h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="relative cursor-pointer group"
                    onClick={() => setSelectedSkill(index)}
                    onHoverStart={() => setHoveredSkill(index)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95, rotate: -2 }}
                  >
                    <motion.div
                      className={`relative overflow-hidden rounded-xl shadow-lg p-4 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 transition-all duration-300 ${
                        hoveredSkill === index ? skill.color : 'bg-white dark:bg-gray-700'
                      }`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="flex items-center justify-center mb-2">
                        <motion.div 
                          className="w-8 h-8"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          style={{ color: `#${skill.icon.hex}` }}
                          dangerouslySetInnerHTML={{ __html: skill.icon.svg }}
                        />
                      </div>
                      <motion.h4 
                        className={`text-center font-medium ${
                          hoveredSkill === index ? 'text-white' : 'text-gray-900 dark:text-white'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill.name}
                      </motion.h4>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Skill Modal */}
      <AnimatePresence>
        {selectedSkill !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative max-w-md w-full rounded-xl shadow-2xl p-6 ${
                skills[selectedSkill].color
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-200"
                onClick={() => setSelectedSkill(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-center justify-center mb-4">
                <div 
                  className="w-12 h-12"
                  style={{ color: `#${skills[selectedSkill].icon.hex}` }}
                  dangerouslySetInnerHTML={{ __html: skills[selectedSkill].icon.svg }}
                />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                {skills[selectedSkill].name}
              </h3>
              <p className="text-white/90 text-center">
                {skills[selectedSkill].description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default About 