const canvas = document.getElementById("canvas"),
clearCanvas = document.querySelector(".clear_canvas"),
inputCanvas = document.querySelector(".input_drawing")
ctx = canvas.getContext("2d");

// Gloabal variables with default value
let isDrawing = false,
brushWidth = 5;

const setCanvasBackground = () => {
    //setting whole canvas background to white, so the downloaded imag background will be white
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("load", () => {
    // setting cavas width/height
    // offsetwidth/height returns viewable width/height of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

const startDraw = () => {
    isDrawing = true;
    ctx.beginPath(); // creating new path to draw
    ctx.lineWidth = brushWidth; // passing brush Size as line width
}

const drawing = (e) => {
    if(!isDrawing) return; // if isDrawing is false return from here
    ctx.lineTo(e.offsetX, e.offsetY); //creating line according to the mouse pointer
    ctx.stroke(); // drawing·filling line with color
}

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
    setCanvasBackground();
});

//temporary
inputCanvas.addEventListener("click", () =>{
    const link = document.createElement("a"); // creating <a> element
    link.download = `${Date.now()}.jpg` ; //passing current date as link download value
    link.href = canvas.toDataURL(); // passing canvasData as link href value
    link.click(); // clicking link to download image
});


canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);