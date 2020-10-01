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


if (window.location.href == "http://127.0.0.1:5500/products.html") {
  const addProduct = (prodotti) => {
    productWrapper.innerHTML = "";
    prodotti.forEach((el) => {
      const div = document.createElement("div");
      div.innerHTML = `
          <div class="product-detail-card mt-5">
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
                <p class="h2 d-inline-block">${el.price}€</p>
                <div class="add-cta float-right mr-4">Dettagli</div>
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

  const productSett = async () => {
    const productWrapper = document.querySelector("#productWrapper");
    const categorieWrapper = document.querySelector("#categorieWrapper");

    try {
      const dataJson = await fetch("https://fakestoreapi.com/products");
      const data = await dataJson.json();
      addCat(data);

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

      addProduct(data);
    } catch (err) {
      console.log(err);
      alert("oh no.. Qualcosa è andato storto");
    }
  };

  productSett();
}
