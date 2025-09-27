const button = document.getElementById('changeColorBtn');
const title = document.getElementById('title');

button.addEventListener('click', () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    title.style.color = randomColor;
});
