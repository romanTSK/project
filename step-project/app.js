const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider(){
    if(slides.length > 0){
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 5000);
    }
}

function showSlide(index){
    if(index >= slides.length){
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide(){
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
}









let section = document.querySelector("section");
let input = document.querySelector("#id1");
let minPrice = document.querySelector("#minPrice");
let maxPrice = document.querySelector("#maxPrice");
let searchBtn = document.getElementById("search");
let clearBtn = document.getElementById("clear");
let brandBtns = document.querySelectorAll(".brand");

clearBtn.addEventListener("click", function() {
    section.innerHTML = "";
});

searchBtn.addEventListener("click", function() {
    let apiUrl = `https://api.everrest.educata.dev/shop/products/brand/${input.value}`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(response => {
        let filteredProducts = response.products;
        if (minPrice.value && maxPrice.value) {
            filteredProducts = filteredProducts.filter(product => product.price.current >= minPrice.value && product.price.current <= maxPrice.value);
        }
        renderer(filteredProducts);
    })
});

brandBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        let apiUrl = `https://api.everrest.educata.dev/shop/products/brand/${this.value}`;
        fetch(apiUrl)
        .then(response => response.json())
        .then(response => {
            let filteredProducts = response.products;
            if (minPrice.value && maxPrice.value) {
                filteredProducts = filteredProducts.filter(product => product.price.current >= minPrice.value && product.price.current <= maxPrice.value);
            }
            renderer(filteredProducts);
        })
    });
});

function renderer(apiList) {
    section.innerHTML = "";
    apiList.forEach(item => {
        section.innerHTML += `
        <div class="card" style="width: 15rem;">
        <img src="${item.images[1]}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${item.price.current}</h5>
          <p class="card-text">${item.title}</p>
          <a href="#" class="btn btn-primary">Buy</a>
        </div>
      </div>
        `
    });
}


