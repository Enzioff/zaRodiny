import {LoadDataType, TemplateType} from "../types/types";

class DropZone {
    dropZone;
    statusText;
    uploadInput: HTMLInputElement;
    maxSize;
    filesBlock: HTMLElement;


    constructor(container: Element) {
        this.dropZone = container
        this.statusText = this.dropZone.querySelector(".drop-zone__notation")
        this.filesBlock = document.querySelector('.loaded-block')
        this.uploadInput = this.dropZone.querySelector('input[type="file"]')
        this.maxSize = 10 * 1024 * 1024;
        this.init()
    }

    init() {
        this.initDropZone();
        this.initClickZone();

        ["dragover", "drop"].forEach(function (event) {
            document.addEventListener(event, function (evt) {
                evt.preventDefault()
                return false
            })
        })

        this.dropZone.addEventListener("dragenter", () => {
            this.dropZone.classList.add("_active")
        })
        this.dropZone.addEventListener("dragleave", () => {
            this.dropZone.classList.remove("_active")
        })
    }

    setStatus = (text: string, msg?: string) => {
        this.statusText.textContent = text;
        this.dropZone.classList.add('danger')

        if (msg) {
            console.error(msg)
        }

        setTimeout(() => {
            this.statusText.textContent = 'Загрузите свое резюме';
            this.dropZone.classList.remove('danger')
        }, 2000)
    }

    calculateFileSize = (size: number) => {
        const mbSize = 1_048_576;
        const text = [
            'КБ',
            'МБ',
        ]

        let finalValue = 0;

        if (size > mbSize) {
            finalValue = size / mbSize
            return `${finalValue.toFixed(2)} ${text[1]}`
        } else {
            finalValue = mbSize / size
            return `${finalValue.toFixed(2)} ${text[0]}`
        }
    }

    initClickZone = () => {
        this.dropZone.addEventListener("change", (evt: Event) => {
            this.dropZone.classList.remove("_active")
            const target = evt.target as HTMLInputElement;

            const file = target.files
            if (!file) {
                return false
            }

            if (file[0].size > this.maxSize) {
                this.setStatus("Ошибка при загрузке файла",
                    `Size Error: Размер файла превышает лимит ${this.calculateFileSize(file[0].size)} / ${this.calculateFileSize(this.maxSize)}`)
                return false
            }

            if (this.filesBlock.children.length >= 2) {
                return false
            }

            if (file[0].type.startsWith("image/") || file[0].type.startsWith('application/pdf')) {
                this.uploadInput.files = target.files;
                this.render(this.filesBlock, this.showLoad({
                    title: this.uploadInput.files[0].name,
                    size: this.calculateFileSize(file[0].size)
                }), 'beforeend')
                const articlesLoad = this.filesBlock.querySelectorAll('.article-load');
                articlesLoad.forEach(element => {
                    const removeBtn = element.querySelector('.article-load__close')
                    if (removeBtn) {
                        removeBtn.addEventListener('click', () => {
                            element.remove()
                            this.visibleDropZone()
                        })
                    }
                })
                this.visibleDropZone()
            } else {
                this.setStatus("Ошибка при загрузке файла")
                return false
            }
        })
    }

    visibleDropZone = () => {
        if (this.filesBlock.children.length >= 2) {
            this.dropZone.classList.add('hidden')
        } else if (this.filesBlock.children.length < 2) {
            this.dropZone.classList.remove('hidden')
        }
    }

    initDropZone = () => {
        this.dropZone.addEventListener("drop", (evt: DragEvent) => {
            evt.preventDefault();

            this.dropZone.classList.remove("_active")
            const file = evt.dataTransfer?.files[0]
            if (!file) {
                return
            }

            if (file.size > this.maxSize) {
                this.setStatus("Ошибка при загрузке файла",
                    `Size Error: Размер файла превышает лимит ${this.calculateFileSize(file.size)} / ${this.calculateFileSize(this.maxSize)}`)
                return false
            }

            if (file.type.startsWith("image/")) {
                this.uploadInput.files = evt.dataTransfer.files
            } else {
                this.setStatus("Ошибка при загрузке файла")
                return false
            }
        })
    }

    showLoad = (data: LoadDataType): string => {
        const {title, size} = data;

        return `
            <article class="article-load">
                <div class="article-load__wrapper">
                    <svg class="article-load__picture">
                        <use xlink:href="./assets/sprite.svg#icon-docs"></use>
                    </svg>
                    <div class="article-load__info">
                        <h4 class="article-load__title">${title}</h4>
                        <p class="article-load__size">${size}</p>
                    </div>
                    <button class="article-load__close" type="button">
                        <svg>
                            <use xlink:href="./assets/sprite.svg#icon-cross"></use>
                        </svg>
                    </button>
                </div>
                <div class="article-load__footer">
                    <div class="article-load__load">
                        <span></span>
                    </div>
                    <p class="article-load__percent">0%</p>
                </div>
            </article>
        `
    }

    render = (container: HTMLElement, template: string, position?: InsertPosition) => {
        container.insertAdjacentHTML(position, template)
    }
}

export default DropZone
