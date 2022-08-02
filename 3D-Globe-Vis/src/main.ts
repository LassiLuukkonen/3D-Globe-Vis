import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import earth from '../earth.jpg'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setClearColor(0x000814)
camera.position.z = 3

const material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load(earth)})

const sphere = new THREE.SphereBufferGeometry(1, 30, 30)


const mesh = new THREE.Mesh(sphere, material)
scene.add(mesh)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0x858585)
scene.add(ambientLight)

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  requestAnimationFrame(animate)
  mesh.rotation.y += 0.001
  mesh.rotation.x += 0.001
  camera.fov *= 0.998;
  camera.updateProjectionMatrix();

  controls.update()
  renderer.render(scene, camera)
}

animate()