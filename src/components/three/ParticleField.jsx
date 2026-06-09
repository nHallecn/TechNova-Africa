import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'

export default function ParticleField({ count = 100 }) {
  const mountRef = useRef(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const scene = new THREE.Scene()
    const w = el.clientWidth, h = el.clientHeight
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 14
      pos[i*3+1] = (Math.random() - 0.5) * 10
      pos[i*3+2] = (Math.random() - 0.5) * 5
      vel[i*3]   = (Math.random() - 0.5) * 0.003
      vel[i*3+1] = (Math.random() - 0.5) * 0.003
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))

    const mat = new THREE.PointsMaterial({
      color: isDark ? 0x0071e3 : 0x0071e3,
      size: 0.035,
      transparent: true,
      opacity: isDark ? 0.5 : 0.2,
    })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    let animId
    const tick = () => {
      animId = requestAnimationFrame(tick)
      const p = geo.attributes.position.array
      for (let i = 0; i < count; i++) {
        p[i*3]   += vel[i*3]
        p[i*3+1] += vel[i*3+1]
        if (Math.abs(p[i*3])   > 7) vel[i*3]   *= -1
        if (Math.abs(p[i*3+1]) > 5) vel[i*3+1] *= -1
      }
      geo.attributes.position.needsUpdate = true
      points.rotation.y += 0.0004
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      const nw = el.clientWidth, nh = el.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [isDark])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}
