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
camera.position.x = 4
camera.position.y = 0
camera.position.z = 0
camera.fov *= 0.8

const map = new THREE.TextureLoader().load(earth)
map.wrapS = THREE.RepeatWrapping
map.offset.x = 1.5708 / (2*Math.PI)
const material = new THREE.MeshBasicMaterial({map})

const sphere = new THREE.SphereBufferGeometry(1, 30, 30)
const mesh = new THREE.Mesh(sphere, material)
scene.add(mesh)

// x=y
// y=z
// z=x



drawCity(59.911491, 10.757933) // Oslo
drawCity(60.192059, 24.945831) // Helsinki
drawCity(0, 0) // 0, 0
drawCity(51.509865, -0.118092) // London
drawCity(40.730610, -73.935242) // NYC
drawCity(37.773972, -122.431297) // San Francisco
drawCity(-33.865143, 151.209900) // Sydney
drawCity(47.3667, 8.5500) // Zürich


function drawCity(lat: number, lon: number) {
  var box = new THREE.SphereGeometry(0.01, 10, 10)
  var material2 = new THREE.MeshBasicMaterial( {color: 0xffffff} )
  var cube = new THREE.Mesh( box, material2 )
  var lat = lat
  var lon = lon
  var coordinates = latAndLongToCartesian(lat, lon)
  cube.position.x = coordinates.x
  cube.position.y = coordinates.y
  cube.position.z = coordinates.z
  scene.add(cube)
}

const box_x = new THREE.BoxGeometry(0.05, 0.05, 0.05)
const material_x = new THREE.MeshBasicMaterial( {color: 0xff0000} )
const cube_x = new THREE.Mesh( box_x, material_x )
cube_x.position.x = 1

const box_y = new THREE.BoxGeometry(0.05, 0.05, 0.05)
const material_y = new THREE.MeshBasicMaterial( {color: 0x00ff00} )
const cube_y = new THREE.Mesh( box_y, material_y )
cube_y.position.y = 1

const box_z = new THREE.BoxGeometry(0.05, 0.05, 0.05)
const material_z = new THREE.MeshBasicMaterial( {color: 0x0000ff} )
const cube_z = new THREE.Mesh( box_z, material_z )
cube_z.position.z = 1

scene.add(cube_x, cube_y, cube_z)

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0x858585)
scene.add(ambientLight)

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  requestAnimationFrame(animate)
  // mesh.rotation.y += 0.001
  //  mesh.rotation.x += 0.001
  // camera.fov *= 0.998;
  camera.updateProjectionMatrix();

  controls.update()
  renderer.render(scene, camera)
}

animate()


// note that the coordinate system of three.js is weird!
function latAndLongToCartesian(latitude: number, longitude: number) {
  var r = 1
  var lat = (latitude)*(Math.PI/180)
  var lon = (longitude)*(Math.PI/180)
  var x = r*Math.cos(lat)*Math.cos(lon)
  var y = r*Math.cos(lat)*Math.sin(lon)
  var z = r*Math.sin(lat)
  return {x: y, y: z, z: x}

}