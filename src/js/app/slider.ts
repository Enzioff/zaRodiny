import Swiper from "swiper";
import {EffectCoverflow, Navigation, Pagination, Thumbs} from "swiper/modules";
import {SwiperSlide} from "swiper/swiper-element";
import {slideType} from "@fancyapps/ui/types/Carousel/types";

class Slider {
    el;
    sliderType;
    buttonPrev;
    buttonNext;
    slidesCount;
    pagination;
    desktopOnly;
    mobileOnly;
    media;

    constructor(el: Element) {
        this.el = el;
        this.sliderType = this.el.getAttribute('data-slider');
        this.slidesCount = this.el.getAttribute('data-slides')

        this.buttonPrev = this.el.querySelector('.swiper-btn--prev');
        this.buttonNext = this.el.querySelector('.swiper-btn--next');
        this.pagination = this.el.querySelector('.swiper-pagination');

        this.media = matchMedia('(max-width: 1199px)');
        this.desktopOnly = this.el.hasAttribute('data-desktop-only');
        this.mobileOnly = this.el.hasAttribute('data-mobile-only');

        this.init()
    }

    init() {
        switch (this.sliderType) {
            case 'default':
                this.initDefaultSlider();
                break;
            case 'catalog':
                this.initCatalogSlider();
                break;
            case 'thumbs':
                this.initThumbsSlider();
                break;
            case 'vertical':
                this.initVerticalSlider();
                break;
        }
    }

    initDefaultSlider() {
        const slider = this.el.querySelector('.swiper');
        const swiperOptions = {
            modules: [Navigation, Pagination],
            slidesPerView: this.slidesCount ? this.slidesCount : 'auto',
            spaceBetween: 0,
            watchSlidesProgress: true,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'swiper-button--disabled'
            },
            pagination: {
                el: this.pagination,
                clickable: true,
            },
            breakpoints: {
                1199: {
                    slidesPerView: this.slidesCount ? this.slidesCount : 1,
                    spaceBetween: 30,
                }
            }
        }

        let swiperSlider = this.mobileOnly ? this.media.matches ? new Swiper(slider, swiperOptions) : null : new Swiper(slider, swiperOptions);
        if (this.mobileOnly && !this.media.matches) {
            this.el.classList.add('slider--grid')
        } else {
            this.el.classList.remove('slider--grid')
        }

        this.media.addEventListener('change', (event) => {
            const {matches} = event;

            if (matches && this.desktopOnly) {
                swiperSlider.destroy(true, true)
            } else {
                swiperSlider = new Swiper(slider, swiperOptions)
            }
        })
    }
    
    initCatalogSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [Navigation],
            slidesPerView: 1,
            spaceBetween: 156,
            navigation: {
                prevEl: slider.querySelector('.swiper-btn--prev'),
                nextEl: slider.querySelector('.swiper-btn--next'),
            },
            watchSlidesProgress: true,
        })
    }

    initThumbsSlider() {
        const slider = this.el.querySelector('.swiper');
        const thumb = document.querySelector('[data-slider="thumb"]');
        const thumbSwiper = thumb.querySelector('.swiper');

        const thumbSlider = new Swiper(thumbSwiper, {
            modules: [Navigation],
            slidesPerView: 3,
            spaceBetween: 56,
            navigation: {
                prevEl: thumbSwiper.querySelector('.swiper-btn--prev'),
                nextEl: thumbSwiper.querySelector('.swiper-btn--next'),
            },
            breakpoints: {
                1199: {
                    spaceBetween: 30,
                }
            }
        })

        new Swiper(slider, {
            modules: [Pagination, Thumbs],
            slidesPerView: this.slidesCount ? this.slidesCount : 1,
            spaceBetween: 50,
            watchSlidesProgress: true,
            pagination: {
                el: this.pagination,
                clickable: true,
            },
            thumbs: {
                swiper: thumbSlider,
            },
        })
    }
    
    initVerticalSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [Navigation, Pagination, EffectCoverflow],
            slidesPerView: 'auto',
            spaceBetween: 0,
            direction: 'vertical',
            effect: "coverflow",
            centeredSlides: true,
            initialSlide: 1,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 500,
                modifier: 2,
                slideShadows: false,
            },
            watchSlidesProgress: true,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'swiper-button--disabled'
            },
            on: {
                slideChange: (el: Swiper) => {
                    const index = el.realIndex;
                    const picture = el.slides[index].querySelector('picture')
                    if (index !== 1) {
                        const hiddenPic = picture.querySelector('img')
                        if (hiddenPic.classList.contains('hidden')) {
                            picture.insertAdjacentHTML('beforeend', fishTemplate())
                            const gif = picture.querySelector('.article-fish__video')
                            if (gif) {
                                setTimeout(() => {
                                    gif.remove()
                                    hiddenPic.classList.remove('hidden')
                                }, 1000)
                            }
                        }
                    }
                }
            }
        })
    }
}

const fishTemplate = () => {
    return `
        <img class="article-fish__video" src="./assets/images/fish-drop.gif" alt="">
    `
}

export default Slider
