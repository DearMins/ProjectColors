const cols = document.querySelectorAll('.col');
const iPut = document.querySelectorAll('input');
console.log(iPut);

//обновление страницы по пробелу
document.addEventListener('keydown', (event) =>{
        event.preventDefault();
    if (event.code.toLowerCase() == 'space'){
        setRandomColors();
    }});


//блокировка цвета
document.addEventListener('click', event => {
    let type = event.target;

    if (type.dataset.type == 'lock'){
        type.src = 'img/lock_open.png';
        type.dataset.type = 'open';
    }
    else if(type.dataset.type == 'open'){
        type.src = 'img/lock_close.png';
        type.dataset.type = 'lock';
    }
    else if (type.dataset.type == 'copy') {
        colorCopy(event.target.textContent);
    }
})


//назначение случайного цвета
function setRandomColors(isInitial){
    const colors = isInitial ? getColorsFromHash() : [];
    cols.forEach((col, index) =>{
        const isLocked = col.querySelector('input').dataset.type;
        const text = col.querySelector('h2');

        if (isLocked == 'open'){
            colors.push(text.textContent);
            return;
        }
        
        const color = isInitial 
        ? colors[index]
            ? colors[index]
            : chroma.random() 
        : chroma.random();

        if (!isInitial) {
          colors.push(color);  
        }
        
        text.textContent = color;
        col.style.background = color;

        setTextColor(text, color);
    })
    updateColorsHash(colors);
}


//установка цвета для текста
function setTextColor(text,color){
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5? 'black' : 'white';
}


//запоминание цветовой палитры
function updateColorsHash(colors = []){
    document.location.hash = colors.map((col) => col.toString().substring(1)).join('-');
}

//копирование цвета из заголовка
function colorCopy(text){
    return navigator.clipboard.writeText(text);
}


//проверка хэша и подгрузка цветов
function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color => '#' + color);
    }else 
        return [];
}

setRandomColors(true);