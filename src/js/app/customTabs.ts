import gsap from "gsap";

class CustomTabs {
    tabsContainer;
    headerEls;
    contentEls;
    
    constructor(el: Element) {
        this.tabsContainer = el;
        this.headerEls = this.tabsContainer.querySelectorAll('[data-tabs-header]')
        this.contentEls = this.tabsContainer.querySelectorAll('[data-tabs-item]')
        
        this.init()
    }
    
    init() {
        this.headerEls.forEach((el, idx) => {
            el.addEventListener('click', () => {
                this.clearClasses()
                el.classList.add('active')
                const contentElement = this.contentEls.item(idx)
                const infoElement = contentElement.querySelector('.catalog__info')
                const sliderElement = contentElement.querySelector('.slider')
                
                gsap.set(contentElement, {display: 'flex'})
                
                gsap.fromTo(infoElement,
                    {
                        autoAlpha: 0,
                        x: -100,
                    },
                    {
                        autoAlpha: 1,
                        duration: 0.4,
                        x: 0,
                    }
                );
            })
        })
    }
    
    clearClasses() {
        this.headerEls.forEach((el) => el.classList.remove('active'))
        this.contentEls.forEach((el) => {
            gsap.set(el, {display: 'none'})
        })
    }
}

export default CustomTabs;
