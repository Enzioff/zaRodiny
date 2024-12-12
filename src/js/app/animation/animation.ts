import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger"
import MapAnimation from "./MapAnimation";
import ScrollToPlugin from "gsap/ScrollToPlugin"

class Animation {
    lastScrollTop;
    
    constructor() {
        this.lastScrollTop = 0;
        
        this.init()
    }
    
    init() {
        this.registerPlugins()
        this.headerAnimation()
        this.intro()
        this.shipBlock()
        new MapAnimation()
        ScrollTrigger.refresh()
        
        ScrollTrigger.create({
            trigger: '.trigger-video',
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
                const video = document.querySelector('.trigger-video') as HTMLVideoElement
                video.currentTime = 0;
                video.play();
                video.addEventListener('ended', function() {
                    video.remove();
                });
            }
        })
    }
    
    registerPlugins = () => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    }
    
    headerAnimation = () => {
        window.addEventListener('scroll', () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const images = document.querySelectorAll('.header img') as NodeListOf<HTMLElement>;
            const logo = document.querySelector('.logo') as HTMLHtmlElement;
            
            if (currentScrollTop > this.lastScrollTop) {
                gsap.to('.header', {
                    yPercent: -100,
                    duration: 0.5,
                })
                images[0].classList.add('hidden')
                images[1].classList.remove('hidden')
                gsap.to(logo, {
                    y: 81,
                    duration: 1,
                })
            } else {
                gsap.to('.header', {
                    yPercent: 0,
                    duration: 1,
                })
                images[0].classList.remove('hidden')
                images[1].classList.add('hidden')
                gsap.to(logo, {
                    y: 0,
                    duration: 1,
                })
            }
            
            this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        });
    }
    intro = () => {
        const section = document.querySelector('.trigger-intro');
        if (!section) return
        
        const timeline = document.querySelector('.timeline');
        const timelineItems = timeline.querySelectorAll('.article-timeline');
        let totalHeight = -timelineItems[0].clientWidth;
        
        totalHeight = Array.from(timelineItems).reduce((prevEl, currentEl) => {
            return prevEl + currentEl.clientWidth
        }, totalHeight)
        
        ScrollTrigger.create({
            trigger: section,
            start: 'bottom bottom',
            end: `+=${totalHeight}`,
            pin: true,
        })
        
        console.log(totalHeight)
        gsap.set(timeline, {
            x: totalHeight + 278,
        })
        gsap.to(timeline, {
            x: -totalHeight,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: timeline,
                start: 'top center',
                end: `+=${totalHeight}`,
                scrub: 1,
            }
        })
    }
    shipBlock = () => {
        const section = document.querySelector('.trigger-ships');
        gsap.set(section, {
            y: -1430,
        })
        ScrollTrigger.create({
            trigger: section,
            start: 'top top+=60',
            end: '+=2000',
            pin: true,
            onToggle: self => {
                if (self.isActive) {
                    self.refresh()
                    self.update()
                }
            },
            onLeave: self => {
                const scrollReturn = (evt: Event) => {
                    evt.preventDefault()
                }
                document.querySelector('.main').insertAdjacentHTML('beforeend', this.videoTemplate())
                const video = document.querySelector('#deep-video') as HTMLVideoElement
                video.classList.add('visible')
                video.currentTime = 0;
                video.play();
                video.addEventListener('ended', function() {
                    video.remove();
                    gsap.to('.trigger-in', {
                        opacity: 1,
                        duration: 1,
                    })
                });
                gsap.set('.trigger-in', {
                    opacity: 0,
                })
                gsap.to(window, {
                    scrollTo: '#fishBlock',
                    duration: 2,
                    onStart: () => {
                        window.addEventListener('scroll', (evt) => scrollReturn(evt))
                        const element = document.querySelector('.article-fish--hidden') as HTMLElement;
                        element.style.opacity = '0';
                    },
                    onComplete: () => {
                        window.removeEventListener('scroll', scrollReturn)
                        document.querySelector('#fishBlock').insertAdjacentHTML('afterbegin', this.fishTemplate())
                        const fish = document.querySelector('.fish-in')
                        setTimeout(() => {
                            fish.remove()
                            const element = document.querySelector('.article-fish--hidden') as HTMLElement;
                            element.style.opacity = '1';
                        }, 2200)
                    }
                })
            }
        })
    }
    
    fishTemplate = () => {
        return `
           <img class="fish-in" src="./assets/images/fish-sweem.gif" alt="">
        `
    }
    
    videoTemplate = () => {
        return `
            <video class="video-bg video-bg--full" id="deep-video" muted playsInline>
                <source src="./assets/images/deep.mp4" type="video/mp4">
            </video>
        `
    }
}

export default Animation;
