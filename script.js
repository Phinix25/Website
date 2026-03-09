function scrollToSection(){

document.getElementById("about").scrollIntoView({
behavior:"smooth"
});

}

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

let mouse = {
x: null,
y: null
};

window.addEventListener("mousemove",(event)=>{

mouse.x = event.x;
mouse.y = event.y;

});

class Particle{

constructor(){

this.x = Math.random()*canvas.width;
this.y = Math.random()*canvas.height;

this.size = Math.random()*2+1;

this.speedX = Math.random()*0.6-0.3;
this.speedY = Math.random()*0.6-0.3;

}

update(){

this.x += this.speedX;
this.y += this.speedY;

if(this.x > canvas.width) this.x = 0;
if(this.x < 0) this.x = canvas.width;

if(this.y > canvas.height) this.y = 0;
if(this.y < 0) this.y = canvas.height;

let dx = this.x - mouse.x;
let dy = this.y - mouse.y;
let distance = Math.sqrt(dx*dx + dy*dy);

if(distance < 100){

this.x += dx/20;
this.y += dy/20;

}

}

draw(){

ctx.fillStyle = "#00ffcc";

ctx.beginPath();

ctx.arc(this.x,this.y,this.size,0,Math.PI*2);

ctx.fill();

}

}

function init(){

for(let i=0;i<150;i++){

particles.push(new Particle());

}

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.update();
p.draw();

});

requestAnimationFrame(animate);

}

init();
animate();

document.getElementById("applicationForm").addEventListener("submit", async (e)=>{

e.preventDefault();

const data = {

name: document.getElementById("mcname").value,
age: document.getElementById("age").value,
reason: document.getElementById("reason").value

};

await fetch("http://mtc.koviahost.cloud:2009/apply",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

alert("Application submitted!");

});
