let list = document.querySelectorAll('.carousel .list .item');
let carousel = document.querySelector('.carousel');
let dots = document.querySelectorAll('.dots li');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');

let lastPosition = list.length - 1;
let active = 0;
let zIndex = 2;

nextBtn.onclick = () => {
    let newValue = active + 1 > lastPosition ? 0 : active + 1;
    setItemActive(newValue, showSlider);
}
prevBtn.onclick = () => {
    let newValue = active - 1 < 0 ? lastPosition : active - 1;
    setItemActive(newValue, showSlider);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        setItemActive(index, showSlider);
    })
})

const setItemActive = (newValue, callbackFunction) => {
    if(newValue === active) return;
    let type = newValue > active ? 'next' : 'prev';
    active = newValue;
    callbackFunction(type);
}
let removeEffect;
let autoRun = setTimeout(() => {
    nextBtn.click();
}, 5000);
const showSlider = (type) => {
    carousel.style.pointerEvents = 'none';
    // find Item Active Old
    let itemActiveOld = document.querySelector('.carousel .list .item.active');
    if(itemActiveOld) itemActiveOld.classList.remove('active');
    zIndex++;
    list[active].style.zIndex = zIndex;
    list[active].classList.add('active');

    if(type === 'next'){
        carousel.style.setProperty('--transform', '300px');
    }else{
        carousel.style.setProperty('--transform', '-300px');
    }
    carousel.classList.add('effect');

    // dots
    // find dot active old
    let dotActiveOld = document.querySelector('.dots li.active');
    if(dotActiveOld) dotActiveOld.classList.remove('active');
    dots[active].classList.add('active');

    clearTimeout(removeEffect);
    removeEffect = setTimeout(() => {
        carousel.classList.remove('effect');
        carousel.style.pointerEvents = 'auto';
    }, 1500);

    clearTimeout(autoRun);
    autoRun = setTimeout(() => {
        nextBtn.click();
    }, 5000);
}
