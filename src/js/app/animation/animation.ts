import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger"
import MapAnimation from "./MapAnimation";
import ScrollToPlugin from "gsap/ScrollToPlugin"

class Animation {
    lastScrollTop;
    header;
    
    constructor() {
        this.lastScrollTop = 0;
        this.header = document.querySelector('.header');
        
        this.init()
        
        window.addEventListener('load', () => {
            ScrollTrigger.getAll().forEach(el => {
                el.refresh()
            })
        })
    }
    
    init() {
        this.registerPlugins()
        this.timelineAnimation()
        // this.shipBlock()
        new MapAnimation()
        
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
        
        // window.addEventListener('scroll', () => {
        //     const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        //
        //     if (window.pageYOffset >= 1000) {
        //         if (currentScroll > this.lastScrollTop) {
        //             gsap.to(this.header, {
        //                 yPercent: -130,
        //                 duration: 0.3,
        //                 ease: 'none'
        //             })
        //         } else if (currentScroll < this.lastScrollTop) {
        //             gsap.to(this.header, {
        //                 yPercent: 0,
        //                 duration: 0.3,
        //                 ease: 'none'
        //             })
        //         }
        //     } else {
        //         gsap.to(this.header, {
        //             yPercent: 0,
        //             duration: 0.1,
        //             ease: 'none'
        //         })
        //     }
        //
        //     this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Убедимся, что значение не отрицательное
        // })
    }
    
    registerPlugins = () => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
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
        
        ScrollTrigger.create({
            trigger: section,
            start: `top top+=20`,
            end: `+=${section.clientHeight + totalHeight}`,
            onToggle: self => {
                const images = document.querySelectorAll('.header img') as NodeListOf<HTMLElement>;
                
                if (self.isActive) {
                    images[0].classList.remove('hidden')
                    images[1].classList.add('hidden')
                } else {
                    images[0].classList.add('hidden')
                    images[1].classList.remove('hidden')
                }
            }
        })
        
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
        const windowWidth = window.innerWidth;
        const section = document.querySelector('.trigger-timeline');

        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom center',
            pin: true,
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
    
    timelineAnimation = () => {
        const timeline = document.querySelector('.timeline__line') as HTMLElement;
        const headerEls = document.querySelectorAll('.timeline__header');
        const wraperEls = document.querySelectorAll('.timeline__wrapper');
        const totalWidth = Array.from(headerEls).reduce((current, next) => {
            return current + next.clientWidth;
        }, 0)
        
        const clearClasses = () => {
            wraperEls.forEach(el => el.classList.remove('active'))
            headerEls.forEach(el => el.classList.remove('active'))
        }
        const updateEls = (position: number) => {
            wraperEls[position].classList.add('active')
            headerEls[position].classList.add('active')
        }
        
        updateEls(0)
        
        const secondElAnimation = gsap.fromTo(wraperEls[2], {
            background: 'linear-gradient(-118.96deg, #14282F 44.6%, #080D10 87.5%)',
        }, {
            background: '#181818',
            paused: true,
        })
        
        const fiveElAnimation = gsap.fromTo(wraperEls[5], {
            background: 'radial-gradient(114.82% 115.65% at -2.91% 16.22%, #181818 0%, #181818 100%)',
        }, {
            background: 'radial-gradient(114.82% 115.65% at -2.91% 16.22%, #E31E1E 0%, #6E2C2C 100%)',
            paused: true,
        })

        const scrollReturn = (evt: Event) => {
            evt.preventDefault()
        }
        
        ScrollTrigger.create({
            trigger: '.trigger-timeline',
            start: 'top top',
            end: () => `+=${(totalWidth * 1.8) - 900}`,
            pin: true,
            scrub: 1,
            onToggle: self => {
              if (self.isActive) {
                  self.refresh()
              }
            },
            onLeave: () => {
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
            },
            onUpdate: (self) => {
                ScrollTrigger.update()
                const progress = +self.progress.toFixed(2);
                const currentProgress = (totalWidth - 900) * progress;
                
                console.log(progress)
                if (currentProgress >= 300 && currentProgress < 550) {
                    clearClasses()
                    updateEls(1)
                    secondElAnimation.reverse()
                } else if (currentProgress >= 550 && currentProgress < 850) {
                    clearClasses()
                    updateEls(2)
                    secondElAnimation.play()
                } else if (currentProgress >= 850 && currentProgress < 1150) {
                    clearClasses()
                    updateEls(3)
                } else if (currentProgress >= 1150 && currentProgress < 1450) {
                    clearClasses()
                    updateEls(4)
                    fiveElAnimation.reverse()
                } else if (currentProgress >= 1450 && currentProgress < 1650) {
                    clearClasses()
                    updateEls(5)
                    fiveElAnimation.play()
                } else if (currentProgress >= 1650) {
                    clearClasses()
                    updateEls(6)
                } else {
                    clearClasses()
                    updateEls(0)
                }
                
                gsap.to(timeline, {
                    translateX: -currentProgress
                })
            }
        })
    }
}

export default Animation;
