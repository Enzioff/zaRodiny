import Slider from "./slider";
import Animation from "./animation/animation";
import Sound from "./sound";
import CustomTabs from "./customTabs";
import ActionBlock from "./actionBlock";

class App {
    constructor() {
        this.init();
    }

    init = () => {
        new Animation()
        this.createSlider()
        this.createSound()
        this.createNewTabs()
        this.createNewActionBlock()
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
    
    createNewTabs() {
        const tabsContainer = document.querySelectorAll('[data-tabs]')
        
        if (!tabsContainer) return;
        
        tabsContainer.forEach(tab => {
            new CustomTabs(tab)
        })
    }
    
    createNewActionBlock = () => {
        const actionItems = document.querySelectorAll('[data-action-item]')
        
        if (!actionItems) return;
        
        new ActionBlock(actionItems)
    }
}

export {App};

