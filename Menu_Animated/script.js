let items = document.querySelectorAll('li');
let action = document.getElementById('action');
let rotate = 0;
items.forEach((item) => {
    item.addEventListener('click', () => {
        items.forEach((item) => {
            item.classList.remove('active');
        })
        rotate += 90;
        item.classList.add('active');
        action.style.transform = 'translate' + '(' + (item.offsetLeft + 10) + 'px, ' + item.offsetTop + 'px) rotate(' + rotate + 'deg)';
    })
})