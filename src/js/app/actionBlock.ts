import gsap from 'gsap';

class ActionBlock {
    actionItems;
    contentItems;
    infoBubbles;
    
    constructor(actionItems: NodeListOf<Element>) {
        this.actionItems = actionItems;
        this.contentItems = document.querySelectorAll('[data-action-text]')
        this.infoBubbles = document.querySelectorAll('[data-action-bubble]')
        
        this.init()
    }
    
    init() {
        this.actionItems.forEach((el, idx) => {
            el.addEventListener('click', () => {
                this.infoBubbles.forEach(temp => temp.classList.remove('active'))
                const infoBubble = el.querySelector('[data-action-bubble]');
                if (!infoBubble) return;
                this.updateInfoBubble(infoBubble);
            })
        })
        
        this.infoBubbles.forEach((el) => {
            const closeBtn = el.querySelector('.action-map__close')
            closeBtn.addEventListener('click', (evt) => {
                evt.preventDefault()
                evt.stopPropagation()
                el.classList.remove('active')
            })
            
            el.addEventListener("mouseleave", () => {
                el.classList.remove('active')
            })
        })
    }
    
    updateInfoBubble = (element: Element) => {
        element.classList.toggle('active');
    }
}

export default ActionBlock
