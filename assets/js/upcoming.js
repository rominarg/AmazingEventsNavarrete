let cardContainer = document.getElementById("cardContainer");
let checkContainer = document.getElementById("checkContainer");
let curDate = new Date();

getData()
async function getData() {
  let response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
  let data = await response.json();
  // let curDate = new Date();
  imprimirCardUpcoming(data.events);
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

function imprimirCardUpcoming(data) {
  let templateHtml = "";
  if (data.length !== 0) {
    data.forEach((event) => {
      let eventDate = new Date(event.date);
      // console.log(eventDate)
      if (eventDate > curDate) {
        templateHtml += `
        <div class="col-md-4 col-sm-6 col-lg-3">
        <div class="card">
          <img src="${event.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title fw-bold">${event.name}</h5>
            <p class="card-text">${event.description}</p>
          </div>
          <div class="card-footer">
            <div class="d-flex p-2 justify-content-between h-10">
            <div class="price-btn">Price $${event.price}</div>
              <a href="./details.html?id=${event._id}" class="btn btn-primary">See More</a>
            </div>
          </div>
        </div>
      </div>   
        `;
      }
    });
    cardContainer.innerHTML = `
    <div class="row justify-content-center text-center">
            ${templateHtml}
          </div>
    `;
  } else {
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


// Obtengo las categorías de los eventos
// let checkboxsOrigin = dataOriginalEvents.map((evento) => evento.category);
// let filterrepeat = new Set(checkboxsOrigin); 
// let categoriesCheck = [...filterrepeat];

// Función que muestra los checkboxes de las categorías
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
// Muestro los checkboxes de las categorías
// impCheck();

// Variables para almacenar los checkboxes seleccionados y el texto de búsqueda
// let checkboxSelected = [];
// let textSearch = "";

// Obtengo el elemento del DOM donde el usuario ingresa el texto de búsqueda
// let checkbox = document.querySelectorAll("input[type=checkbox]");
//   checkbox.forEach((check) =>
//     check.addEventListener("click", (event) => {
//       let checked = event.target.checked;

//       if (checked) {

//         checkboxSelected.push(event.target.value);
//         crossfilterDoble();

//       } else {
//         checkboxSelected = checkboxSelected.filter(
//           (uncheck) => uncheck !== event.target.value
//         );
//         crossfilterDoble();
//       }
//     })
//   );

// Obtengo el elemento del DOM donde el usuario ingresa el texto de búsqueda
let search = document.getElementById("searchLocation");

//Listener de eventos para detectar cuando el usuario ingresa texto
// search.addEventListener("keyup", (event) => {
//   textSearch = event.target.value;
//   crossfilterDoble();
// });

// "crossfilterDoble" verifica primero si se han seleccionado opciones de checkbox y si se ha ingresado texto de búsqueda
function crossfilterDoble(dataOriginalEvents,checkboxSelected,textSearch) {
  let datos = [];
  console.log
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