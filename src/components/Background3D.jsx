import { useEffect, useRef } from 'react'

function Background3D() {
  const canvasRef = useRef(null)

  useEffect(() => {
    let animationFrame = 0
    let resizeHandler = null
    let scrollHandler = null
    let renderer = null
    let scene = null
    let disposed = false

    const init = () => {
      const THREE = window.THREE
      const canvas = canvasRef.current
      if (!THREE || !canvas || disposed) return false

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)

      scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200)
      camera.position.z = 18

      scene.add(new THREE.AmbientLight(0xffe4a3, 0.68))

      const keyLight = new THREE.DirectionalLight(0xffcf66, 1.35)
      keyLight.position.set(8, 12, 10)
      scene.add(keyLight)

      const warmFill = new THREE.PointLight(0xff4d18, 0.38, 60)
      warmFill.position.set(-10, 5, 8)
      scene.add(warmFill)

      const material = (color, roughness = 0.75) => new THREE.MeshStandardMaterial({ color, roughness })
      const doubleMaterial = (color, roughness = 0.75) => new THREE.MeshStandardMaterial({
        color,
        roughness,
        side: THREE.DoubleSide,
      })

      function makeMeatStrip() {
        const group = new THREE.Group()
        const colors = [0x8d1b0b, 0xa62912, 0xc3411e, 0x76200d]
        const count = 3 + Math.floor(Math.random() * 3)

        for (let i = 0; i < count; i += 1) {
          const stripGroup = new THREE.Group()
          const length = 0.62 + Math.random() * 0.38
          const height = 0.12 + Math.random() * 0.05
          const depth = 0.2 + Math.random() * 0.08
          const baseColor = colors[Math.floor(Math.random() * colors.length)]
          const stripMat = material(baseColor, 0.88)
          const body = new THREE.Mesh(new THREE.BoxGeometry(length, height, depth), stripMat)
          body.scale.set(1, 0.9, 1)
          stripGroup.add(body)

          const topFace = new THREE.Mesh(
            new THREE.BoxGeometry(length * 0.94, 0.018, depth * 0.9),
            material(0xd95a2a, 0.82),
          )
          topFace.position.y = height / 2 + 0.011
          stripGroup.add(topFace)

          const sideShadow = new THREE.Mesh(
            new THREE.BoxGeometry(length * 0.94, 0.02, depth * 0.92),
            material(0x4b1709, 0.94),
          )
          sideShadow.position.y = -height / 2 - 0.006
          stripGroup.add(sideShadow)

          const roundedCorners = [
            [-length / 2, height / 2, 0],
            [length / 2, height / 2, 0],
            [-length / 2, -height / 2, 0],
            [length / 2, -height / 2, 0],
          ]

          roundedCorners.forEach(([x, y, z]) => {
            const corner = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), stripMat)
            corner.scale.set(1.2, 0.7, 1.45)
            corner.position.set(x, y, z)
            stripGroup.add(corner)
          })

          for (let j = 0; j < 2 + Math.floor(Math.random() * 2); j += 1) {
            const char = new THREE.Mesh(new THREE.BoxGeometry(length * 0.18, 0.012, 0.025), material(0x241007, 0.96))
            char.position.set(-length * 0.28 + j * length * 0.28, height / 2 + 0.026, -depth * 0.08 + Math.random() * depth * 0.16)
            char.rotation.y = (Math.random() - 0.5) * 0.6
            char.rotation.z = (Math.random() - 0.5) * 0.5
            stripGroup.add(char)
          }

          stripGroup.position.set((Math.random() - 0.5) * 0.24, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.14)
          stripGroup.rotation.set((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.9)
          group.add(stripGroup)
        }

        return group
      }

      function makeLimeHalf() {
        const group = new THREE.Group()
        const rind = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.16, 32), material(0x368a37, 0.66))
        rind.rotation.x = Math.PI / 2
        group.add(rind)

        const flesh = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.18, 32), material(0xcfe45a, 0.52))
        flesh.rotation.x = Math.PI / 2
        flesh.position.z = 0.012
        group.add(flesh)

        for (let i = 0; i < 8; i += 1) {
          const wedge = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.35, 0.012), material(0xf2f5a1, 0.48))
          wedge.position.z = 0.112
          wedge.rotation.z = (i * Math.PI) / 8
          group.add(wedge)
        }

        const cutFace = new THREE.Mesh(new THREE.CircleGeometry(0.31, 32), doubleMaterial(0xe6f26a, 0.5))
        cutFace.position.z = 0.118
        group.add(cutFace)
        return group
      }

      function makeCilantroChop() {
        const group = new THREE.Group()
        const greens = [0x2fa43c, 0x3ab54a, 0x1f7f31, 0x54c85e]

        for (let i = 0; i < 7; i += 1) {
          const leaf = new THREE.Mesh(
            new THREE.BoxGeometry(0.12 + Math.random() * 0.06, 0.025, 0.055 + Math.random() * 0.035),
            material(greens[Math.floor(Math.random() * greens.length)], 0.82),
          )
          leaf.position.set((Math.random() - 0.5) * 0.42, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.24)
          leaf.rotation.set((Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 1.2, Math.random() * Math.PI)
          group.add(leaf)
        }

        return group
      }

      function makePineappleChunk() {
        const group = new THREE.Group()
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.42, 0.5), material(0xffc83d, 0.58))
        body.rotation.set(0.08, 0.18, 0.16)
        group.add(body)

        for (let i = -1; i <= 1; i += 1) {
          const groove = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.028, 0.04), material(0xe0a21b, 0.7))
          groove.position.y = i * 0.13
          groove.position.z = 0.26
          groove.rotation.z = 0.22
          group.add(groove)
        }

        const brownedEdge = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.08, 0.05), material(0x9a4a16, 0.86))
        brownedEdge.position.y = -0.23
        brownedEdge.position.z = 0.25
        group.add(brownedEdge)
        return group
      }

      const ingredientTypes = [
        { fn: makeMeatStrip, weight: 8 },
        { fn: makeLimeHalf, weight: 5 },
        { fn: makeCilantroChop, weight: 4 },
        { fn: makePineappleChunk, weight: 5 },
      ]

      function pickType() {
        const total = ingredientTypes.reduce((sum, type) => sum + type.weight, 0)
        let value = Math.random() * total

        for (const type of ingredientTypes) {
          value -= type.weight
          if (value <= 0) return type.fn
        }

        return ingredientTypes[0].fn
      }

      function getViewBounds() {
        const verticalFov = (camera.fov * Math.PI) / 180
        const height = 2 * Math.tan(verticalFov / 2) * camera.position.z
        const width = height * camera.aspect
        return { width, height }
      }

      const items = []
      const count = window.innerWidth < 760 ? 24 : 42

      function resetFallingItem(item, bounds, startAbove = true) {
        item.x = (Math.random() - 0.5) * bounds.width * 1.26
        item.y = startAbove
          ? bounds.height * 0.68 + Math.random() * bounds.height * 0.75
          : (Math.random() - 0.5) * bounds.height * 1.35
        item.baseY = item.y
        item.z = -2 - Math.random() * 8
        item.vx = (Math.random() - 0.5) * 0.012
        item.vy = -(0.018 + Math.random() * 0.018)
        item.rx = Math.random() * Math.PI * 2
        item.ry = Math.random() * Math.PI * 2
        item.rz = Math.random() * Math.PI * 2
        item.wrx = (Math.random() - 0.5) * 0.005
        item.wry = (Math.random() - 0.5) * 0.006
        item.wrz = (Math.random() - 0.5) * 0.005
        item.driftPhase = Math.random() * Math.PI * 2
        item.driftSpeed = 0.006 + Math.random() * 0.008
        item.driftAmp = 0.012 + Math.random() * 0.025
        item.mesh.scale.setScalar(0.5 + Math.random() * 0.58)
      }

      function spawnItem(index) {
        const bounds = getViewBounds()
        const mesh = pickType()()
        scene.add(mesh)

        const item = {
          mesh,
          x: 0,
          y: 0,
          z: 0,
          vx: 0,
          vy: 0,
          rx: Math.random() * Math.PI * 2,
          ry: Math.random() * Math.PI * 2,
          rz: Math.random() * Math.PI * 2,
          wrx: 0,
          wry: 0,
          wrz: 0,
          delay: 0,
          parallaxFactor: 0.12 + Math.random() * 0.28,
          baseY: 0,
          driftPhase: 0,
          driftSpeed: 0,
          driftAmp: 0,
        }

        resetFallingItem(item, bounds, index > count * 0.45)
        items.push(item)
      }

      for (let i = 0; i < count; i += 1) spawnItem(i)

      let scrollY = 0
      let targetScrollY = window.scrollY
      let frame = 0

      scrollHandler = () => {
        targetScrollY = window.scrollY
      }

      resizeHandler = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      function animate() {
        if (disposed) return
        animationFrame = window.requestAnimationFrame(animate)
        frame += 1
        scrollY += (targetScrollY - scrollY) * 0.06

        const bounds = getViewBounds()
        const denominator = document.body.scrollHeight - window.innerHeight || 1
        const scrollFraction = scrollY / denominator

        items.forEach((item) => {
          if (frame < item.delay) return

          item.x += item.vx + Math.sin(frame * item.driftSpeed + item.driftPhase) * item.driftAmp
          item.baseY += item.vy
          item.y = item.baseY - scrollFraction * bounds.height * item.parallaxFactor * 2.8

          if (item.baseY < -bounds.height * 0.8 || item.x < -bounds.width * 0.72 || item.x > bounds.width * 0.72) {
            resetFallingItem(item, bounds, true)
          }

          item.rx += item.wrx
          item.ry += item.wry
          item.rz += item.wrz
          item.mesh.position.set(item.x, item.y, item.z)
          item.mesh.rotation.set(item.rx, item.ry, item.rz)
        })

        renderer.render(scene, camera)
      }

      window.addEventListener('scroll', scrollHandler, { passive: true })
      window.addEventListener('resize', resizeHandler)
      resizeHandler()
      animate()
      return true
    }

    let attempts = 0
    const retry = window.setInterval(() => {
      attempts += 1
      if (init() || attempts > 20) window.clearInterval(retry)
    }, 100)

    return () => {
      disposed = true
      window.clearInterval(retry)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
      if (resizeHandler) window.removeEventListener('resize', resizeHandler)
      if (renderer) renderer.dispose()
      if (scene) {
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose()
          if (object.material) object.material.dispose()
        })
      }
    }
  }, [])

  return <canvas className="bg-canvas" ref={canvasRef} aria-hidden="true" />
}

export default Background3D
