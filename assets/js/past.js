let cardContainer = document.getElementById("cardContainer");
let checkContainer = document.getElementById("checkContainer");
let curDate = new Date();

getData()
async function getData() {
  let response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
  let data = await response.json();
  imprimirCardPast(data.events);
  console.log(imprimirCardPast)
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
        checkboxSelected.push(event.target.value);
        crossfilterDoble(data.events,checkboxSelected,textSearch);
      } else {
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

function imprimirCardPast(data) {
  let templateHtml = "";
  if (data.length !== 0) {
    data.forEach((event) => {
      let eventDate = new Date(event.date);
      if (eventDate < curDate) {
        templateHtml +=`
        <div class="col-12 col-md-6 col-lg-3">
        <div class="card">
          <img src="${event.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title fw-bold">${event.name}</h5>
            <p class="card-text">${event.description}</p>
          </div>
          <div class="card-footer">
            <div class="price-btn">Price $${event.price}</div>
              <a href="./details.html?id=${event._id}" class="btn btn-primary">See More</a>
            </div>
          </div>
      </div>     
        `;
      }
    });
    cardContainer.innerHTML = `
            ${templateHtml}
  `;
  } else {
    cardContainer.innerHTML = `
      <div class="d-flex align-items-center justify-content-center">
        <div class="text-center">
          <img src="./assets/img/not_found.png" alt="events_not_found" class="logo d-inline-block align-text-top">
        </div>
      </div>
      <section class="button_back">
  <a href="past_events.html" class="btn btn-primary button_back">Back</a>
</section>
    `;
  }
}

// imprimirCardPast();
// let checkboxsOrigin = dataOriginalEvents.map((evento) => evento.category);
// let filterrepeat = new Set(checkboxsOrigin); 
// let categoriesCheck = [...filterrepeat];

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

// impCheck();
// let checkboxSelected = [];
// let textSearch = "";
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

let search = document.getElementById("searchLocation");
// search.addEventListener("keyup", (event) => {
//   textSearch = event.target.value;
//   crossfilterDoble();
// });

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
  imprimirCardPast(datos);
}
crossfilterDoble();