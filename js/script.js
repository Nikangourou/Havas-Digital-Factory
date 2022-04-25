import { WebGLRenderer } from "three";
import { PerspectiveCamera } from "three";
import { MeshBasicMaterial } from "three";
import { TextureLoader } from "three";
import { AmbientLight } from "three";
import { PointLight } from "three";
import { SphereGeometry } from "three";
import { Mesh } from "three";
import { Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import backgroundTexture from "../medias/textures/stars.jpg"
import earthTexture from "../medias/textures/earth.jpg"
import moonTexture from "../medias/textures/moon.jpg"
import sunTexture from "../medias/textures/sun.jpg"

import "../styles/styles.scss";
import { MeshStandardMaterial } from "three";

// *** Scene ***

const scene = new Scene()

// *** Camera ***

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000)
camera.position.z = 200
camera.position.y = 0.5
camera.position.x = 0.5

scene.add(camera)

// *** Renderer ***

const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true
})

renderer.setSize(window.innerWidth, window.innerHeight - 100)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.getElementById("container-canvas").appendChild(renderer.domElement)

// *** Controls ***

const controls = new OrbitControls(camera, renderer.domElement)
controls.maxDistance = 700
controls.keys = {
    LEFT: 'ArrowLeft', //left arrow
    UP: 'ArrowUp', // up arrow
    RIGHT: 'ArrowRight', // right arrow
    BOTTOM: 'ArrowDown' // down arrow
}

// *** Background ***

const background = new Mesh(
    new SphereGeometry(4000, 600, 400).scale(- 1, 1, 1),
    new MeshBasicMaterial({
        map: new TextureLoader().load(backgroundTexture)
    })
)

scene.add(background);

// *** Celestial bodies ***

const earth = new Mesh(
    new SphereGeometry(5, 32, 16),
    new MeshStandardMaterial({
        map: new TextureLoader().load(earthTexture)
    })
)

const sun = new Mesh(
    new SphereGeometry(25, 32, 16),
    new MeshBasicMaterial({
        map: new TextureLoader().load(sunTexture)
    })
)

earth.position.x = 200
sun.add(earth);
scene.add(sun);

const moon = new Mesh(
    new SphereGeometry(2, 32, 16),
    new MeshStandardMaterial({
        map: new TextureLoader().load(moonTexture)
    })
)

moon.position.x = 50
earth.add(moon);


// *** Light ***

const solarLight = new PointLight(0xffffff, 5, 400);
scene.add(solarLight);

const ambiantLight = new AmbientLight(0x404040, 2);
scene.add(ambiantLight);

// *** Refresh render ***

function animate() {
    sun.rotateY(0.002)
    earth.rotateY(0.005)
    renderer.render(scene, camera)
    controls.update()
    requestAnimationFrame(animate)
}

animate()

// *** Resize ***

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight - 100)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// *** Keyboard ***

window.addEventListener('keydown', (event) => {
    let needsUpdate = true;

    switch (event.code) {

        case controls.keys.UP:
            camera.position.y += 0.5
            break

        case controls.keys.BOTTOM:
            camera.position.y -= 0.5
            break

        case controls.keys.LEFT:
            camera.position.x -= 0.5
            break

        case controls.keys.RIGHT:
            camera.position.x += 0.5
            break

        default:
            needsUpdate = false
    }

    if (needsUpdate) {
        // prevent the browser from scrolling on cursor keys
        event.preventDefault()
        controls.update()
    }
});

// Popin

const containerPopin = document.querySelector(".container-popin")
const popin = document.querySelector(".popin")
const btnClosePopin = document.getElementById('btn-close')
const info = document.querySelector(".info")

btnClosePopin.addEventListener('click', () => {
    containerPopin.style.display = "none"
})

popin.addEventListener('click', (e) => {
    e.stopPropagation()
})

containerPopin.addEventListener('click', () => {
    containerPopin.style.display = "none"
})

info.addEventListener('click', () => {
    containerPopin.style.display = "flex"
})