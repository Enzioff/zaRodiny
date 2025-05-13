import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"

class MapAnimation {
    map;
    mapTrigger: HTMLElement;
    mapContainer: HTMLElement;
    infoElements;
    
    constructor() {
        this.map = document.querySelector('.interactive-map__wrapper')
        this.mapTrigger = document.querySelector('.trigger-map')
        this.mapContainer = document.querySelector('.interactive-map')
        this.infoElements = document.querySelectorAll('.interactive-map__element')
        this.init()
    }
    
    init() {
        gsap.registerPlugin(ScrollTrigger)
        const mapTimeline = gsap.timeline({
            ease: 'none',
            scrollTrigger: {
                trigger: this.mapTrigger,
                start: 'top top',
                end: 'bottom+=2000 bottom',
                pin: true,
                snap: {
                    snapTo: "labels", // Привязка к меткам
                    duration: { min: 0.3, max: 0.8 }, // Плавность доводки
                },
                scrub: 1,
            }
        })
        
        gsap.set(this.map, {
            scale: 0.65,
            x: -100,
            y: 130,
        })
        
        gsap.set('.interactive-map__marker', {
            opacity: 0,
        })
        
        mapTimeline
            .addLabel("step1")
            .to(this.map, {
                scale: 1.25,
                x: 328,
                y: 3,
                rotate: 14,
                duration: 1500,
                ease: 'none',
                onStart: () => {
                    this.infoElements.forEach(el => el.classList.remove('active'))
                    this.mapContainer.classList.add('active')
                    this.infoElements[1].classList.add('active')
                },
                onComplete: () => {
                    this.mapTrigger.style.backgroundImage = `url("./assets/images/sea-2.png")`
                    this.infoElements.forEach(el => el.classList.remove('active'))
                    this.infoElements[2].classList.add('active')
                    gsap.set('.interactive-map__marker', {
                        opacity: 1,
                    })
                },
                onReverseComplete: () => {
                    this.mapTrigger.style.backgroundImage = `url("./assets/images/sea-1.png")`
                    this.mapContainer.classList.remove('active')
                    this.infoElements.forEach(el => el.classList.remove('active'))
                    this.infoElements[0].classList.add('active')
                }
            })
            .addLabel("step2")
            .to('.interactive-map__marker', {
                scale: 0.75,
                duration: 1500,
                rotate: -14,
                ease: 'none',
            }, '<')
            .to(this.map, {
                scale: 2.6,
                x: 1313,
                y: -70,
                rotate: 26,
                duration: 1500,
                ease: 'none',
                onReverseComplete: () => {
                    this.mapTrigger.style.backgroundImage = `url("./assets/images/sea-1.png")`
                    this.infoElements.forEach(el => el.classList.remove('active'))
                    this.infoElements[1].classList.add('active')
                    gsap.set('.interactive-map__marker', {
                        opacity: 0,
                    })
                }
            })
            .addLabel("step3")
            .to('.interactive-map__marker', {
                scale: 0.3,
                duration: 1500,
                rotate: -26,
                ease: 'none',
            }, '<')
    }
}

export default MapAnimation;
