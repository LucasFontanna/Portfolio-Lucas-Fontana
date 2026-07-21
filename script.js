/*=========================================
    PORTFOLIO SCRIPT
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();

    initTyping();

    initCounters();

    initReveal();

    initBackToTop();

});

/*=========================================
    NAVBAR
=========================================*/

function initNavbar(){

    const header = document.querySelector("header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 80){

            header.style.background = "rgba(5,8,22,.92)";
            header.style.backdropFilter = "blur(25px)";
            header.style.boxShadow = "0 15px 35px rgba(0,0,0,.35)";

        }else{

            header.style.background = "rgba(5,8,22,.55)";
            header.style.boxShadow = "none";

        }

    });

}

/*=========================================
    SCROLL REVEAL
=========================================*/

function initReveal(){

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{
        threshold:.15
    });

    document.querySelectorAll("section,.project-card,.service-card,.skill-card,.about-card,.testimonial-card,.process-card,.stat-card").forEach(el=>{

        el.classList.add("hidden");

        observer.observe(el);

    });

}

/*=========================================
    BACK TO TOP
=========================================*/

function initBackToTop(){

    const button = document.querySelector(".back-to-top");

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 500){

            button.style.opacity="1";
            button.style.pointerEvents="all";

        }else{

            button.style.opacity="0";
            button.style.pointerEvents="none";

        }

    });

}

/*=========================================
    CONTADORES
=========================================*/

function initCounters(){

    const numbers = document.querySelectorAll(".stat-card h2");

    let started = false;

    window.addEventListener("scroll",()=>{

        const stats = document.querySelector(".stats");

        if(!stats) return;

        const position = stats.getBoundingClientRect().top;

        if(position < window.innerHeight-150 && !started){

            started = true;

            numbers.forEach(number=>{

                const target = parseInt(number.innerText);

                if(isNaN(target)) return;

                let value = 0;

                const timer = setInterval(()=>{

                    value += Math.ceil(target/70);

                    if(value >= target){

                        value = target;

                        clearInterval(timer);

                    }

                    number.innerText = value+"+";

                },20);

            });

        }

    });

}

/*=========================================
    TYPING EFFECT
=========================================*/

function initTyping(){

    const title = document.querySelector(".typing");

    if(!title) return;

    const text = title.dataset.text;

    let i = 0;

    title.innerHTML="";

    function write(){

        if(i<text.length){

            title.innerHTML += text.charAt(i);

            i++;

            setTimeout(write,60);

        }

    }

    write();

}

/*=========================================
    CURSOR PERSONALIZADO
=========================================*/

const cursor = document.createElement("div");

cursor.className = "custom-cursor";

document.body.appendChild(cursor);

document.addEventListener("mousemove",(e)=>{

    cursor.style.left = e.clientX+"px";
    cursor.style.top = e.clientY+"px";

});

/*=========================================
    EFEITO 3D NOS CARDS
=========================================*/

const cards = document.querySelectorAll(

".project-card,.service-card,.skill-card,.about-card,.testimonial-card"

);

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width)-0.5)*18;

        const rotateX = ((y / rect.height)-0.5)*-18;

        card.style.transform =

        `perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});

/*=========================================
    BOTÕES MAGNÉTICOS
=========================================*/

const buttons = document.querySelectorAll(

".btn-primary,.btn-secondary,.btn-navbar,.btn-project"

);

buttons.forEach(button=>{

    button.addEventListener("mousemove",(e)=>{

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const moveX = (x-rect.width/2)/6;

        const moveY = (y-rect.height/2)/6;

        button.style.transform=

        `translate(${moveX}px,${moveY}px)`;

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="translate(0,0)";

    });

});

/*=========================================
    PARTÍCULAS
=========================================*/

const canvas=document.createElement("canvas");

canvas.id="particles";

document.body.prepend(canvas);

const ctx=canvas.getContext("2d");

let particles=[];

function resizeCanvas(){

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

for(let i=0;i<90;i++){

    particles.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        r:Math.random()*2+1,

        dx:(Math.random()-0.5)*0.3,

        dy:(Math.random()-0.5)*0.3

    });

}

function animateParticles(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{

        p.x+=p.dx;
        p.y+=p.dy;

        if(p.x<0)p.x=canvas.width;
        if(p.x>canvas.width)p.x=0;

        if(p.y<0)p.y=canvas.height;
        if(p.y>canvas.height)p.y=0;

        ctx.beginPath();

        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

        ctx.fillStyle="rgba(59,130,246,.35)";

        ctx.fill();

    });

    requestAnimationFrame(animateParticles);

}

animateParticles();

/*=========================================
    MENU MOBILE
=========================================*/

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuButton){

    menuButton.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

        menuButton.classList.toggle("active");

    });

}

/*=========================================
    FAQ
=========================================*/

const faqItems=document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const button=item.querySelector("button");

    button.addEventListener("click",()=>{

        faqItems.forEach(other=>{

            if(other!==item){

                other.classList.remove("open");

            }

        });

        item.classList.toggle("open");

    });

});

/*=========================================
    SPOTLIGHT
=========================================*/

const spotlight=document.createElement("div");

spotlight.className="spotlight";

document.body.appendChild(spotlight);

document.addEventListener("mousemove",(e)=>{

    spotlight.style.left=e.clientX+"px";

    spotlight.style.top=e.clientY+"px";

});

/*=========================================
    PARALLAX
=========================================*/

window.addEventListener("scroll",()=>{

    const scroll=window.scrollY;

    document.querySelectorAll(".circle").forEach(circle=>{

        circle.style.transform=`translateY(${scroll*0.2}px)`;

    });

});

/*=========================================
    BARRAS DE HABILIDADE
=========================================*/

const bars=document.querySelectorAll(".progress-fill");

const observerBars=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.width=

            entry.target.dataset.width;

        }

    });

},{
    threshold:.5
});

bars.forEach(bar=>observerBars.observe(bar));