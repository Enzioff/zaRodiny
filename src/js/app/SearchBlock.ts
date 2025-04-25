import axios from "axios";

class SearchBlock {
    searchBlock;
    searchForm;
    input;
    reset;
    searchList;
    notFound;
    resetBtn;
    showMore;
    url;

    constructor(searchBlock: Element) {
        this.searchBlock = searchBlock;
        this.searchForm = this.searchBlock.querySelector('.search')
        this.input = this.searchForm.querySelector('input');
        this.reset = this.searchForm.querySelector('.search__button--reset')
        this.searchList = document.querySelector('[data-search-list]')
        if (!this.searchList) return
        this.showMore = this.searchList.querySelector('[data-show-more]')
        this.notFound = document.querySelector('[data-not-found]')
        if (!this.notFound) return
        this.resetBtn = this.notFound.querySelector('button');
        this.url = this.searchBlock.getAttribute('data-search-block')
        this.init()
    }

    init() {
        this.input.addEventListener('input', (evt) => {
            const target = evt.target as HTMLInputElement;

            if (target.value.length > 0) {
                this.reset.classList.add('visible')
            } else {
                this.reset.classList.remove('visible')
            }

            if (target.value.length >= 3) {
                if (this.searchList || this.notFound) {
                    this.searchList.classList.add('hidden');
                    this.notFound.classList.remove('hidden');
                    this.fetchData(`?_q=${target.value}`)
                }
            } else {
                if (this.searchList || this.notFound) {
                    this.searchList.classList.remove('hidden');
                    this.notFound.classList.add('hidden');
                }
            }
        })

        this.reset.addEventListener('click', () => {
            this.reset.classList.remove('visible')
            if (this.searchList || this.notFound) {
                this.searchList.classList.remove('hidden');
                this.notFound.classList.add('hidden');
            }
        })

        this.resetBtn.addEventListener('click', () => {
            this.input.value = ''
            this.reset.classList.remove('visible')
            if (this.searchList || this.notFound) {
                this.searchList.classList.remove('hidden');
                this.notFound.classList.add('hidden');
            }
        })

        this.showMore.addEventListener('click', () => {
            const option = this.showMore.getAttribute('data-show-more')
            this.fetchData(option)
        })
    }

    fetchData = (options: string) => {
        axios.get(`${this.url}${options}`)
            .then(response => response.data)
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }
}

export default SearchBlock
