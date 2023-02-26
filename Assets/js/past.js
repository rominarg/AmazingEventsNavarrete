let cardContainer = document.getElementById('cardContainer');
let currentDateData = parseInt(data.currentDate);

for (let i = 0; i < data.events.length; i++) {
  if (data.events[i].date < data.currentDate) {

    let card = document.createElement('section');
    card.innerHTML = `
      <div class="container">
        <div class="row p-2 justify-content-center">
          <div class="col-md-3" style="width: 18rem; height: 22rem;">
            <div class="card">
              <img src="${data.events[i].image}" class="card-img-top h-38" alt="...">
              <div class="card-body">
                <h5 class="card-title fw-bold">${data.events[i].name}</h5>
                <p class="card-text">${data.events[i].description}</p>
                <div class="d-flex p-2 justify-content-between h-10 ">
                  <p class="card-price m-0">Price$${data.events[i].price}</p>
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


