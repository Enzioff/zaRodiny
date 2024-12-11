class CustomSelect {
    select;
    headElement;
    activeClass;
    selectedClass;
    acceptBtn;
    resetBtn;
    selectItems;
    removeIcon;
    text;
    defaultText;

    constructor(select: Element) {
        this.select = select;
        this.headElement = this.select.querySelector('.custom-select__header');
        this.activeClass = 'active';
        this.selectedClass = 'selected';
        this.acceptBtn = this.select.querySelector('[data-accept]')
        this.resetBtn = this.select.querySelector('[data-reset]')
        this.selectItems = this.select.querySelectorAll('.custom-select__item')
        this.removeIcon = this.select.querySelector('.custom-select__icon--reset')
        this.text = this.select.querySelector('.custom-select__text')
        this.defaultText = this.text.textContent;

        this.init()
    }

    init() {
        this.headElement.addEventListener('click', this.toggle.bind(this))
        this.resetBtn.addEventListener('click', () => {
            this.selectItems.forEach(el => {
                const input = el.querySelector('input')
                if (input.checked) {
                    input.checked = false
                }
            })
        })

        this.acceptBtn.addEventListener('click', () => {
            this.select.classList.add(this.selectedClass)
            this.select.classList.remove(this.activeClass)
            this.removeIcon.classList.remove('hidden')
            this.text.textContent = `${this.defaultText} (${this.getTotalCheckedItems()})`

            if (this.getTotalCheckedItems() === 0) {
                this.defaultState()
            }
        })

        this.removeIcon.addEventListener('click', (evt) => {
            evt.stopPropagation()
            this.defaultState()
        })
    }

    getTotalCheckedItems = () => {
        return Array.from(this.selectItems).filter(el => {
            const input = el.querySelector('input')
            if (input.checked) {
                return input
            }
        }).length
    }

    defaultState = () => {
        this.select.classList.remove(this.selectedClass)
        this.removeIcon.classList.add('hidden')
        this.selectItems.forEach(el => {
            const input = el.querySelector('input')
            if (input.checked) {
                input.checked = false
            }
        })
        this.text.textContent = `${this.defaultText}`
    }

    toggle = () => {
        this.select.classList.toggle(this.activeClass)
    }
}

export default CustomSelect