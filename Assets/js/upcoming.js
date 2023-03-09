// Obtengo los datos de los eventos y la fecha actual
let dataOriginalEvents = data.events;
let curDate = data.currentDate;
// Obtengo los elementos del DOM donde vamos a mostrar las tarjetas y los checkboxes
let cardContainer = document.getElementById ("cardContainer")
let checkContainer = document.getElementById ("checkContainer")

// Función que muestra las tarjetas de los eventos próximos
function imprimirCardUpcoming(array) {
  let templateHtml = "";
  if (array.length !== 0) {
    array.forEach((data) => {
      if (data.date > curDate) {
        templateHtml +=`
        <div class="col-md-3 col-sm-6 col-md-4 col-lg-3 mx-4 my-1">
          <div class="card">
            <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title fw-bold">${data.name}</h5>
              <p class="card-text">${data.description}</p>
              <div class="d-flex p-10 justify-content-between h-20">
                <p class="card-price m-0">Price $${data.price}</p>
                <a href="./details.html?id=${data._id}" class="btn btn-primary">See More</a>
              </div>
            </div>
          </div>
        </div>`;
      }
      // Agrego las tarjetas al contenedor en el DOM
      cardContainer.innerHTML = `
        <section>
          <div class="container">
            <div class="row justify-content-center text-center">
              ${templateHtml}
            </div>
          </div>
        </section>`;
    });
  } else {
     // Si no hay eventos, muestro mensaje
    cardContainer.innerHTML = `
    <div class="d-flex align-items-center justify-content-center">
    <div class="text-center">
    <img src="./assets/img/not_found.png" alt="events_not _found" class="logo d-inline-block align-text-top">
    </div>
    </div>
    <section class="button_back">
    <a href="upcoming_events.html" class="btn btn-primary button_back">Back</button>
    </section>
  `;
  }
}
// Mostrar tarjetas proximos eventos
imprimirCardUpcoming(dataOriginalEvents);

// Obtengo las categorías de los eventos
let checkboxsOrigin = dataOriginalEvents.map((evento) => evento.category);
let filterrepeat = new Set(checkboxsOrigin); 
let categoriesCheck = [...filterrepeat];

// Función que muestra los checkboxes de las categorías
function impCheck() {
  let impCheckboxslocation = "";
  categoriesCheck.forEach((categoria) => {
    impCheckboxslocation += `<label class="checks_search">            
    <input class="form-check-input text-start" type="checkbox" 
    value=${categoria} id="flexCheckChecked">
    ${categoria}
    </label>`;
  });
  // Agregamos los checkboxes al contenedor en el DOM
  checkContainer.innerHTML = impCheckboxslocation;
}
// Muestro los checkboxes de las categorías
impCheck();

// Variables para almacenar los checkboxes seleccionados y el texto de búsqueda
let checkboxSelected = [];
let textSearch = "";

// Obtengo el elemento del DOM donde el usuario ingresa el texto de búsqueda
let checkbox = document.querySelectorAll("input[type=checkbox]");
  checkbox.forEach((check) =>
    check.addEventListener("click", (event) => {
      let checked = event.target.checked;

      if (checked) {

        checkboxSelected.push(event.target.value);
        crossfilterDoble();

      } else {
        checkboxSelected = checkboxSelected.filter(
          (uncheck) => uncheck !== event.target.value
        );
        crossfilterDoble();
      }
    })
  );

// Obtengo el elemento del DOM donde el usuario ingresa el texto de búsqueda
let search = document.getElementById("searchLocation");

//Listener de eventos para detectar cuando el usuario ingresa texto
search.addEventListener("keyup", (event) => {
  textSearch = event.target.value;
  crossfilterDoble();
});

// "crossfilterDoble" verifica primero si se han seleccionado opciones de checkbox y si se ha ingresado texto de búsqueda
function crossfilterDoble() {
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
  imprimirCardUpcoming(datos);

}
crossfilterDoble();