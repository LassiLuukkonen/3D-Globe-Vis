import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )
camera.position.z = 5

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({color: '#325aa8'})

const mesh = new THREE.Mesh(boxGeometry, material)
scene.add(mesh)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0x858585)
scene.add(ambientLight)

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  requestAnimationFrame(animate)
  // mesh.rotation.y += 0.01
  // mesh.rotation.x += 0.005

  controls.update()
  renderer.render(scene, camera)
}

animate()