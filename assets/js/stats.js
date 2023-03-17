const tab1 = document.getElementById('tab1')// Selecciono el elemento del DOM con el id "tab1"
const tab2 = document.getElementById('tab2')
const tab3 = document.getElementById('tab3')

async function apiEvents(){ // Defino una función asíncrona llamada "apiEvents"

const response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");  // Realiza una petición GET a la URL especificada y espera la respuesta
const data = await response.json(); // Convierte la respuesta en un objeto JavaScript y espera que se complete
const dataEvents = data; // Asigno el objeto JavaScript a una variable llamada "dataEvents"

let events = dataEvents.events; // Creo un array llamado "events" que contiene los eventos obtenidos de la API
let past = dataEvents.events.filter(event => event.assistance); // Crea un array llamado "past" que contiene los eventos que ya han pasado y tienen asistencia registrada
let upcoming = dataEvents.events.filter(event => event.estimate);


events.map(event => { // Agrega dos propiedades nuevas al array "events"
event.percentageAssistance = 100 * event.assistance / event.capacity;// Calcula el porcentaje de asistencia para cada evento en "events"
event.revenue = event.price * event.assistance; // Calcula la cantidad de ingresos para cada evento en "events"
});
past.map(event => {// Agrega dos propiedades nuevas al array "past"
event.percentageAssistance = 100 * event.assistance / event.capacity;// Calcula el porcentaje de asistencia para cada evento en "past"
event.revenue = parseInt(event.price) * parseInt(event.assistance);
});
upcoming.map(event => {// Agrega dos propiedades nuevas al array "upcoming"
event.percentageAssistance = 100 * event.estimate / event.capacity;
event.revenue = parseInt(event.price) * parseInt(event.estimate);
});

let capacityEvents = [...events].sort((a,b) => a.capacity - b.capacity); // Cre un nuevo array llamado "capacityEvents" que contiene los eventos en "events" ordenados por capacidad de menor a mayor
let maxcapacityEvents = capacityEvents[capacityEvents.length-1];  // Obtengo el evento con la capacidad más grande

let percentageOfasistance = [...past].sort((a,b) => a.percentageAssistance - b.percentageAssistance);  // Creo un nuevo array llamado "percentageOfasistance" que contiene los eventos en "past" ordenados por porcentaje de asistencia de menor a mayor
let minpercentageOfasistance = percentageOfasistance[0]; // Obtengo el evento con el porcentaje de asistencia más bajo
let maxpercentageOfasistance = percentageOfasistance[percentageOfasistance.length-1];

let eventCategoryPast = new Set(past.map(event => event.category));
eventCategoryPast = [...eventCategoryPast];

let newArrayCategories = [...new Set(events.map(event => event.category))];
let eventCategoryUpcoming = [...new Set(upcoming.map(event => event.category))];

newArrayCategories.forEach(element => {
let capacity = 0;
let assistance = 0;
let revenues = 0;
past.forEach(event => {
    if(event.category === element){
    capacity += event.capacity;
    assistance += event.assistance;
    revenues += event.revenue;
    }
});
tab3.innerHTML += `<tr>
                        <td class="data_table fst-italic ps-1">${element}</td>
                        <td class="data_table fst-italic ps-1">$${revenues.toLocaleString('de-DE')}</td>
                        <td class="data_table fst-italic ps-1">${(Math.round(assistance * 10000 / capacity) / 100).toFixed(2) + "%"}</td>
                    </tr>`;
});

eventCategoryUpcoming.forEach(element => {
    let capacity = 0;
    let estimate = 0;
    let revenues = 0;
    upcoming.forEach(event => {
    if (event.category === element) {
        capacity += event.capacity;
        estimate += event.estimate;
        revenues += event.revenue;
    }
    });
tab2.innerHTML += `<tr>
    <td class="data_table fst-italic ps-1">${element}</td>
    <td class="data_table fst-italic ps-1">$${revenues.toLocaleString('de-DE')}</td>
    <td class="data_table fst-italic ps-1">${(estimate * 100 / capacity).toFixed(2)}%</td>
</tr>`;
});                 
tab1.innerHTML += `<tr>
<td class="data_table fst-italic ps-1">${maxpercentageOfasistance.name}: ${maxpercentageOfasistance.percentageAssistance.toFixed(2)}%</td>
                        <td class="data_table fst-italic ps-1">${minpercentageOfasistance.name}: ${minpercentageOfasistance.percentageAssistance}%</td>
                        <td class="data_table fst-italic ps-1">${maxcapacityEvents.name}: ${parseInt(maxcapacityEvents.capacity).toLocaleString('de-DE')}</td>
                    </tr>`
}
apiEvents()



