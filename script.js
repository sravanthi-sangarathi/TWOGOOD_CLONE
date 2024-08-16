function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.

ScrollTrigger.refresh();
}
locomotiveAnimation();

function navAnimation(){
    gsap.to(".nav-part1 svg",{
        transform: "translateY(-100%)",
        scrollTrigger:{
            trigger: ".page1",
            scroller: ".main",
            start: "top 0",
            end: "top -5%",
            scrub: true,
          }, 
    }) 

    gsap.to(".nav-part2 a",{
        transform: "translateY(-100%)",
        scrollTrigger:{
            trigger: ".page1",
            scroller: ".main",
            start: "top 0",
            end: "top -5%",
            scrub: true,
          },  
          opacity:0
    }) 
    
}
 navAnimation();

function videoconAnimation() {
    let videocon = document.querySelector(".video-container");
let playbtn = document.querySelector('.play');
videocon.addEventListener('mouseenter',()=>{
    gsap.to(playbtn,{
        scale:1,
        opacity:1,
        
    })
})
videocon.addEventListener('mouseleave',()=>{
    gsap.to(playbtn,{
        scale:0,
        opacity:0
    })
})
videocon.addEventListener('mousemove',function(dets){
    gsap.to(".play",{
        left:dets.x,
        top: dets.y-60
    })
})
}
videoconAnimation()

function loadingAnimation(){
    
    document.addEventListener('DOMContentLoaded', function() {
        gsap.from(".page1 h1", {
            y: 100,
            opacity: 0,
            delay:0.5,
            duration: 0.6,
            stagger: 0.2
        });
        gsap.from(".video-container video", {
            scale:0.9,
            opacity: 0,
            delay:1.3,
            duration: 0.6,
            
        });
        
    });
}
loadingAnimation()

function cursorAnimation() {
    const cursor = document.querySelector(".cursor");
    
    document.addEventListener("mousemove", function(dets) {
      gsap.to(cursor, {
        left: dets.x,
        top: dets.y
      })
    });
  
    document.querySelectorAll(".child").forEach(child => {
      child.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
          transform: 'translate(-50%,-50%) scale(1)',
          duration: 0.3
        });
      });
  
      child.addEventListener("mouseleave", (e) => {
        const rect = child.getBoundingClientRect();
        const cursorX = e.clientX;
        const cursorY = e.clientY;
  
        if (!(cursorX >= rect.left && cursorX <= rect.right && cursorY >= rect.top && cursorY <= rect.bottom)) {
          gsap.to(cursor, {
            transform: 'translate(-50%,-50%) scale(0)',
            duration: 0.3
          });
        }
      });
    });
  
    document.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        transform: 'translate(-50%,-50%) scale(0)',
        duration: 0.3
      });
    });
  
    document.addEventListener("scroll", () => {
      const cursorRect = cursor.getBoundingClientRect();
      let isCursorInsideChild = false;
  
      document.querySelectorAll(".child").forEach(child => {
        const rect = child.getBoundingClientRect();
        if (cursorRect.left >= rect.left && cursorRect.right <= rect.right &&
            cursorRect.top >= rect.top && cursorRect.bottom <= rect.bottom) {
          isCursorInsideChild = true;
        }
      });
  
      if (!isCursorInsideChild) {
        gsap.to(cursor, {
          transform: 'translate(-50%,-50%) scale(0)',
          duration: 0.3
        });
      }
    });
  }
  
  cursorAnimation();
  

function linksAnimation() {
    const atags = document.querySelectorAll(".nav-part2 a");
    const span = document.querySelector(".text .right-box span");

    atags.forEach((atag) => {
        atag.addEventListener("mouseenter", () => {
            atag.classList.add("hovered");
            span.add("hovered");

            gsap.to(atag, {
                color: "rgb(182, 171, 171)", // Change text color
                duration:0.3 // Duration for text color change
            });
        });

        atag.addEventListener("mouseleave", () => {
            atag.classList.remove("hovered");
            span.remove("hovered");

            gsap.to(atag, {
                color: "", // Revert text color
                duration: 0.3 // Duration for reverting text color
            });
        });
    });
    
}

linksAnimation();

function menubarAnimation() {
    let isMenuOpen = false;
    const main = document.querySelector(".main");
    const svg1 = document.querySelectorAll("#svg1 path");
    const iconsclass = document.querySelector(".nav-part2 .icons");
    const icons = document.querySelectorAll(".nav-part2 .icons i");
    const aTags = document.querySelectorAll(".nav-part2 a");
    const blackbox = document.querySelector(".blackbox");
    const menubar = document.querySelector(".nav-part2 .icons .ri-menu-line");
    
    menubar.addEventListener("click", function() {
        if (isMenuOpen) {
            // Menu is open, close it and reset styles
            blackbox.classList.remove("visible");
            main.style.display = "block";
            aTags.forEach(function(a) {
                a.style.color = "#5f5e5e"; // Reset to original color
            });
            iconsclass.style.backgroundColor = "#F7F7F7"; // Reset to original background color
            icons.forEach((icon) => {
                icon.style.backgroundColor = "#F7F7F7"; // Reset to original background color
                icon.style.color = "#5f5e5e"; // Reset to original color
            });
            svg1.forEach((path) => {
                path.setAttribute("fill", "black"); // Reset SVG color to black
            });
            // gsap.to(".blackbox .right h1", {
            //     y:100,
            //     opacity: 0,
            //     duration: 0.1,
            //     stagger: 0.1,
            //     delay:0.5,
            //   });
            isMenuOpen = false;
        } else {
            // Menu is closed, open it and apply styles
            blackbox.classList.add("visible");
            main.style.display = "none";
            aTags.forEach(function(a) {
                a.style.color = "white";
            });
            iconsclass.style.backgroundColor = "transparent";
            icons.forEach((icon) => {
                icon.style.backgroundColor = "transparent";
                icon.style.color = "white";
            });
            svg1.forEach((path) => {
                path.setAttribute("fill", "white"); // Change SVG color to white
            });
            gsap.from(".blackbox .right h1", {
                y:100,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                delay:0.5,
            });
            isMenuOpen = true;
        }
    });
    
    
}
menubarAnimation();

gsap.from(".page4 .border",{
     width:"0%",
     opacity:0,
    scrollTrigger:{
        trigger: ".page4",
        scroller: ".main",
        start: "top 60%", 
      },  
    duration:1,
})
gsap.from(".page5 .dabba img",{
    y:50,
    opacity:0,
    stagger:"0.3",
    ease: "power2.out",
    duration:"0.5",
    scrollTrigger: {
        trigger:".page4",
        scroller:".main",
        start:"bottom 20%",
        toggleActions: "play none none none",
    }
})

gsap.from('.flex .go1438215768 path', {
    opacity: 0,
    y:5,
    stagger: 0.1, 
    duration: 0.5 ,
    scrollTrigger: {
        trigger:".page5",
        scroller:".main",
        start:"bottom 20%",
        toggleActions: "play none none none",
    }
  
  });
  gsap.from(".page3 .child",{
    opacity:0,
    duration:0.5,
    y:-30,
    stagger:0.2,
    scrollTrigger: {
        trigger:".page3",
        scroller:".main",
        start:"top 60%",
        toggleActions: "play none none none",
    }

  })



