import React from 'react'
import Spline from '@splinetool/react-spline'
import ColorBends from './ColorBends'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050509]">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={30}
          speed={0.3}
          scale={1.2}
          frequency={1.4}
          warpStrength={1.2}
          mouseInfluence={0.8}
          parallax={0.6}
          noise={0.08}
        />
        {/* subtle dark overlay to keep readability, allow pointer to pass through */}
        <div className="absolute inset-0 bg-[#050509]/60 pointer-events-none" />
      </div>

      {/* Spline 3D object - centered and responsive */}
      <div className="absolute inset-0">
        <Spline 
          scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-6 md:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] max-w-5xl"
          >
            Curated Deadstock & Experimental Concept Pieces
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
            className="text-white/80 mt-5 text-lg md:text-xl max-w-2xl"
          >
            Limited sneakers, rare drops, and studio-level design objects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#deadstock"
              className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:opacity-90 transition-opacity"
            >
              Shop Deadstock
            </a>
            <a
              href="#concept"
              className="px-6 py-3 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Explore Concept Line
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero