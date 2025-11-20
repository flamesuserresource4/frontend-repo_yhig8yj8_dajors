import React from 'react'

const Newsletter = () => {
  return (
    <section className="relative bg-[#050509] py-24">
      <div className="container mx-auto px-6 md:px-10">
        <div className="rounded-2xl border border-white/10 p-8 md:p-12 bg-white/5 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-white text-2xl md:text-3xl font-bold">Get early access to rare drops</h3>
              <p className="text-white/60 mt-2">Minimal updates. Maximum signal.</p>
            </div>
            <form className="w-full md:w-auto flex gap-3">
              <input type="email" required placeholder="your@email.com" className="w-full md:w-80 px-4 py-3 rounded-full bg-black/60 text-white placeholder-white/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#8a5cff]"/>
              <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:opacity-90 transition-opacity">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter