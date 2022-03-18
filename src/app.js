const header_selection = document.getElementById('header-selection');
const header = document.getElementById('header');
const _slider = document.getElementById('slider');
const acc_img = document.getElementById('acc-img');

var ofl_isOpen = false;

function _getClosest(item, array, getDiff) {
    var closest,
        diff;

    if (!Array.isArray(array)) {
        throw new Error("Get closest expects an array as second argument");
    }

    array.forEach(function (comparedItem, comparedItemIndex) {
        var thisDiff = getDiff(comparedItem, item);

        if (thisDiff >= 0 && (typeof diff == "undefined" || thisDiff < diff)) {
            diff = thisDiff;
            closest = comparedItemIndex;
        }
    });

    return closest;
}

function number(item, array) {
  return _getClosest(item, array, function (comparedItem, item) {
    return Math.abs(comparedItem - item);
  });
}
    
function lerp(a, b, n) {
    return (1 - n) * a + n * b
}

class Slider {
    constructor(options = {}) {
        this.bind()
        
        this.opts = {
            el: options.el || '.js-slider',
            ease: options.ease || 0.1,
            speed: options.speed || 1.5,
            velocity: 25,
            scroll: options.scroll || false
        }
        
        this.slider = document.querySelector('.js-slider')
        this.sliderInner = this.slider.querySelector('.js-slider__inner')
        this.slides = [...this.slider.querySelectorAll('.js-slide')]
        this.slidesNumb = this.slides.length
        
        this.rAF = undefined
        
        this.sliderWidth = 0
        
        this.onX = 0
        this.offX = 0
        
        this.currentX = 0
        this.lastX = 0
        
        this.min = 0
        this.max = 0

        this.centerX = window.innerWidth / 2
    }
  
    bind() {
        ['setPos', 'run', 'on', 'off', 'resize'].forEach((fn) => this[fn] = this[fn].bind(this))
    }
    
    setBounds() {
        const bounds = this.slides[0].getBoundingClientRect()
        const slideWidth = bounds.width

        this.sliderWidth = this.slidesNumb * slideWidth
        this.max = -(this.sliderWidth - window.innerWidth)
        
        this.slides.forEach((slide, index) => {
        slide.style.left = `${index * slideWidth}px`
        })
    }
    
    setPos(e) {
        if (!this.isDragging) return
        this.currentX = this.offX + ((e.clientX - this.onX) * this.opts.speed)
        this.clamp()
    }

    clamp() {
        this.currentX = Math.max(Math.min(this.currentX, this.min), this.max)
    }
    
    run() {
        this.lastX = lerp(this.lastX, this.currentX, this.opts.ease)
        this.lastX = Math.floor(this.lastX * 100) / 100 

        const sd = this.currentX - this.lastX
        const acc = sd / window.innerWidth
        let velo =+ acc
        
        this.sliderInner.style.transform = `translate3d(${this.lastX}px, 0, 0) skewX(${velo * this.opts.velocity}deg)`

        this.requestAnimationFrame()
    }
    
    on(e) {
        this.isDragging = true
        this.onX = e.clientX
        this.slider.classList.add('grabbing');
    }
    
    off(e) {
        this.snap()
        this.isDragging = false
        this.offX = this.currentX
        this.slider.classList.remove('grabbing');
    }
    
    closest() {
    const numbers = []
    this.slides.forEach((slide, index) => {
        const bounds = slide.getBoundingClientRect()
        const diff = this.currentX - this.lastX
        const center = (bounds.x + diff) + (bounds.width / 2)
        const fromCenter = this.centerX - center
        numbers.push(fromCenter)
    })

        let closest = number(0, numbers)
        closest = numbers[closest]
        
        return {
        closest
        }
    }

    snap() {
        const { closest } = this.closest()
        
        this.currentX = this.currentX + closest
        this.clamp()
    }

    requestAnimationFrame() {
        this.rAF = requestAnimationFrame(this.run)
    }

    cancelAnimationFrame() {
        cancelAnimationFrame(this.rAF)
    }
    
    addEvents() {
        this.run()
        
        this.slider.addEventListener('mousemove', this.setPos, { passive: true })
        this.slider.addEventListener('mousedown', this.on, false)
        this.slider.addEventListener('mouseup', this.off, false)
        this.slider.addEventListener('mouseleave', this.off);
        
        window.addEventListener('resize', this.resize, false)
    }
    
    removeEvents() {
        this.cancelAnimationFrame(this.rAF)
        
        this.slider.removeEventListener('mousemove', this.setPos, { passive: true })
        this.slider.removeEventListener('mousedown', this.on, false)
        this.slider.removeEventListener('mouseup', this.off, false)
        this.slider.removeEventListener('mouseleave', this.off);
    }
    
    resize() {
        this.setBounds()
    }
    
    destroy() {
        this.removeEvents()
        
        this.opts = {}
    }
    
    init() {
        this.setBounds()
        this.addEvents()
    }
}

const slider = new Slider()
slider.init()