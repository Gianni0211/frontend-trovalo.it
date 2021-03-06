const menu = document.querySelector("#dropdown");
const menuButton = document.querySelector("#navbarDropdownMenuLink");

menuButton.addEventListener("click", () => {
  if (Array.from(menu.classList).includes("dropdown-none")) {
    menu.style.display = "block";

    setTimeout(() => {
      menu.classList.remove("dropdown-none");
      menu.classList.add("dropdown-show");
    }, 100);
  } else {
    menu.classList.remove("dropdown-show");
    menu.classList.add("dropdown-none");
    menu.style.display = "none";
  }
});

// https://fakestoreapi.com/products

const addProduct = (prodotti) => {
  productWrapper.innerHTML = "";
  prodotti.forEach((el) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="product-detail-card mt-5 mb-5">
              <div class="img-prod-d">
                <img src="${el.image}" class="img-fluid"  alt="${el.title}" />
              </div>
              <div class="product-description">
                <a href="" class="text-decoration-none text-dark"
                  ><h5>${el.title}</h5></a
                >
                <p class="lead">
                  ${el.description.substr(0, 50)}[..]
                </p>
                <div class='mt-5'>
                  <p class="h2 d-inline-block">${el.price}€</p>
                <a class="view-more-cta float-right mr-4" href="./articolo.html?${
                  el.id
                }">Dettagli</a>
                </div>
            </div>
          </div>`;

    productWrapper.appendChild(div);
  });
};
const addCat = (data) => {
  let categorie = Array.from(new Set(data.map((el) => el.category))).sort();

  categorie.forEach((el) => {
    let div = document.createElement("div");
    div.innerHTML = `<div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" id="${el
          .split(" ")
          .join("")}" />
        <label class="custom-control-label" for="${el.split(" ").join("")}"">
          ${el}
        </label>
      </div>`;
    categorieWrapper.appendChild(div);
  });
};

const filterByCat = (data) => {
  const input = document.querySelectorAll("input[type=checkbox]");
  let filterCat = [];

  input.forEach((el) => {
    el.addEventListener("input", (item) => {
      let check = item.target.checked;

      if (check) {
        filterCat.push(item.target.id);
      } else {
        let index = filterCat.indexOf(item.target.id);

        filterCat.splice(index, 1);
      }
      let filterData = data.filter((el) => {
        return filterCat.includes(el.category.split(" ").join(""));
      });
      console.log(filterData);
      addProduct(filterData.length > 0 ? filterData : data);
    });
  });
};

const filterByPrice = (data) => {
  //Max price
  const maxPrice = data
    .map((el) => el.price)
    .sort((a, b) => a - b)
    .pop();
  rangeValues.innerHTML = ` <p id='rangeValues'>0€<span class="float-right" >${
    +maxPrice + 1
  }€</span></p>`;

  range.max = +maxPrice + 1;

  range.addEventListener("input", () => {
    currentValue.innerHTML = range.value + "€";
    let filterValueSelected = range.value;
    const filteredDataByValue = data.filter(
      (el) => el.price <= filterValueSelected
    );
    addProduct(filteredDataByValue);
  });
};

const orderByPrice = (data) => {
  const crescente = document.querySelector("#crescente");
  const decrescente = document.querySelector("#decrescente");

  crescente.addEventListener("click", (e) => {
    e.preventDefault();
    let test = data.sort((a, b) => a.price - b.price);
    addProduct(test);
  });

  decrescente.addEventListener("click", (e) => {
    e.preventDefault();
    let test = data.sort((a, b) => b.price - a.price);
    addProduct(test);
  });
};
const filtertByWord = (data) => {
  const boxRicerca = document.querySelectorAll("input[type=search]");
  boxRicerca.forEach((el) =>
    el.addEventListener("input", (e) => {
      let filteredData = data.filter((prod) =>
        prod.title.toLowerCase().includes(e.target.value.toLowerCase())
      );

      addProduct(filteredData);
    })
  );
};

const productSett = async () => {
  const productWrapper = document.querySelector("#productWrapper");
  const categorieWrapper = document.querySelector("#categorieWrapper");
  const range = document.querySelector("#range");
  const rangeValues = document.querySelector("#rangeValues");
  const currentValue = document.querySelector("#currentValue");

  try {
    const dataJson = await fetch("https://fakestoreapi.com/products");
    const data = await dataJson.json();

    localStorage.setItem("data", JSON.stringify(data));
    orderByPrice(data);

    filterByPrice(data);
    addCat(data);
    filterByCat(data);
    filtertByWord(data);
    addProduct(data);
  } catch (err) {
    console.log(err);
    alert("oh no.. Qualcosa è andato storto");
  }
};

//Populate article details

const url = new URL(window.location.href);

const productDetailSetter = () => {
  if (url.search) {
    const titolo = document.querySelector("#titolo");
    const price = document.querySelector("#price");
    const category = document.querySelector("#category");
    const description = document.querySelector("#description");
    const carouselImg = document.querySelectorAll(".swiper-slide img");

    //Accedo dal local storage per performance
    let dataString = localStorage.getItem("data");
    let data = JSON.parse(dataString);

    //filtro in base al paramentro inserito nell url (id prodotto)
    const product = data.filter((el) => el.id == url.search.replace(/\?/, ""));

    if (product.length === 0) {
      window.location.replace("./404.html");
    } else {
      //popolo i campi
      titolo.innerHTML = product[0].title;
      price.innerHTML = product[0].price + "€";
      category.innerHTML = product[0].category;
      description.innerHTML = product[0].description;
      carouselImg.forEach((el) => (el.src = product[0].image));
    }
  }
};
productDetailSetter();

//Controlliamo di essere nella pagina corretta
if (url.pathname.includes("/products.html")) {
  productSett();
}

//Pannello Admin
let showAdmin = localStorage.getItem("admin") == "true"
const pannelloAdminWrapper = document.querySelector("#admin");
console.log(showAdmin)

if (url.pathname == "/articolo.html") {
  console.log('primo if')
  if (showAdmin) {
    console.log('secondo if')
    pannelloAdminWrapper.innerHTML = `<div class="my-5">
          <h3>Zaino</h3>
        <div class="progress ">
        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 99%"></div>
        </div>
        </div>
        <div class="my-5">
        <h3>Sangue</h3>
        <div class="progress ">
        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 10%"></div>
        </div>
        </div>
        <div class="my-5">
        <h3>Carosello</h3>
        <div class="progress ">
        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
        </div>
        </div>`;
  } else{
    console.log('else')
    pannelloAdminWrapper.innerHTML = "";
  }
  
}


