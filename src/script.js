import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { LoopOnce, SphereGeometry, TextureLoader } from 'three'
import $ from "./Jquery"
import gsap from "gsap"
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
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

let bubbles = [];
const createBubble =(mouse)=>{
    let randomBubbleNumber = Math.floor(Math.random()*5)+1
    
    for(let i=0;i<randomBubbleNumber;i++){
    let randomBubbleScale=Math.random();
    let randomBubbleHeight = Math.random()
    let randomBubbleLeft = Math.random()
    let randomBubbleDepth = Math.random()*-10
    const newBubbleMaterial = new THREE.MeshBasicMaterial({color:"white"});
    const newBubbleGeometry = new THREE.SphereGeometry(1,10,10)
    newBubbleMaterial.transparent=true;
    newBubbleMaterial.opacity=.5;
    const newBubble = new THREE.Mesh(newBubbleGeometry, newBubbleMaterial)
    bubbles.push(newBubble)
        camera.add(newBubble);
    // console.log(newBubble)
    newBubble.scale.set(randomBubbleScale, randomBubbleScale, randomBubbleScale)
    newBubble.position.set(mouse.x*10+randomBubbleHeight,mouse.y*10+randomBubbleLeft,-10)
    setTimeout(() => {
       camera.remove(newBubble)
    }, 1000);
    }

    // newBubble.position.x=camera.position.x
    // newBubble.position.y=camera.position.y
    // newBubble.position.z=camera.position.x+1;
    // scene.add(newBubble)


}

$(window).click(e=>{
    
    e.preventDefault();
    e.stopPropagation();
    createBubble(mouse, camera)
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

let mixer2=null
let nesse = null
let nesseGroup = null
let whale = null
let whaleGroup=null
let whaleanimation = null
let swim = null
let fishGroup = null



gltfLoader.load(
    '/Saury.gltf',
    (gltf) =>
    {
        
   

       nesse=gltf.scene
       console.log(gltf)
        // console.log(boy)
        nesse.position.x+=10
        // nesse.scale.set(0.25, 0.25, 0.25)
        
      

        

            

        nesseGroup = new THREE.Group()
        nesseGroup.add(nesse)
        


        // Animation
        mixer = new THREE.AnimationMixer(nesse)
        swim = mixer.clipAction(gltf.animations[0]) 
        console.log(swim)

        swim.timeScale=2.5
        
        
        scene.add(nesseGroup)
        swim.play()
        

    }
)

gltfLoader.load("/whale.glb",
(gltf)=>{
    whale=gltf.scene;
    whaleGroup = new THREE.Group;
    
    whale.position.y+=20;
    whale.position.x+=20   
    whaleGroup.add(whale)
    mixer2 = new THREE.AnimationMixer(whale)
    whaleanimation= mixer2.clipAction(gltf.animations[0])

    scene.add(whaleGroup)
    whaleanimation.play()


}
)



/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('white', .2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('orange', 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 5, 5, 0)
scene.add(directionalLight)


//fish in the sea

const fishGeometry1 = new THREE.BufferGeometry()
const count = 100
const positions1 = new Float32Array(count *3)
for(let i = 0; i <count; i++)
{
    const i3 = i * 3
    positions1[i3    ] = Math.sin(i*10)+Math.random()*.1
    positions1[i3 + 1] = i*.02+Math.random()*.1
    positions1[i3 + 2] = Math.cos(i*10)+Math.random()*.1
}

fishGeometry1.setAttribute(
    'position',
    new THREE.BufferAttribute(positions1,3)
)


const fishGeometry2 = new THREE.BufferGeometry()
const count2 = 150
const positions2 = new Float32Array(count *3)
for(let i = 0; i <count2; i++)
{
    const i3 = i * 3
    positions2[i3    ] = Math.sin(i*10)+Math.random()*.18
    positions2[i3 + 1] = i*.01+Math.random()*.1
    positions2[i3 + 2] = Math.cos(i*10)+Math.random()*.18
}

fishGeometry2.setAttribute(
    'position',
    new THREE.BufferAttribute(positions2,3)
)


const fishGeometry3 = new THREE.BufferGeometry()
const count3 = 120
const positions3 = new Float32Array(count *3)
for(let i = 0; i <count3; i++)
{
    const i3 = i * 3
    positions3[i3    ] = Math.sin(i*10)+Math.random()*.14
    positions3[i3 + 1] = i*.005
    positions3[i3 + 2] = Math.cos(i*10)+Math.random()*.14
}

fishGeometry3.setAttribute(
    'position',
    new THREE.BufferAttribute(positions3,3)
)
const fishMaterial = new THREE.PointsMaterial()
const fishMaterial2 = new THREE.PointsMaterial()
const fishMaterial3 = new THREE.PointsMaterial()
const fishTexture1 = textureLoader.load('/fish1.png')
const fishTexture2 = textureLoader.load('/fish2.png')
const fishTexture3 = textureLoader.load('/fish3.png')



fishMaterial.transparent=true
fishMaterial.alphaMap=fishTexture1
fishMaterial.depthWrite=false;
fishMaterial2.transparent=true
fishMaterial2.alphaMap=fishTexture1
fishMaterial2.depthWrite=false;
fishMaterial3.transparent=true
fishMaterial3.alphaMap=fishTexture1
fishMaterial3.depthWrite=false;

// ...

fishMaterial.map = fishTexture1
fishMaterial2.map = fishTexture2
fishMaterial3.map = fishTexture3
// fishMaterial.size=6;
fishMaterial.sizeAttenuation=true
fishMaterial2.sizeAttenuation=true
fishMaterial3.sizeAttenuation=true
const schoolOfFish = new THREE.Points(fishGeometry1, fishMaterial)
const schoolOfFish2 = new THREE.Points(fishGeometry2, fishMaterial2)
const schoolOfFish3 = new THREE.Points(fishGeometry3, fishMaterial3)
fishGroup=new THREE.Group()
fishGroup.add(schoolOfFish, schoolOfFish2, schoolOfFish3)
fishGroup.scale.x=15;
fishGroup.scale.y=15;
fishGroup.scale.z=15;

scene.add(fishGroup)
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)


scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 2, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

document.body.appendChild( VRButton.createButton( renderer ) );


renderer.setClearColor( '#29b2ca',.5);

// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//raycaster
const raycaster = new THREE.Raycaster()
raycaster.setFromCamera(mouse, camera)

let rotationPos = 0


    setInterval(() => {
        if(nesseGroup){
            gsap.to(nesseGroup.rotation,{duration:1,y:rotationPos+.5})
            rotationPos+=.5
        }
    }, 1200);






/**
 * Animate
 */

let oldElapsedTime=null;

const clock = new THREE.Clock()
let previousTime = 0
const tick = () =>





   
{

    if(bubbles.length>0){
        bubbles.forEach(element => {
    
            element.position.y+=.1
        
        });
        }
    // for(const object of objectsToUpdate)
    // {
    //     object.mesh.position.copy(object.body.position)
    //     object.mesh.quaternion.copy(object.body.quaternion)
    // }
    
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    // world.step(1 / 60, deltaTime, 3)
    
// if(whaleGroup){
//     gsap.to(whaleGroup.rotation,{duration:.6,y:rotationPos2-.001})
//     rotationPos2-=.001
// }

if(whaleGroup){

    whaleGroup.rotation.y-=.001
}

if(fishGroup){

    fishGroup.children[0].rotation.y+=.002
    fishGroup.children[1].rotation.y+=.003
    fishGroup.children[2].rotation.y+=.001


}


  
    if(mixer)
    {
        mixer.update(deltaTime)
    }

    
    if(mixer2)
    {
        mixer2.update(deltaTime)
    }

    
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()