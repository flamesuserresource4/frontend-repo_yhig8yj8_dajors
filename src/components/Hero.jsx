import React from 'react'
import ColorBends from './ColorBends'
import './HeroSection.css'

export default function HeroSection(){
  return (
    <section className="hero">
      <div className="hero-bg">
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
          transparent
        />
      </div>
      <div className="hero-content">
        <div className="hero-inner">
          <span className="hero-label">CONCEPT DESIGN · DEADSTOCK</span>
          <h1 className="hero-title">Curated deadstock & experimental <span>concept pieces</span></h1>
          <p className="hero-subtitle">Limited sneakers, rare drops and studio-level design objects.</p>
          <div className="hero-actions">
            <button className="btn-primary">Shop Deadstock</button>
            <button className="btn-secondary">Explore Concept Line</button>
          </div>
        </div>
      </div>
    </section>
  )
}
