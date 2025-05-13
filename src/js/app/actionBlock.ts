import gsap from 'gsap';

class ActionBlock {
    actionItems;
    contentItems;
    
    constructor(actionItems: NodeListOf<Element>) {
        this.actionItems = actionItems;
        this.contentItems = document.querySelectorAll('[data-action-text]')
        
        this.init()
    }
    
    init() {
        this.actionItems.forEach((el, idx) => {
            el.addEventListener('mouseenter', (evt) => {
                const element = this.contentItems.item(idx) as HTMLElement;
                
                gsap.set(element, {display: 'flex'})
                
                gsap.fromTo(element,
                    {autoAlpha: 0},
                    {autoAlpha: 1, duration: 0.2}
                );
            })
            
            el.addEventListener('mouseleave', (evt) => {
                const element = this.contentItems.item(idx) as HTMLElement;
                gsap.to(element, {
                    autoAlpha: 0,
                    duration: 0.1,
                    onComplete: () => element.style.display = 'none'
                });
            })
        })
    }
}

export default ActionBlock
