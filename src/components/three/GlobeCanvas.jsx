import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'

export default function GlobeCanvas() {
  const mountRef = useRef(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // ── Scene setup ──
    const scene = new THREE.Scene()
    const width = el.clientWidth
    const height = el.clientHeight
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.z = 3.2

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // ── Globe geometry ──
    const geo = new THREE.SphereGeometry(1, 64, 64)

    // Wireframe overlay
    const wireGeo = new THREE.SphereGeometry(1.01, 32, 32)
    const wireMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x1a6ae0 : 0x1428a0,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    })
    const wireMesh = new THREE.Mesh(wireGeo, wireMat)
    scene.add(wireMesh)

    // Solid globe with gradient-like shading
    const mat = new THREE.MeshPhongMaterial({
      color: isDark ? 0x0a1560 : 0x1428a0,
      emissive: isDark ? 0x051030 : 0x0a1040,
      specular: 0x00c8ff,
      shininess: 60,
      transparent: true,
      opacity: 0.88,
    })
    const globe = new THREE.Mesh(geo, mat)
    scene.add(globe)

    // Atmosphere glow ring
    const atmGeo = new THREE.SphereGeometry(1.08, 64, 64)
    const atmMat = new THREE.MeshBasicMaterial({
      color: 0x00c8ff,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    })
    scene.add(new THREE.Mesh(atmGeo, atmMat))

    // Dots scattered on surface (city lights concept)
    const dotCount = 200
    const dotGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(dotCount * 3)
    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = 2 * Math.PI * Math.random()
      const r = 1.02
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const dotMat = new THREE.PointsMaterial({
      color: 0x00c8ff,
      size: 0.015,
      transparent: true,
      opacity: 0.7,
    })
    scene.add(new THREE.Points(dotGeo, dotMat))

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0xffffff, 0.3))
    const dirLight = new THREE.DirectionalLight(0x00c8ff, 1.5)
    dirLight.position.set(5, 3, 5)
    scene.add(dirLight)
    const backLight = new THREE.DirectionalLight(0x1428a0, 0.8)
    backLight.position.set(-5, -3, -5)
    scene.add(backLight)

    // ── Mouse parallax ──
    let mouseX = 0, mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Animate ──
    let animId
    const tick = () => {
      animId = requestAnimationFrame(tick)
      globe.rotation.y += 0.003
      wireMesh.rotation.y += 0.002
      globe.rotation.x += (mouseY * 0.1 - globe.rotation.x) * 0.05
      globe.rotation.z += (mouseX * -0.05 - globe.rotation.z) * 0.05
      renderer.render(scene, camera)
    }
    tick()

    // ── Resize ──
    const onResize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [isDark])

  return <div ref={mountRef} className="w-full h-full" />
}
