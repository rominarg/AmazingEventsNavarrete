const id = parseInt(new URLSearchParams(location.search).get("id"));
const evento = data.events.find(spot => spot._id === id);

const mostrarEvento = (idContainer) => {
  const container = document.getElementById(idContainer);
  let eventCard = document.createElement("div");
  eventCard.className = "event-card row";
  eventCard.innerHTML = `<div class="col-md-5">
    <img src="${evento.image}" alt="..." class="mb-4 mb-md-0" style="width: 500px; height: 400px;">
</div>
<div class="col-md-6 d-flex flex-column justify-content-center">
    <h2 class="details_title">${evento.name}</h2>
    <p>${evento.description}</p>
    <p class="h6"><strong>Date: </strong>${evento.date}</p>
    <p><strong>Category: </strong>${evento.category}</p>
    <p><strong>Place: </strong>${evento.place}</p>
    <p><strong>Capacity: </strong>${evento.capacity}</p>
    <p><strong>Assistance: </strong>${evento.assistance}</p>
    <p><strong>Price: </strong>$${evento.price}</p>
</div>`;
container.appendChild(eventCard);
};

mostrarEvento("eventContainer");