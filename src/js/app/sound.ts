class Sound {
    soundBlock;
    images;
    
    constructor() {
        this.soundBlock = document.querySelector('.play-sound');
        this.images = this.soundBlock.querySelectorAll('img');
    
        this.init()
    }
    
    init() {
        const player = new Audio('./assets/images/demo.mp3');
        player.preload = "auto";
        
        this.soundBlock.addEventListener('click', () => {
            if (this.images[0].classList.contains('hidden')) {
                this.images[0].classList.remove('hidden')
                this.images[1].classList.add('hidden')
                player.pause()
            } else {
                this.images[0].classList.add('hidden')
                this.images[1].classList.remove('hidden')
                player.play()
                
                player.addEventListener('ended', () => {
                    this.images[0].classList.remove('hidden')
                    this.images[1].classList.add('hidden')
                })
            }
        })
    }
}

export default Sound;
