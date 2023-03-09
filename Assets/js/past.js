let cardContainer = document.getElementById('cardContainer');
let currentDateData = parseInt(data.currentDate);

for (let i = 0; i < data.events.length; i++) {
  if (data.events[i].date < data.currentDate) {

    let card = document.createElement('section');
    card.innerHTML = `
    <div class="container">
        <div class="row p-2 justify-content-center">
        <div class="col-md-3" style="width: 18rem; height: 30rem;">
            <div class="card">
            <img src="${data.events[i].image}" class="card-img-top" alt="...">
            <div class="card-body" style="height: auto;">
                <h5 class="card-title fw-bold">${data.events[i].name}</h5>
                <p class="card-text">${data.events[i].description}</p>
                <p class="card-text m-0"><span class="bold-color-card">Place: </span> ${data.events[i].place}</p>
                <p class="card-text m-0"><span class="bold-color-card">Capacity: </span> ${data.events[i].capacity}</p>
                <p class="card-text m-0"><span class="bold-color-card">Assistance: </span>${data.events[i].assistance}</p>
                <div class="d-flex p-2 justify-content-between h-10 ">
                <p class="card-price m-0"><strong>Price $${data.events[i].price}</strong></p>
                <a href="./details.html" class="btn btn-primary">See More</a>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    `;
    cardContainer.appendChild(card);
  }
}


