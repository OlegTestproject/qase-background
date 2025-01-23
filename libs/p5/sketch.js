let img;

function preload() {
    img = loadImage('textures/marblecubic.jpg'); // Или абсолютный URL для теста
    console.log("Текстура:", img); // Проверка в консоли
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(200); // Серый фон
    if (img) {
        image(img, 0, 0, width, height); // Отображение изображения
    } else {
        console.error("Изображение не загружено!");
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}