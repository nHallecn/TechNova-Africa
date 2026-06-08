import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'

export default function ParticleField({ count = 120 }) {
  const mountRef = useRef(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const scene = new THREE.Scene()
    const w = el.clientWidth
    const h = el.clientHeight
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    // Particles
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5
      vel[i * 3] = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 2] = 0
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))

    const mat = new THREE.PointsMaterial({
      color: isDark ? 0x00c8ff : 0x1428a0,
      size: 0.04,
      transparent: true,
      opacity: isDark ? 0.6 : 0.3,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    let animId
    const tick = () => {
      animId = requestAnimationFrame(tick)
      const positions = geo.attributes.position.array
      for (let i = 0; i < count; i++) {
        positions[i * 3] += vel[i * 3]
        positions[i * 3 + 1] += vel[i * 3 + 1]
        if (Math.abs(positions[i * 3]) > 6) vel[i * 3] *= -1
        if (Math.abs(positions[i * 3 + 1]) > 4) vel[i * 3 + 1] *= -1
      }
      geo.attributes.position.needsUpdate = true
      points.rotation.y += 0.0005
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      const nw = el.clientWidth
      const nh = el.clientHeight
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
