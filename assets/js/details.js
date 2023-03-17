async function getData() {
  const response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
  const data = await response.json();
  return data;
  }
  
  const mostrarEvento = async (idContainer) => {
  const container = document.getElementById(idContainer);
  const data = await getData();
  const id = parseInt(new URLSearchParams(location.search).get("id"));
  const evento = data.events.find(spot => spot._id === id);
  
  let eventCard = document.createElement("div");
  eventCard.className = "event-card row";
  eventCard.innerHTML = `<div class="col-md-5">
  <img src="${evento.image}" class="event-card" class="mb-4 mb-md-0">
  </div>
  <div class="col-md-6 d-flex flex-column justify-content-center">
  <h2 class="details_title">${evento.name}</h2>
  <p class="h6"><strong>Date: </strong>${(evento.date).slice(0,10)}</p>
  <p>${evento.description}</p>
  <p><strong>Category: </strong>${evento.category}</p>
  <p><strong>Place: </strong>${evento.place}</p>
  <p><strong>Capacity: </strong>${evento.capacity}</p>
  <p><strong>Assistance: </strong>${evento.assistance || evento.estimate}</p>
  <p><strong>Price: </strong>$${evento.price}</p>
  <a href="#" class="btn btn-primary">Buy Now!</a>
</div>
  </div>`;
  container.appendChild(eventCard);
  };
  
  mostrarEvento("eventContainer");
  

// const id = parseInt(new URLSearchParams(location.search).get("id"));
// const evento = data.events.find(spot => spot._id === id);

// const mostrarEvento = (idContainer) => {
//   const container = document.getElementById(idContainer);
//   let eventCard = document.createElement("div");
//   eventCard.className = "event-card row";
//   eventCard.innerHTML = `<div class="col-md-5">
//     <img src="${evento.image}" class class="mb-4 mb-md-0">
// </div>
// <div class="col-md-6 d-flex flex-column justify-content-center">
//     <h2 class="details_title">${evento.name}</h2>
//     <p>${evento.description}</p>
//     <p class="h6"><strong>Date: </strong>${evento.date}</p>
//     <p><strong>Category: </strong>${evento.category}</p>
//     <p><strong>Place: </strong>${evento.place}</p>
//     <p><strong>Capacity: </strong>${evento.capacity}</p>
//     <p><strong>Assistance: </strong>${evento.assistance}</p>
//     <p><strong>Price: </strong>$${evento.price}</p>
// </div>`;
// container.appendChild(eventCard);
// };

// mostrarEvento("eventContainer");