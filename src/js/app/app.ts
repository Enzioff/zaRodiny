import Slider from "./slider";
import Animation from "./animation/animation";
import Sound from "./sound";
class App {
    constructor() {
        this.init();
    }

    init = () => {
        new Animation()
        this.createSlider()
        this.createSound()
    }

    createSlider = () => {
        const sliders = document.querySelectorAll('[data-slider]');
        if (!sliders) return
        sliders.forEach(slider => {
            new Slider(slider)
        })
    }
    
    createSound = () => {
        new Sound();
    }
}

export {App};

