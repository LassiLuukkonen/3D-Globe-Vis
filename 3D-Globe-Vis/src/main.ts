import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import earth from '../earth.jpg'
import { RedFormat } from 'three'

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

// import { Database } from 'sqlite3'

// // Open a SQLite database, stored in the file db.sqlite
// const db = new Database('db.sqlite')

// // Fetch a random integer between -99 and +99
// db.all(
//   'SELECT *',
//   (_, res) => console.log(res)
// )

getData()
async function getData() {
  const response = await fetch("processed_data.csv") 
  const data = await response.text()
  
  const table = data.split("\n").slice(1)
  table.forEach(row => {
    const columns = row.split(",")
    var lat = columns[0]
    var lon = columns[1]
    var COL = columns[2]
    drawCity(lat, lon, COL)
  })
}



// drawCity(59.911491, 10.757933) // Oslo
// drawCity(60.192059, 24.945831) // Helsinki
// drawCity(0, 0) // 0, 0
// drawCity(51.509865, -0.118092) // London
// drawCity(40.730610, -73.935242) // NYC
// drawCity(37.773972, -122.431297) // San Francisco
// drawCity(-33.865143, 151.209900) // Sydney
// drawCity(47.3667, 8.5500) // Zürich


function drawCity(lat: number, lon: number, col: number) {
  var box = new THREE.SphereGeometry(0.01, 10, 10)
  var color_channels = color(col)
  var red = color_channels[0]
  var green = color_channels[1]
  var blue = color_channels[2]
  var color2 = new THREE.Color( red, green, blue);
  var material2 = new THREE.MeshBasicMaterial( {color: color2} )
  var cube = new THREE.Mesh( box, material2 )
  var lat = lat
  var lon = lon
  var coordinates = latAndLongToCartesian(lat, lon)
  cube.position.x = coordinates.x
  cube.position.y = coordinates.y
  cube.position.z = coordinates.z
  scene.add(cube)
}

function color(col: number) {
  var highest_color = [1, 0, 0]
  var lowest_color = [0, 0, 1]
  var pos = (col-15)/(120-15)
  var red = pos*highest_color[0] + (1-pos)*lowest_color[0]
  var green = pos*highest_color[1] + (1-pos)*lowest_color[1]
  var blue = pos*highest_color[2] + (1-pos)*lowest_color[2]
  return [red, green, blue]
}

// drawAxes()

function drawAxes() {
  var box_x = new THREE.BoxGeometry(0.05, 0.05, 0.05)
  var material_x = new THREE.MeshBasicMaterial( {color: 0xff0000} )
  var cube_x = new THREE.Mesh( box_x, material_x )
  cube_x.position.x = 1

  var box_y = new THREE.BoxGeometry(0.05, 0.05, 0.05)
  var material_y = new THREE.MeshBasicMaterial( {color: 0x00ff00} )
  var cube_y = new THREE.Mesh( box_y, material_y )
  cube_y.position.y = 1

  var box_z = new THREE.BoxGeometry(0.05, 0.05, 0.05)
  var material_z = new THREE.MeshBasicMaterial( {color: 0x0000ff} )
  var cube_z = new THREE.Mesh( box_z, material_z )
  cube_z.position.z = 1

  scene.add(cube_x, cube_y, cube_z)

  var axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );
}



const text = new THREE.TextGeometry( "HELLO" );



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