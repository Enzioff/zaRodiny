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
                this.contentItems.item(idx).classList.add('active')
            })
            
            el.addEventListener('mouseleave', (evt) => {
                this.contentItems.item(idx).classList.remove('active')
            })
        })
    }
}

export default ActionBlock
