import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger"

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
    }
    
    registerPlugins = () => {
        gsap.registerPlugin(ScrollTrigger)
    }
    
    headerAnimation = () => {
        window.addEventListener('scroll', () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentScrollTop > this.lastScrollTop) {
                gsap.to('.header', {
                    yPercent: -100,
                    duration: 0.5,
                })
            } else {
                gsap.to('.header', {
                    yPercent: 0,
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
        let totalHeight = 0;
        
        ScrollTrigger.create({
            trigger: section,
            start: 'bottom bottom',
            end: 'bottom center',
            pin: true,
        })
        
        
        gsap.to(timeline, {
            xPercent: -100,
            duration: 1,
            scrollTrigger: {
                trigger: timeline,
                start: 'top center',
                scrub: 1,
            }
        })
    }
}

export default Animation;
