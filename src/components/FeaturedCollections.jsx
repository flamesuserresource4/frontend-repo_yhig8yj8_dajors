import React from 'react'
import { motion } from 'framer-motion'

const cards = [
  { title: 'Deadstock Sneakers', tag: 'Verified', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop' },
  { title: 'Concept Apparel', tag: 'Limited Run', img: 'https://images.unsplash.com/photo-1520975922284-7b6831e605bc?q=80&w=1600&auto=format&fit=crop' },
  { title: 'Art & Objects', tag: 'Studio Edition', img: 'https://images.unsplash.com/photo-1551907234-03b7b4f4dcf2?q=80&w=1600&auto=format&fit=crop' },
]

const FeaturedCollections = () => {
  return (
    <section className="relative bg-[#050509] py-24" id="collections">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.a
              key={i}
              href="#deadstock"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i*0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10"
            >
              <img src={c.img} alt={c.title} className="w-full h-[320px] object-cover opacity-90 group-hover:opacity-100 transition"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"/>
              <div className="absolute bottom-0 p-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs tracking-wide bg-white/10 text-white/80 mb-3">{c.tag}</span>
                <h3 className="text-white text-2xl font-semibold">{c.title}</h3>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none" style={{boxShadow:'inset 0 0 120px rgba(138,92,255,0.25)'}}/>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollections