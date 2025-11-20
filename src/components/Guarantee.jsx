import React from 'react'
import { Shield, CheckCircle2, Sparkles } from 'lucide-react'

const Item = ({ icon: Icon, title, text }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <div className="text-white font-semibold">{title}</div>
      <div className="text-white/60 text-sm">{text}</div>
    </div>
  </div>
)

const Guarantee = () => {
  return (
    <section className="relative bg-[#050509] py-24">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-8">
          <Item icon={Shield} title="Authentication" text="Every pair inspected and verified by specialists." />
          <Item icon={CheckCircle2} title="Grading" text="Condition, accessories, year — clearly documented." />
          <Item icon={Sparkles} title="Rarity" text="Transparent edition counts and provenance." />
        </div>
      </div>
    </section>
  )
}

export default Guarantee