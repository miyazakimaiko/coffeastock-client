import gsap from 'gsap';

export default function tiltImageOnMouseMove(imageId, event) {
  var xPos = (event.clientX/window.innerWidth)-0.5,
  yPos = (event.clientY/window.innerHeight)-0.5;

  gsap.to(imageId, {
    rotationY: 30 * xPos, 
    rotationX: -30 * yPos,
    ease: 'Power3.easeOut',
    transformPerspective: 900,
    transformOrigin: 'center'
  });
}