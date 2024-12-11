import Slider from "./slider";
import Animation from "./animation/animation";
class App {
    constructor() {
        this.init();
    }

    init = () => {
        new Animation()
        this.createSlider()
    }

    createSlider = () => {
        const sliders = document.querySelectorAll('[data-slider]');
        if (!sliders) return
        sliders.forEach(slider => {
            new Slider(slider)
        })
    }
}

export {App};

