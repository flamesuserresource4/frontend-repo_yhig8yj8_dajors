import React, { useEffect, useRef } from 'react'

/*
  ColorBends-like animated gradient background using a lightweight WebGL fragment shader.
  Replicates:
  - flowing, warped neon gradient ribbons
  - diagonal rotation (~30°)
  - slow fluid movement (speed)
  - subtle grain/noise
  - interactive pointer parallax
  - transparent, layered look over deep charcoal base
*/

const fragShader = `#ifdef GL_ES\nprecision highp float;\n#endif\n
uniform vec2 u_res;\nuniform float u_time;\nuniform vec2 u_mouse;\nuniform float u_rotation;\nuniform float u_speed;\nuniform float u_scale;\nuniform float u_freq;\nuniform float u_warp;\nuniform float u_mouseInf;\nuniform float u_parallax;\nuniform float u_noise;\nuniform vec3 u_c1;\nuniform vec3 u_c2;\nuniform vec3 u_c3;\n
// Hash & noise helpers\nfloat hash(vec2 p){return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);}\nfloat noise(vec2 p){\n  vec2 i = floor(p);\n  vec2 f = fract(p);\n  vec2 u = f*f*(3.0-2.0*f);\n  float n = mix(mix(hash(i+vec2(0.0,0.0)), hash(i+vec2(1.0,0.0)), u.x),\n                mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);\n  return n;\n}\n
// fbm for smooth ribbons\nfloat fbm(vec2 p){\n  float v = 0.0;\n  float a = 0.5;\n  for(int i=0;i<5;i++){\n    v += a*noise(p);\n    p *= 2.0;\n    a *= 0.5;\n  }\n  return v;\n}\n
void main(){\n  vec2 uv = (gl_FragCoord.xy / u_res.xy);\n  // center and aspect-correct\n  vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy)/u_res.y;\n
  // rotate space by u_rotation degrees\n  float ang = radians(u_rotation);\n  mat2 R = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));\n  p = R * p * u_scale;\n
  // parallax based on mouse, subtle\n  vec2 m = (u_mouse - 0.5) * u_parallax;\n  p += m;\n
  // animated warp fields\n  float t = u_time * u_speed;\n  float n1 = fbm(p * u_freq + vec2(t, 0.0));\n  float n2 = fbm(p * (u_freq*0.8) - vec2(0.0, t*0.8));\n  float warp = fbm(p*2.0 + n1*1.5 + t) * u_warp;\n  float bands = sin((p.y + warp)*3.14159*1.2) * 0.5 + 0.5;\n
  // blend three neon colors along ribbons with additional noise variation\n  float mask1 = smoothstep(0.0, 0.6, bands);\n  float mask2 = smoothstep(0.3, 1.0, 1.0-bands);\n  float mixv = clamp(n1*0.6 + n2*0.4, 0.0, 1.0);\n  vec3 col = mix(u_c1, u_c2, mixv);\n  col = mix(col, u_c3, mask2*0.85);\n
  // dark base and transparent layering via soft vignette\n  float vign = smoothstep(1.2, 0.2, length(p*1.2));\n  col *= vign;\n
  // subtle grain/noise overlay\n  float g = noise(gl_FragCoord.xy*0.5 + t*8.0);\n  col += (g-0.5) * u_noise;\n
  // final gamma and clamp\n  col = pow(max(col, 0.0), vec3(1.0/1.1));\n
  gl_FragColor = vec4(col, 0.9); // slightly transparent for layered look\n}`

const vertShader = `#ifdef GL_ES\nprecision highp float;\n#endif\nattribute vec2 a_pos;\nvoid main(){\n  gl_Position = vec4(a_pos, 0.0, 1.0);\n}`

function createShader(gl, type, source){
  const sh = gl.createShader(type)
  gl.shaderSource(sh, source)
  gl.compileShader(sh)
  if(!gl.getShaderParameter(sh, gl.COMPILE_STATUS)){
    console.error('Shader compile error:', gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

function createProgram(gl, vsSource, fsSource){
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource)
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource)
  if(!vs || !fs) return null
  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){
    console.error('Program link error:', gl.getProgramInfoLog(prog))
    gl.deleteProgram(prog)
    return null
  }
  return prog
}

const ColorBends = ({
  colors = ['#ff5c7a', '#8a5cff', '#00ffd1'],
  rotation = 30,
  speed = 0.3,
  scale = 1.2,
  frequency = 1.4,
  warpStrength = 1.2,
  mouseInfluence = 0.8,
  parallax = 0.6,
  noise = 0.08,
  className = ''
}) => {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const startRef = useRef(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const glRef = useRef(null)
  const progRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true })
    if(!gl) return
    glRef.current = gl

    const prog = createProgram(gl, vertShader, fragShader)
    if(!prog) return
    progRef.current = prog
    gl.useProgram(prog)

    // fullscreen quad
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    const verts = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ])
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = {
      res: gl.getUniformLocation(prog, 'u_res'),
      time: gl.getUniformLocation(prog, 'u_time'),
      mouse: gl.getUniformLocation(prog, 'u_mouse'),
      rotation: gl.getUniformLocation(prog, 'u_rotation'),
      speed: gl.getUniformLocation(prog, 'u_speed'),
      scale: gl.getUniformLocation(prog, 'u_scale'),
      freq: gl.getUniformLocation(prog, 'u_freq'),
      warp: gl.getUniformLocation(prog, 'u_warp'),
      mouseInf: gl.getUniformLocation(prog, 'u_mouseInf'),
      parallax: gl.getUniformLocation(prog, 'u_parallax'),
      noise: gl.getUniformLocation(prog, 'u_noise'),
      c1: gl.getUniformLocation(prog, 'u_c1'),
      c2: gl.getUniformLocation(prog, 'u_c2'),
      c3: gl.getUniformLocation(prog, 'u_c3'),
    }

    function hexToRgb(hex){
      const m = hex.replace('#','')
      const bigint = parseInt(m.length === 3 ? m.split('').map(c=>c+c).join('') : m, 16)
      return [((bigint>>16)&255)/255, ((bigint>>8)&255)/255, (bigint&255)/255]
    }

    const c1 = hexToRgb(colors[0])
    const c2 = hexToRgb(colors[1])
    const c3 = hexToRgb(colors[2])

    function resize(){
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const W = Math.floor(w * dpr)
      const H = Math.floor(h * dpr)
      if(canvas.width !== W || canvas.height !== H){
        canvas.width = W; canvas.height = H
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(u.res, canvas.width, canvas.height)
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouseRef.current.x = x
      mouseRef.current.y = y
    }

    const onTouchMove = (e) => {
      if(!e.touches || e.touches.length === 0) return
      const rect = canvas.getBoundingClientRect()
      const t = e.touches[0]
      const x = (t.clientX - rect.left) / rect.width
      const y = (t.clientY - rect.top) / rect.height
      mouseRef.current.x = x
      mouseRef.current.y = y
    }

    const container = canvas.parentElement
    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('touchmove', onTouchMove, { passive: true })
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    startRef.current = performance.now()

    function frame(now){
      const t = (now - startRef.current) / 1000
      gl.useProgram(prog)
      gl.uniform1f(u.time, t)
      gl.uniform2f(u.mouse, mouseRef.current.x, 1.0 - mouseRef.current.y)
      gl.uniform1f(u.rotation, rotation)
      gl.uniform1f(u.speed, speed)
      gl.uniform1f(u.scale, scale)
      gl.uniform1f(u.freq, frequency)
      gl.uniform1f(u.warp, warpStrength)
      gl.uniform1f(u.mouseInf, mouseInfluence)
      gl.uniform1f(u.parallax, parallax * 0.2) // keep subtle
      gl.uniform1f(u.noise, noise)
      gl.uniform3f(u.c1, c1[0], c1[1], c1[2])
      gl.uniform3f(u.c2, c2[0], c2[1], c2[2])
      gl.uniform3f(u.c3, c3[0], c3[1], c3[2])

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('touchmove', onTouchMove)
      ro.disconnect()
      if(prog) gl.deleteProgram(prog)
    }
  }, [colors, rotation, speed, scale, frequency, warpStrength, mouseInfluence, parallax, noise])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  )
}

export default ColorBends
