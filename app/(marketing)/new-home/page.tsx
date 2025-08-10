'use client'

/**
 * @fileoverview Enhanced Modern Home Page for Mold Detox Platform
 * Implements 2025 design trends including glassmorphism, advanced animations,
 * health-specific visualizations, and interactive elements.
 */

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  Shield, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Star,
  Play,
  Zap,
  Heart,
  Brain,
  AlertTriangle,
  Lock,
  Unlock,
  Activity,
  Target,
  Award,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Enhanced Hero Section with Glassmorphism
const EnhancedHero = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated background elements */}
      <MorphingBackground />
      
      {/* Glassmorphic content container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div 
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Glassmorphic badge */}
          <motion.div 
            className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Shield className="mr-2 h-5 w-5 text-green-400" />
            <span className="text-white font-medium">Kajsa's Proven 12-Week Recovery Protocol</span>
          </motion.div>

          {/* Animated main headline */}
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            From{' '}
            <motion.span 
              className="text-red-400"
              animate={{ 
                textShadow: [
                  "0 0 0px #ef4444",
                  "0 0 20px #ef4444",
                  "0 0 0px #ef4444"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Bedridden
            </motion.span>
            {' '}to{' '}
            <motion.span 
              className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              90% Recovered
            </motion.span>
          </motion.h1>

          {/* Subheading with typewriter effect */}
          <TypewriterText 
            text="The only step-by-step program with exact dosing (CSM 4g 4x daily), safety gates (80% drainage readiness required), and real costs ($3,600 total) - no more guessing."
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
          />

          {/* Interactive CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <MagneticButton href="/signup" variant="primary">
              Start Your Recovery Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>
            
            <MagneticButton href="/preview" variant="secondary">
              <Play className="mr-2 h-5 w-5" />
              Watch 2-Min Recovery Demo
            </MagneticButton>
          </div>

          {/* Floating stats */}
          <FloatingStats />
        </motion.div>
      </div>
    </section>
  )
}

// Morphing animated background
const MorphingBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-green-400/30 to-blue-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ top: "20%", left: "10%" }}
      />
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-2xl"
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ top: "60%", right: "15%" }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-gradient-to-r from-yellow-400/20 to-red-500/20 rounded-full blur-xl"
        animate={{
          x: [0, 70, -30, 0],
          y: [0, -60, 20, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ bottom: "20%", left: "60%" }}
      />
    </div>
  )
}

// Typewriter effect component
const TypewriterText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <motion.p 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="border-r-2 border-white ml-1"
      />
    </motion.p>
  )
}

// Floating statistics
const FloatingStats = () => {
  const stats = [
    { label: '87% Success Rate', value: '87%', icon: TrendingUp },
    { label: 'Avg Recovery', value: '12 weeks', icon: Clock },
    { label: 'Money Saved', value: '$5,000+', icon: Award },
    { label: 'Active Members', value: '2,500+', icon: Users }
  ]

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          animate={{
            y: [0, -10, 0],
          }}
          style={{
            animationDelay: `${index * 0.5}s`,
            animationDuration: "3s",
            animationIterationCount: "infinite"
          }}
        >
          <stat.icon className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-sm text-white/70">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Magnetic button component
const MagneticButton = ({ 
  children, 
  href, 
  variant = 'primary',
  ...props 
}: { 
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'secondary'
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    
    const x = (clientX - left - width / 2) * 0.3
    const y = (clientY - top - height / 2) * 0.3
    
    setPosition({ x, y })
  }

  const baseClass = "relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 overflow-hidden group"
  const variantClass = variant === 'primary' 
    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:shadow-2xl hover:shadow-green-500/25"
    : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        className={cn(baseClass, variantClass)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setPosition({ x: 0, y: 0 })}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
    </Link>
  )
}

// Interactive Recovery Journey
const InteractiveRecoveryJourney = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })
  
  const phases = [
    { 
      name: "Exposure Identification", 
      color: "#ef4444", 
      icon: "🔍",
      description: "Room-by-room mold assessment with cost estimates",
      week: "Week 1"
    },
    { 
      name: "Drainage Preparation", 
      color: "#f59e0b", 
      icon: "🚿",
      description: "Open 5 pathways safely before any detox",
      week: "Weeks 1-4"
    },
    { 
      name: "Binder Protocol", 
      color: "#3b82f6", 
      icon: "💊",
      description: "CSM 4g 4x daily with exact timing",
      week: "Weeks 5-8"
    },
    { 
      name: "Antifungal Treatment", 
      color: "#8b5cf6", 
      icon: "🦠",
      description: "Itraconazole 100mg 2x daily overlap",
      week: "Weeks 7-11"
    },
    { 
      name: "Recovery & Maintenance", 
      color: "#22c55e", 
      icon: "✅",
      description: "Retesting and prevention protocols",
      week: "Week 12+"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Your Recovery Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow Kajsa's exact timeline that took her from bedridden to 90% recovered in just 12 weeks
          </p>
        </motion.div>

        {/* Animated timeline */}
        <div className="relative">
          {/* Progress line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-400 via-yellow-400 via-blue-400 via-purple-400 to-green-400 rounded-full"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ top: "5%", bottom: "5%" }}
          />

          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className={`flex items-center mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.3, duration: 0.8 }}
            >
              {/* Content card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <motion.div
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="text-sm font-medium text-gray-500 mb-2">{phase.week}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{phase.name}</h3>
                  <p className="text-gray-600 mb-4">{phase.description}</p>
                  <SafetyGateIndicator isUnlocked={index < 2} />
                </motion.div>
              </div>

              {/* Center icon */}
              <div className="w-2/12 flex justify-center">
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white relative z-10"
                  style={{ 
                    backgroundColor: phase.color,
                    animationDelay: `${index * 0.3}s`,
                  }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  animate={isInView ? {
                    scale: [0.8, 1.1, 1],
                  } : {}}
                >
                  {phase.icon}
                </motion.div>
              </div>

              {/* Spacer */}
              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Safety gate visualization component
const SafetyGateIndicator = ({ isUnlocked = false }: { isUnlocked: boolean }) => {
  return (
    <motion.div className="relative w-32 h-12 mx-auto">
      {/* Gate bars */}
      <motion.div
        className="absolute inset-0 flex justify-between items-center"
        animate={{ opacity: isUnlocked ? 0.3 : 1 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-gray-600 rounded-full"
            animate={{
              height: isUnlocked ? "30%" : "100%",
              y: isUnlocked ? "35%" : "0%"
            }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}
      </motion.div>
      
      {/* Lock/Unlock indicator */}
      <motion.div
        className={`absolute inset-0 flex items-center justify-center text-2xl ${
          isUnlocked ? "text-green-500" : "text-red-500"
        }`}
        animate={{ scale: isUnlocked ? 1.2 : 1 }}
      >
        {isUnlocked ? <Unlock className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
      </motion.div>
    </motion.div>
  )
}

// Problem/Solution section with glassmorphism
const ProblemSolutionSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const problems = [
    {
      problem: "Generic protocols without exact dosing",
      solution: "Kajsa's exact protocol: CSM 4g 4x daily, Itraconazole 100mg 2x daily",
      icon: "💊"
    },
    {
      problem: "No safety gates - patients start binders too early",
      solution: "Enforced 80% drainage readiness for 7 days before binder access",
      icon: "🛡️"
    },
    {
      problem: "Hidden costs and vague timelines",
      solution: "Complete cost breakdown: $15 VCS to $400 mycotoxin tests, ~$3,600 total",
      icon: "💰"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-r from-red-900 via-gray-900 to-red-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            The Problem With Other Approaches
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Why generic mold protocols fail and how our approach is different
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              {/* Problem card */}
              <motion.div
                className="bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-2xl p-6 mb-6"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <AlertTriangle className="h-8 w-8 text-red-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">The Problem</h3>
                <p className="text-red-200">{item.problem}</p>
              </motion.div>

              {/* Arrow */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="h-8 w-8 text-white transform rotate-90" />
                </motion.div>
              </div>

              {/* Solution card */}
              <motion.div
                className="bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-2xl p-6"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">Our Solution</h3>
                <p className="text-green-200">{item.solution}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced pricing section
const EnhancedPricing = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Start Your Recovery Today
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Join the 87% who successfully recover using our proven system
          </p>
        </motion.div>

        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center">
            <div className="text-6xl font-bold text-white mb-4">$149</div>
            <div className="text-white/80 mb-6">One-time payment, lifetime access</div>
            
            <ul className="text-left text-white/90 mb-8 space-y-3">
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Kajsa's exact 12-week protocol
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Safety gates prevent reactions
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Complete cost breakdown ($3,600)
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                9 interactive tools
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Medical advocacy resources
              </li>
            </ul>

            <MagneticButton href="/signup" variant="primary">
              Get Instant Access
              <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>

            <div className="mt-6 text-sm text-white/60">
              ✓ 30-day money-back guarantee ✓ No monthly fees
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main component
export default function EnhancedHomePage() {
  return (
    <div className="min-h-screen">
      <EnhancedHero />
      <InteractiveRecoveryJourney />
      <ProblemSolutionSection />
      <EnhancedPricing />
    </div>
  )
}
