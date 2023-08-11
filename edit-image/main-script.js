let myImage = document.querySelector("img");
let slider = document.getElementById("range");
let brightness = document.querySelector(".brightness");
let saturation = document.querySelector(".saturation");
let Inversion = document.querySelector(".inversion");
let grayscale = document.querySelector(".grayscale");
let imageInput = document.querySelector(".image-input");
let number = document.querySelector(".number");
let name=document.querySelector(".name");
let filterOptions = document.querySelectorAll(".filter button");

let rotation = 0,
  vertical,
  horizontal,
  uploadedImage = "";
let brightnessNum = "100",
  saturationNum = "100",
  inversionNum = "0",
  grayscaleNum = "0";

  const applyFilter = () => {
    // previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    myImage.style.filter = `brightness(${brightnessNum}%) saturate(${saturationNum}%) invert(${inversionNum}%) grayscale(${grayscaleNum}%)`;
  }

brightness.addEventListener("click", () => {
  brightness.style.backgroundColor = "#5372f0";
  brightness.style.color = " #fff";
  document.querySelector(".name").innerHTML = "brightness";
  document.querySelector(".number").textContent = slider.value + "%";
  slider.addEventListener("change", function () {
    brightnessNum = this.value;
    console.log(brightnessNum);
    document.querySelector(".number").textContent = this.value + "%";
    myImage.style.filter = "brightness(" + slider.value + "%)";
  });
});

saturation.addEventListener("click", () => {
  // saturation.style.backgroundColor = "#5372f0";
  // saturation.style.color = " #fff";
  document.querySelector(".name").innerHTML = "saturation";
  document.querySelector(".number").textContent = slider.value + "%";
  slider.addEventListener("change", function () {
    document.querySelector(".number").textContent = this.value + "%";
    saturationNum = this.value;
    console.log(saturationNum);
    myImage.style.filter = "saturate(" + slider.value + "%)";
  });
});
Inversion.addEventListener("click", () => {
  // Inversion.style.backgroundColor = "#5372f0";
  // Inversion.style.color = " #fff";
  document.querySelector(".name").innerHTML = "Inversion";
  document.querySelector(".number").textContent = slider.value + "%";
  slider.addEventListener("change", function () {
    document.querySelector(".number").textContent = this.value + "%";
    inversionNum = this.value;
    myImage.style.filter = "invert(" + slider.value + "%)";
  });
});
grayscale.addEventListener("click", () => {
  // grayscale.style.backgroundColor = "#5372f0";
  // grayscale.style.color = " #fff";
  document.querySelector(".name").innerHTML = "grayscale";
  document.querySelector(".number").textContent = slider.value + "%";
  slider.addEventListener("change", function () {
    grayscaleNum = this.value;
    document.querySelector(".number").textContent = this.value + "%";
    myImage.style.filter = "grayscale(" + slider.value + "%)";
  });
});
applyFilter();


document.querySelector(".rotate-left").addEventListener("click", () => {
  rotation -= 90;
  myImage.style.transform = "rotate(" + rotation + "deg)";
});
document.querySelector(".rotate-right").addEventListener("click", () => {
  rotation += 90;
  myImage.style.transform = "rotate(" + rotation + "deg)";
});
document.querySelector(".vertically").addEventListener("click", () => {
  vertical = vertical === 1 ? -1 : 1;
  myImage.style.transform = "scaleX(" + vertical + ")";
});
document.querySelector(".horizontaly").addEventListener("click", () => {
  horizontal = horizontal === 1 ? -1 : 1;
  myImage.style.transform = "scaleY(" + horizontal + ")";
});
document.querySelector(".reset").addEventListener("click", () => {
  window.location.reload();
});

document.querySelector(".choose").addEventListener("click", () => {
  var clickEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: false,
  });
  imageInput.dispatchEvent(clickEvent);
  imageInput.addEventListener("change", (e) => {
    myImage.src = URL.createObjectURL(e.target.files[0]);
  });
});
document.querySelector(".save").addEventListener("click", () => {
  var canvas = document.createElement("canvas");
  canvas.width = myImage.naturalWidth;
  canvas.height = myImage.naturalHeight;
  ctx = canvas.getContext("2d");
  ctx.filter = `brightness(${brightnessNum}%)saturate(${saturationNum}%)invert(${inversionNum}%)grayscale(${grayscaleNum}}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if(rotation !== 0) {
      ctx.rotate(rotation * Math.PI / 180);
  }
  ctx.scale(vertical, horizontal);
  ctx.drawImage(myImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
console.log(ctx);
  const imageLink = document.createElement("a");
  imageLink.href = canvas.toDataURL();
  imageLink.download = "Myimage.jpg";
  imageLink.click();
});
