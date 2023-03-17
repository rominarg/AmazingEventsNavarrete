let cardContainer = document.getElementById ("cardContainer")
let checkContainer = document.getElementById ("checkContainer")

getData()
async function getData () {
  let response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
  let data = await response.json();
  imprimirCard(data.events);
  let checkboxsOrigin = data.events.map((evento) => evento.category);
  let filterrepeat = new Set(checkboxsOrigin); 
  let categoriesCheck = [...filterrepeat];
  impCheck(categoriesCheck);
  let checkboxSelected = [];
  let textSearch = "";
  let checkbox = document.querySelectorAll("input[type=checkbox]");
    checkbox.forEach((check) =>
      check.addEventListener("click", (event) => {
        let checked = event.target.checked;
        if (checked) {
// Si se selecciona un checkbox, lo agregamos al array de categorías seleccionadas y actualizamos las cards
          checkboxSelected.push(event.target.value);
          crossfilterDoble(data.events,checkboxSelected,textSearch);
        } else {
 // Si se deselecciona un checkbox, lo eliminamos del array de categorías seleccionadas y actualizamos las cards
          checkboxSelected = checkboxSelected.filter(
            (uncheck) => uncheck !== event.target.value
          );
          crossfilterDoble(data.events,checkboxSelected,textSearch);
        }
      })
    );
    let search = document.getElementById("searchLocation");
    search.addEventListener("keyup", (event) => {
      textSearch = event.target.value;
      crossfilterDoble(data.events,checkboxSelected,textSearch);
    });
}

function imprimirCard(array) {
  let locationforCards = "";
  if (array.length !== 0) {
    array.forEach((data) => {
      locationforCards +=`
      <div class="col-md-4 col-sm-6 col-lg-3">
      <div class="card">
        <img src="${data.image}" class="card-img-top" alt="...">
        <div class="card-body" style="padding: 1rem;">
          <h5 class="card-title fw-bold">${data.name}</h5>
          <p class="card-text">${data.description}</p>
        </div>
        <div class="card-footer">
          <div class="d-flex p-2 justify-content-between">
            <div class="price-btn">Price $${data.price}</div>
            <a href="./details.html?id=${data._id}" class="btn btn-primary">See More</a>
          </div>
        </div>
      </div>
    </div>    
      `;
    });
    // Agrego las tarjetas al contenedor en el DOM
    cardContainer.innerHTML = `
      <div class="row justify-content-center text-center">
        ${locationforCards}
      </div>
    `;
    // Si no hay eventos, mostramos un mensaje
  } else {
    cardContainer.innerHTML = `
      <div class="d-flex align-items-center justify-content-center">
        <div class="text-center">
          <img src="./assets/img/not_found.png" alt="events_not _found" class="logo d-inline-block align-text-top">
        </div>
      </div>
      <section class="button_back">
      <a href="index.html" class="btn btn-primary button_back">Back</button>
      </section>
      `;
  }
}

// Obtengo las categorías de los eventos y creamos los checkboxes correspondientes
// let checkboxsOrigin = data.events.map((evento) => evento.category);
// let filterrepeat = new Set(checkboxsOrigin); 
// let categoriesCheck = [...filterrepeat];

// Función que imprime los checkboxes
  function impCheck(category) {
    let impCheckboxslocation = "";
    category.forEach((categoria) => {
      impCheckboxslocation += `
      <div class="form-check mr-3">
      <label class="checks_search">            
      <input class="form-check-input text-start" type="checkbox" 
      value=${categoria} id="flexCheckChecked">
      ${categoria}
      </label>
      </div>
      `;
    });
    checkContainer.innerHTML = impCheckboxslocation;
  }

  //Filtro cruzado
  function crossfilterDoble(dataOriginalEvents,checkboxSelected,textSearch) {
    let datos = [];
    if (checkboxSelected.length > 0 && textSearch !== "") {
      checkboxSelected.map((selected) => {
        datos.push(...dataOriginalEvents.filter((evento) =>
              evento.name.toLocaleLowerCase().includes(
                textSearch.trim().toLocaleLowerCase()
              ) && evento.category.includes(selected)
          )
        );

      });
    } else if (checkboxSelected.length > 0 && textSearch === "") {
      checkboxSelected.map((selected) => {
        datos.push(
          ...dataOriginalEvents.filter((evento) => evento.category.includes(selected))
        );
      });
    } else if (checkboxSelected.length == 0 && textSearch !== "") {
      datos.push(
        ...dataOriginalEvents.filter((evento) =>
          evento.name
            .toLocaleLowerCase()
            .includes(textSearch.trim().toLocaleLowerCase())
        )
      );
    } else {
      datos.push(...dataOriginalEvents);
    }
    imprimirCard(datos);
  }
  crossfilterDoble();