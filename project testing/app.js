const wrapper = document.querySelector(".sliderWrapper")

const menuItems = document.querySelectorAll(".menuItem")


menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        wrapper.style.transform = `translateX(${-100 * index}vw)`;
    });
});

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
        <div class="card" style="width: 18rem;">
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
