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
                this.contentEls.item(idx).classList.add('active')
            })
        })
    }
    
    clearClasses() {
        this.headerEls.forEach((el) => el.classList.remove('active'))
        this.contentEls.forEach((el) => el.classList.remove('active'))
    }
}

export default CustomTabs;
