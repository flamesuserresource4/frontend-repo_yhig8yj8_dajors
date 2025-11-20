import React from 'react'
import { motion } from 'framer-motion'

const products = Array.from({ length: 8 }).map((_, i) => ({
  id: i+1,
  name: `Archive Pair ${i+1}`,
  price: 420 + i * 20,
  rarity: `1 of ${12 - (i%4)*2}`,
  img: `https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1600&auto=format&fit=crop`
}))

const ProductGrid = () => {
  return (
    <section id="deadstock" className="relative bg-[#050509] py-24">
      <div className="container mx-auto px-6 md:px-10">
        <div className="mb-8">
          <h2 className="text-white text-3xl md:text-4xl font-bold">Deadstock Archive</h2>
          <p className="text-white/60 mt-2">Curated selections from rare drops.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i*0.05 }}
              className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="relative">
                <img src={p.img} alt={p.name} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition" style={{ boxShadow: 'inset 0 0 120px rgba(0,255,209,0.18)'}}/>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-white">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-white/80">${p.price}</span>
                </div>
                <div className="text-xs text-white/50 mt-1">Rarity: {p.rarity}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid