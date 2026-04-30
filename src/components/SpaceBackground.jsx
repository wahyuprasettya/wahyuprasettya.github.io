import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function SpaceBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 34

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    mount.appendChild(renderer.domElement)

    const starCount = 1200
    const positions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 130
      positions[i * 3 + 1] = (Math.random() - 0.5) * 90
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
    }

    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starMaterial = new THREE.PointsMaterial({
      color: 0x9cecff,
      size: 0.09,
      transparent: true,
      opacity: 0.86
    })
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    const planetGeometry = new THREE.SphereGeometry(5.2, 48, 48)
    const planetMaterial = new THREE.MeshStandardMaterial({
      color: 0x271256,
      emissive: 0x120622,
      roughness: 0.72,
      metalness: 0.12
    })
    const planet = new THREE.Mesh(planetGeometry, planetMaterial)
    planet.position.set(18, -10, -12)
    scene.add(planet)

    const ringGeometry = new THREE.RingGeometry(6.4, 8.6, 96)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.position.copy(planet.position)
    ring.rotation.x = Math.PI / 2.8
    ring.rotation.y = Math.PI / 8
    scene.add(ring)

    const ambient = new THREE.AmbientLight(0x6d7cff, 1.2)
    const light = new THREE.PointLight(0x22d3ee, 80, 80)
    light.position.set(-20, 16, 22)
    scene.add(ambient, light)

    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (event.clientY / window.innerHeight - 0.5) * 2
    }

    let resizeFrame = 0
    const handleResize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(() => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.0007
      stars.rotation.x += 0.00025
      planet.rotation.y += 0.003
      ring.rotation.z += 0.0014
      camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.025
      camera.position.y += (-mouse.y * 2.2 - camera.position.y) * 0.025
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      cancelAnimationFrame(resizeFrame)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      scene.remove(stars, planet, ring, ambient, light)
      starGeometry.dispose()
      starMaterial.dispose()
      planetGeometry.dispose()
      planetMaterial.dispose()
      ringGeometry.dispose()
      ringMaterial.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <>
      <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0 bg-radial-space" aria-hidden="true" />
      <div className="shooting-star" aria-hidden="true" />
    </>
  )
}
