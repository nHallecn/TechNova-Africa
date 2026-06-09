import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'

export default function GlobeCanvas() {
  const mountRef = useRef(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const scene = new THREE.Scene()
    const w = el.clientWidth
    const h = el.clientHeight
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
    camera.position.z = 3.2

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    /* ── Globe body ── */
    const globeGeo = new THREE.SphereGeometry(1, 64, 64)
    const globeMat = new THREE.MeshPhongMaterial({
      color: isDark ? 0x0a1560 : 0x1a3fa0,
      emissive: isDark ? 0x030820 : 0x0a1f60,
      specular: 0x0071e3,
      shininess: 80,
      transparent: true,
      opacity: 0.9,
    })
    const globe = new THREE.Mesh(globeGeo, globeMat)
    scene.add(globe)

    /* ── Wireframe ── */
    const wireGeo = new THREE.SphereGeometry(1.015, 28, 28)
    const wireMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0071e3 : 0x0071e3,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.18 : 0.1,
    })
    const wire = new THREE.Mesh(wireGeo, wireMat)
    scene.add(wire)

    /* ── Atmosphere glow ── */
    const atmGeo = new THREE.SphereGeometry(1.1, 64, 64)
    const atmMat = new THREE.MeshBasicMaterial({
      color: 0x0071e3,
      transparent: true,
      opacity: isDark ? 0.07 : 0.04,
      side: THREE.BackSide,
    })
    scene.add(new THREE.Mesh(atmGeo, atmMat))

    /* ── City dots ── */
    const DOT_COUNT = 220
    const dotGeo = new THREE.BufferGeometry()
    const dotPos = new Float32Array(DOT_COUNT * 3)
    for (let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = 2 * Math.PI * Math.random()
      const r = 1.025
      dotPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      dotPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      dotPos[i * 3 + 2] = r * Math.cos(phi)
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3))
    const dotMat = new THREE.PointsMaterial({
      color: 0x00c8ff,
      size: 0.014,
      transparent: true,
      opacity: isDark ? 0.75 : 0.5,
    })
    scene.add(new THREE.Points(dotGeo, dotMat))

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, isDark ? 0.25 : 0.5))
    const key = new THREE.DirectionalLight(0x0071e3, isDark ? 2 : 1.2)
    key.position.set(5, 3, 5)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0x00c8ff, 0.6)
    fill.position.set(-4, -2, -3)
    scene.add(fill)

    /* ── Mouse parallax ── */
    let mx = 0, my = 0
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    /* ── Animate ── */
    let animId
    const tick = () => {
      animId = requestAnimationFrame(tick)
      globe.rotation.y += 0.003
      wire.rotation.y  += 0.002
      wire.rotation.x  += 0.001
      globe.rotation.x += (my * 0.08 - globe.rotation.x) * 0.04
      globe.rotation.z += (mx * -0.04 - globe.rotation.z) * 0.04
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
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [isDark])

  return <div ref={mountRef} className="w-full h-full" />
}
