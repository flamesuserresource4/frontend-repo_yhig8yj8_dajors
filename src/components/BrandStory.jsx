import React from 'react'
import { motion } from 'framer-motion'

const BrandStory = () => {
  return (
    <section id="about" className="relative bg-[#050509] py-24">
      <div className="container mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-white text-3xl md:text-4xl font-bold"
          >
            Designed like a studio. Curated like an archive.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white/70 mt-5 leading-relaxed"
          >
            We merge experimental design methodology with a strict curation ethos. Each release is a limited statement: authentic deadstock pairs, graded and verified; studio concept runs crafted with precision.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden border border-white/10"
        >
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="https://cdn.coverr.co/videos/coverr-running-shoes-3651/1080p.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  )
}

export default BrandStory