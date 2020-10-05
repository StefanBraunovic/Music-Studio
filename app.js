const hamburger = document.querySelector(
	".header .nav-bar .nav-list .hamburger",
);
const mobile_menu = document.querySelector(".header .nav-bar .nav-list ul");
const menu_item = document.querySelectorAll(
	".header .nav-bar .nav-list ul li a",
);
const header = document.querySelector(".header.container");

hamburger.addEventListener("click", () => {
	hamburger.classList.toggle("active");
	mobile_menu.classList.toggle("active");
});

document.addEventListener("scroll", () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 700) {
		header.style.backgroundColor = "#711011";
	} else {
		header.style.backgroundColor = "transparent";
	}
});

menu_item.forEach((item) => {
	item.addEventListener("click", () => {
		hamburger.classList.toggle("active");
		mobile_menu.classList.toggle("active");
	});
});

let galleryImages = document.querySelectorAll(".gallery-fotka");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if (galleryImages) {
	galleryImages.forEach(function (image, index) {
		image.onclick = function () {
			let getElementCss = window.getComputedStyle(image);
			let getFullImgURl = getElementCss.getPropertyValue("background-image");
			let getImgUrlPos = getFullImgURl.split("/img/thumbs/");
			let setNewImageUrl = getImgUrlPos[1].replace('")', "");
			getLatestOpenedImg = index + 1;

			let container = document.body;
			let newImgWindow = document.createElement("div");
			container.appendChild(newImgWindow);
			newImgWindow.setAttribute("class", "img-window");
			newImgWindow.setAttribute("onclick", "closeImg()");

			let newImg = document.createElement("img");
			newImgWindow.appendChild(newImg);
			newImg.setAttribute("src", "img/" + setNewImageUrl);
			newImg.setAttribute("id", "current-img");

			newImg.onload = function () {
				let imgWidth = this.width;
				let calcImgToEdge = (windowWidth - imgWidth) / 2 - 80;

				let newPrevBtn = document.createElement("a");
				let btnPrevText = document.createTextNode("Prev");
				newPrevBtn.appendChild(btnPrevText);
				container.appendChild(newPrevBtn);
				newPrevBtn.setAttribute("class", "img-btn-prev");
				newPrevBtn.setAttribute("onclick", "changeImg(0)");
				newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;";

				let newNextBtn = document.createElement("a");
				let btnNextText = document.createTextNode("Next");
				newNextBtn.appendChild(btnNextText);
				container.appendChild(newNextBtn);
				newNextBtn.setAttribute("class", "img-btn-next");
				newNextBtn.setAttribute("onclick", "changeImg(1)");
				newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;";
			};
		};
	});
}

function closeImg() {
	document.querySelector(".img-window").remove();
	document.querySelector(".img-btn-prev").remove();
	document.querySelector(".img-btn-next").remove();
}

function changeImg(changeDir) {
	document.querySelector("#current-img").remove();

	let getImgWindow = document.querySelector(".img-window");
	let newImg = document.createElement("img");
	getImgWindow.appendChild(newImg);

	let calcNewImage;
	if (changeDir === 1) {
		calcNewImage = getLatestOpenedImg + 1;
		if (calcNewImage > galleryImages.length) {
			calcNewImage = 1;
		}
	} else if (changeDir === 0) {
		calcNewImage = getLatestOpenedImg - 1;
		if (calcNewImage < 1) {
			calcNewImage = galleryImages.length;
		}
	}
	newImg.setAttribute("src", "img/" + calcNewImage + ".jpg");
	newImg.setAttribute("id", "current-img");

	getLatestOpenedImg = calcNewImage;
}
