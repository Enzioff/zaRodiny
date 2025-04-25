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
                scrub: 1,
            }
        })
        
        mapTimeline
            .to(this.map, {
                scale: 1.25,
                x: 328,
                y: 3,
                rotate: 14,
                duration: 1500,
                ease: 'none',
                delay: 1000,
                onStart: () => {
                    this.infoElements.forEach(el => el.classList.remove('active'))
                    this.mapContainer.classList.add('active')
                    this.infoElements[1].classList.add('active')
                },
                onComplete: () => {
                    this.mapTrigger.style.backgroundImage = `url("../assets/images/sea-2.png")`
                    this.infoElements.forEach(el => el.classList.remove('active'))
                    this.infoElements[2].classList.add('active')
                },
                onReverseComplete: () => {
                    this.mapTrigger.style.backgroundImage = `url("../assets/images/sea-1.png")`
                    this.mapContainer.classList.remove('active')
                    this.infoElements.forEach(el => el.classList.remove('active'))
                    this.infoElements[0].classList.add('active')
                }
            })
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
                delay: 1000,
                onReverseComplete: () => {
                    this.mapTrigger.style.backgroundImage = `url("../assets/images/sea-1.png")`
                    this.infoElements.forEach(el => el.classList.remove('active'))
                    this.infoElements[1].classList.add('active')
                }
            })
            .to('.interactive-map__marker', {
                scale: 0.3,
                duration: 1500,
                rotate: -26,
                ease: 'none',
            }, '<')
    }
}

export default MapAnimation;
