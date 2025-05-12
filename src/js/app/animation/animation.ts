import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger"
import MapAnimation from "./MapAnimation";
import ScrollToPlugin from "gsap/ScrollToPlugin"
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

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
        // Pin секции timeline при скролле
        ScrollTrigger.create({
            trigger: '.trigger-timeline',
            start: 'top top',
            end: 'bottom+=100',
            pin: true,
            scrub: false,
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
        });

        // Swiper для timeline__header
        const timelineLine = document.querySelector('.timeline__line.swiper');
        const wrappers = document.querySelectorAll('.timeline__wrapper');
        const headers = document.querySelectorAll('.timeline__header');
        if (timelineLine && wrappers.length && headers.length) {
            // Сброс всех активных классов
            wrappers.forEach(w => w.classList.remove('active'));
            headers.forEach(h => h.classList.remove('active'));
            // Активируем первый обычный слайд и первый wrapper
            headers[1].classList.add('active');
            wrappers[0].classList.add('active');

            const syncTabs = (idx: number) => {
                wrappers.forEach(w => w.classList.remove('active'));
                headers.forEach(h => h.classList.remove('active'));
                if (idx === 0) return;
                if (idx === headers.length - 1) return;
                if (wrappers[idx - 1]) wrappers[idx - 1].classList.add('active');
                if (headers[idx]) headers[idx].classList.add('active');
            };
            const swiper = new Swiper(timelineLine as HTMLElement, {
                modules: [Navigation, Pagination],
                slidesPerView: 'auto',
                spaceBetween: 0,
                initialSlide: 1,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: '.timeline__line .swiper-btn--next',
                    prevEl: '.timeline__line .swiper-btn--prev',
                },
                pagination: {
                    el: '.timeline__line .swiper-pagination',
                    clickable: true,
                },
                autoHeight: false,
                on: {
                    init() {
                        if (this.realIndex === 1) {
                            this.navigation.prevEl.classList.add('swiper-button-disabled')
                            this.navigation.prevEl.setAttribute('disabled', '')
                        }
                    },
                    slideChange: function () {
                        syncTabs(this.realIndex);
                        if (this.realIndex === 0) {
                            this.slideTo(1);
                            return;
                        }
                        if (this.realIndex === 1) {
                            if (this.navigation.prevEl) {
                                this.navigation.prevEl.classList.add('swiper-button-disabled')
                                this.navigation.prevEl.setAttribute('disabled', '')
                            }
                        }
                        if (this.realIndex !== 1) {
                            this.navigation.prevEl.classList.remove('swiper-button-disabled')
                            this.navigation.prevEl.removeAttribute('disabled')
                        }
                        if (this.realIndex === headers.length - 1) {
                            this.slideTo(headers.length - 2);
                            return;
                        }
                    },
                    transitionEnd: function () {
                        syncTabs(this.activeIndex);
                    }
                },
            });
            // Также обновляем табы при клике на стрелки
            const updateTabs = () => {
                syncTabs(swiper.realIndex);
                if (swiper.realIndex === 0) {
                    swiper.slideTo(1);
                    return;
                }
                if (swiper.realIndex === 1) {
                    swiper.navigation.prevEl.style.disaplay = 'none'
                }
                if (swiper.realIndex === headers.length - 1) {
                    swiper.slideTo(headers.length - 2);
                    return;
                }
            };
            swiper.on('slideNextTransitionEnd', updateTabs);
            swiper.on('slidePrevTransitionEnd', updateTabs);

            // Добавляю клик по этапам
            headers.forEach((header, idx) => {
                if (header.classList.contains('timeline__header--time')) {
                    // Если клик по 08:00 или 00:00, снимаем все активные классы
                    header.addEventListener('click', () => {
                        wrappers.forEach(w => w.classList.remove('active'));
                        headers.forEach(h => h.classList.remove('active'));
                    });
                    // Если клик по 08:00, перескакиваем на последний этап
                    if (idx === headers.length - 1) {
                        header.addEventListener('click', () => {
                            swiper.slideTo(headers.length - 2);
                            syncTabs(headers.length - 2);
                        });
                    }
                    return;
                }
                header.addEventListener('click', () => {
                    wrappers.forEach(w => w.classList.remove('active'));
                    headers.forEach(h => h.classList.remove('active'));
                });
                (header as HTMLElement).style.cursor = 'pointer';
                header.addEventListener('click', () => {
                    swiper.slideTo(idx);
                    syncTabs(idx);
                });
            });
        }
    }
}

export default Animation;
