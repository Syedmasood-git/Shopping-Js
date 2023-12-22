const cards = document.getElementById("cards");
const mens = document.getElementById("men");
const womens = document.getElementById("women");
const kids = document.getElementById("kids");
const mens_card = document.querySelector(".mens_card");
const womens_card = document.querySelector(".womens_card");
const kids_card = document.querySelector(".kids_card");

let activeCategory = "mens";

//Fetch the Data from Api
async function fetchData() {
  try {
    const response = await fetch(
      `https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`
    );
    const data = await response.json();
    console.log(data.categories);
    cards.innerHTML = "";
    //check active category and fetch data
    if (activeCategory === "mens") {
      mensData(data.categories[0]);
    } else if (activeCategory === "womens") {
      womensData(data.categories[1]);
    } else if (activeCategory === "kids") {
      kidsData(data.categories[2]);
    }
    highlightOption();
  } catch (error) {
    console.log(error.message);
  }
}

//Calculate Percentage on Offers
function calculatePercentage(originalPrice, discountedPrice) {
  const percentageOff =
    ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(percentageOff);
}

//Display Mens Category
function mensData(categories) {
  console.log(categories.category_products);
  categories.category_products.forEach((item) => {
    const mensContainer = document.createElement("div");
    mensContainer.className = "mens_card";
    mensContainer.innerHTML = `
        <div class="card">
        <div class='img-div'>
        ${item.badge_text ? `<p class='badge'>${item.badge_text}</p>` : ""}
            <img src="${item.image}" alt="">
        </div>
        <div class='item-title'>
            <h3>${item.title}</h3>
            <span class='brand'><span class='dot'>.</span>${item.vendor}</span>
        </div>
        <div class='price-div'>
            <div class='price'>RS ${item.price}</div>
            <div class='strike-price'><s>${item.compare_at_price}</s></div>
            <div class='offer'>${calculatePercentage(
              item.compare_at_price,
              item.price
            )}% off</div>
        </div>
        <div class='btn'><button>Add To Cart</button></div>
    </div>`;
    cards.appendChild(mensContainer);
  });
}

//Display Womens Category
function womensData(categories) {
  categories.category_products.forEach((item) => {
    const womensContainer = document.createElement("div");
    womensContainer.className = "womens_card";
    womensContainer.innerHTML = `
    <div class="card">
        <div class='img-div'>
        ${item.badge_text ? `<p class='badge'>${item.badge_text}</p>` : ""}
            <img src="${item.image}" alt="">
        </div>
        <div class='item-title'>
            <h3>${item.title}</h3>
            <span class='brand'><span class='dot'>.</span>${item.vendor}</span>
        </div>
        <div class='price-div'>
            <div class='price'>RS ${item.price}</div>
            <div class='strike-price'><s>${item.compare_at_price}</s></div>
            <div class='offer'>${calculatePercentage(
              item.compare_at_price,
              item.price
            )}% off</div>
        </div>
        <div class='btn'><button>Add To Cart</button></div>
    </div>`;
    cards.appendChild(womensContainer);
  });
}

//Display Kids Category
function kidsData(categories) {
  categories.category_products.forEach((item) => {
    const kidsContainer = document.createElement("div");
    kidsContainer.className = "kids_card";
    kidsContainer.innerHTML = `
    <div class="card">
        <div class='img-div'>
        ${item.badge_text ? `<p class='badge'>${item.badge_text}</p>` : ""}
            <img src="${item.image}" alt="">
        </div>
        <div class='item-title'>
            <h3>${item.title}</h3>
            <span class='brand'><span class='dot'>.</span>${item.vendor}</span>
        </div>
        <div class='price-div'>
            <div class='price'>RS ${item.price}</div>
            <div class='strike-price'><s>${item.compare_at_price}</s></div>
            <div class='offer'>${calculatePercentage(
              item.compare_at_price,
              item.price
            )}% off</div>
        </div>
        <div class='btn'><button>Add To Cart</button></div>
    </div>`;
    cards.appendChild(kidsContainer);
  });
}

//Make Selected Category highlited by adding class active
function highlightOption() {
  mens.classList.remove("active");
  womens.classList.remove("active");
  kids.classList.remove("active");
  if (activeCategory === "mens") {
    mens.classList.add("active");
  } else if (activeCategory === "womens") {
    womens.classList.add("active");
  } else if (activeCategory === "kids") {
    kids.classList.add("active");
  }
}
// initially fetch all the data
fetchData();
highlightOption();
mens.addEventListener("click", () => {
  activeCategory = "mens";
  fetchData();
});

womens.addEventListener("click", () => {
  activeCategory = "womens";
  fetchData();
});
kids.addEventListener("click", () => {
  activeCategory = "kids";
  fetchData();
});
