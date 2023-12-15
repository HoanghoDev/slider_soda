let list = document.querySelectorAll('.carousel .list .item');
let carousel = document.querySelector('.carousel');
let dots = document.querySelectorAll('.carousel .dots li');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');

let countItem = list.length;
let active = 0;
let zIndex = 2;


nextBtn.onclick = () => {
    let newActive = active + 1 >= countItem ? 0 : active + 1;
    setItemActive(newActive, showSlider);
}
prevBtn.onclick = () => {
    let newActive = active - 1 < 0 ? countItem - 1 : active - 1;
    setItemActive(newActive, showSlider);
}
const setItemActive = (newActive, callbackFunction) => {
    if(newActive === active) return;
    let buttonClick = 'next';
    if(newActive < active) buttonClick = 'prev';
    active = newActive;
    callbackFunction(buttonClick);
}
let removeEffect;
let unAcceptClick;
let autoRun = setTimeout(() => {
    nextBtn.click();
}, 5000);
const showSlider = (type) => {
    carousel.style.pointerEvents = 'none';
    let activeOld = document.querySelector('.carousel .item.active');
    if(activeOld) activeOld.classList.remove('active');
    list[active].classList.add('active');
    zIndex++;
    list[active].style.zIndex = zIndex;
    if(type === 'next'){
        carousel.style.setProperty('--transform', '300px');
    }else{
        carousel.style.setProperty('--transform', '-300px');
    }
    carousel.classList.add('effect');
    // li
    let dotActiveOld = document.querySelector('.carousel .dots li.active');
    dotActiveOld.classList.remove('active');
    dots[active].classList.add('active');

    clearTimeout(removeEffect);
    removeEffect = setTimeout(()=>{
        carousel.classList.remove('effect');
    }, 1500)
    clearTimeout(unAcceptClick);
    unAcceptClick = setTimeout(() => {
        carousel.style.pointerEvents = 'auto';
    },2000)
    clearTimeout(autoRun);
    autoRun = setTimeout(() => {
        nextBtn.click();
    }, 5000);
}

dots.forEach((li, index) => {
    li.addEventListener('click', () => {
        let newActive = index;
        setItemActive(newActive, showSlider);
    })
})