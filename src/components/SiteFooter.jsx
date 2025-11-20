import React from 'react'

const SiteFooter = () => {
  return (
    <footer className="bg-[#050509] border-t border-white/10 py-10">
      <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white/60 text-sm">
        <div>© {new Date().getFullYear()} CONCEPT ARCHIVE</div>
        <nav className="flex gap-6">
          <a href="#deadstock" className="hover:text-white">Shop</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Contact</a>
          <a href="#" className="hover:text-white">Policies</a>
          <a href="#" className="hover:text-white">Social</a>
        </nav>
      </div>
    </footer>
  )
}

export default SiteFooter