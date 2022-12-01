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

let model;
(async function(){  
    console.log("model loading...");  
    model = await tf.loadLayersModel("https://pdg2619.github.io/Digit_Recognition_Web/model/model.json")
    console.log("model loaded..");
})();

function preprocessCanvas(image) { 
    //resizing the input image to target size of (1, 28, 28) 
    let resize_img = tf.browser.fromPixels(image).resizeNearestNeighbor([28, 28]).mean(2).expandDims(2).expandDims().toFloat(); 
    console.log(resize_img.shape); 
    return resize_img .div(255.0);
}

inputCanvas.addEventListener("click", () =>{
    var imageData = canvas.toDataURL();
    let resize_img = preprocessCanvas(canvas);  //preprocessimg
    console.log(resize_img); 
    let predictions = model.predict(resize_img).data();  
    console.log(predictions)  
    let results = Array.from(predictions);    
    displayLabel(results);    
    console.log(results);
    console.log("check"); /*load check */
});

//output
function displayLabel(data) { 
    var max = data[0];    
    var maxIndex = 0;     
    for (var i = 1; i < data.length; i++) {        
      if (data[i] > max) {            
        maxIndex = i;            
        max = data[i];        
      }
    }
document.getElementById('prediction').innerHTML = "Prediction : "+ maxIndex;  
document.getElementById('confidence').innerHTML = "Confidence : "+(max*100).toFixed(2) + "%";
}


canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);