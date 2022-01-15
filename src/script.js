import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import { LoopOnce, SphereGeometry, TextureLoader } from 'three'
import $ from "./Jquery"

const about = "<p>Shawn Is a person</p>"
const contact = "<div><a href='mailto:shawnyudesign@gmail.com'>shawnyudesign@gmail.com</a></div>"
const portfolio = '<div><ul><li><a href="https://shawnwhy.github.io/Cosmotree/">Cosmo Tree</a></li> <li><a href="https://shawnwhy.github.io/CloudySky/">Sky Over Berlin</a></li><li><a href="https://shawnwhy.github.io/CandieEater/">Diary of a Candy Eater</a></div>'
const news = "<p>Under Construction</p>"
const textureLoader = new THREE.TextureLoader()



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const portfolioButton=document.getElementsByClassName("portfolio");
const aboutButton = document.getElementsByClassName("about")
const  contactButton = document.getElementsByClassName("contact")
const  newsButton = document.getElementsByClassName("news")
const  fireButton = document.getElementsByClassName("fire")





    // Three.js mesh
    


    // Cannon.js body


/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


})





const mouse = new THREE.Vector2()
mouse.x = null
mouse.y=null

$(".button").click((e)=>{

    console.log("clock")
    e.preventDefault();
    e.stopPropagation();

    $(".monitor").removeClass("invisibleP")
    $(".menue").addClass("invisibleP")
    var ButtonName = $(e.target).attr("name")
    switch(ButtonName){
        case "portfolio":
            $(".display").html(portfolio)
            break;
            case "contact":
            $(".display").html(contact)
            break;
            case "about":
            $(".display").html(about)
            break;
            case "news":
                $(".display").html(news)
                break;
    }


})

$(".xButton").click((e)=>{

    
    e.preventDefault();
    e.stopPropagation();

    $(".monitor").addClass("invisibleP")
    $(".menue").removeClass("invisibleP")

})

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1

    // console.log(mouse)
})

/**
 * Models
 */
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)
let rotation="on"
let mixer = null


let nesse = null


let walk = null




gltfLoader.load(
    '/Saury.gltf',
    (gltf) =>
    {
        
   

       nesse=gltf.scene
        // console.log(boy)

        nesse.scale.set(0.25, 0.25, 0.25)
        scene.add(nesse)
      

        

            

        


        // Animation
        mixer = new THREE.AnimationMixer(nesse)
        // console.log(mixer)
        swim = mixer.clipAction(gltf.animations[0]) 

        swim.timeScale=2.5
        
        swim.play()
        

    }
)



/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('orange', .5)
scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight('orange', 2)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.camera.left = - 7
// directionalLight.shadow.camera.top = 7
// directionalLight.shadow.camera.right = 7
// directionalLight.shadow.camera.bottom = - 7
// directionalLight.position.set(- 5, 5, 0)
// scene.add(directionalLight)




/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
if(sizes.width>860){
camera.position.set(3, 0, 10)
}
else{
    camera.position.set(-25, 0, -10)
}


scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(4, -4, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setClearColor( 'orange',.5);

// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

raycaster.setFromCamera(mouse, camera)




/**
 * Animate
 */

let oldElapsedTime=null;

const clock = new THREE.Clock()
let previousTime = 0
const tick = () =>





   
{
    for(const object of objectsToUpdate)
    {
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }
    
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    world.step(1 / 60, deltaTime, 3)






    
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()