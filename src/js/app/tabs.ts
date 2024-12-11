import {LoadDataType} from "../types/types";

class Tabs {
    container;
    headerElements;
    contentElements;
    gridParent;
    widget;
    textArray;
    currentUrl;

    constructor(container: Element) {
        this.container = container;
        this.headerElements = this.container.querySelectorAll('.tabs__item');
        this.contentElements = this.container.querySelectorAll('.tabs__element');
        this.gridParent = this.container.closest('.grid');
        this.widget = this.gridParent.querySelector('.widget-slider');
        this.currentUrl = '';

        this.textArray = [
            'Подскажем решение',
            'Ждем ваше резюме',
            'Адреса компании'
        ]

        this.init()
    }

    init() {
        this.headerElements.forEach((head, idx) => {
            head.addEventListener('click', () => {
                this.toggleTab(idx)
                this.updateWidget(idx)
                this.updateButtons(idx)
            })
        })

        this.updateButtons()
    }

    updateWidget = (idx: number) => {
        if (!this.widget) return

        const paginationList = this.widget.querySelectorAll('.pagination__item');
        const widgetCount = this.widget.querySelector('.widget-slider__numbers');
        const widgetCaption = this.widget.querySelector('.widget-slider__caption');

        Array.from(paginationList).filter((element, innerIdx) => {
            innerIdx <= idx
                ? element.classList.add('active')
                : element.classList.remove('active')
        })

        widgetCount.textContent = `${idx + 1}/${paginationList.length}`;
        widgetCaption.textContent = this.textArray[idx];
    }

    updateButtons = (idx?: number) => {
        let buttons = null;

        if (window.innerWidth >= 1440) {
            buttons = this.gridParent.querySelectorAll('[data-btn]');
        } else {
            buttons = this.gridParent.querySelectorAll('[data-btn-mob]');
        }

        if (!buttons) return

        const currentFormAction = idx
            ? this.contentElements[idx].querySelector('form')?.getAttribute('action')
            : this.contentElements[0].querySelector('form')?.getAttribute('action');

        buttons.forEach(temp => temp.classList.add('hidden'))
        buttons.item(idx)?.classList.remove('hidden')
        buttons.item(idx)?.setAttribute('data-form-submit', currentFormAction)
    }

    clearClasses = (elements: NodeListOf<Element>[], customClass?: string) => {
        elements.forEach(el => {
            el.forEach(temp => temp.classList.remove(`${customClass ? customClass : 'active'}`))
        })
    }

    addClasses = (elements: NodeListOf<Element>[], idx: number, customClass?: string) => {
        elements.forEach(el => {
            el.item(idx).classList.add(`${customClass ? customClass : 'active'}`)
        })
    }

    toggleTab = (idx: number) => {
        this.clearClasses([this.headerElements, this.contentElements])
        this.addClasses([this.headerElements, this.contentElements], idx)
    }
}

export default Tabs;