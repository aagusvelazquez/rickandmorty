// Fetch
// Declaración del objeto literal
const opciones = {
    method: "GET",
    headers: {
        accept: "application/json"
    }
};

// Función que renderiza personajes en el Front-end
function pedirDatos() {
    fetch("https://rickandmortyapi.com/api/character", opciones)
        .then(response => response.json())
        .then(data => {
            personajes = data.results;
            personajesFiltrados("all");
        })
        .catch((error) => {
            console.error(error);
        });
};

// Función para mostrar personajes
function displayCharacters(filteredCharacters) {
    // Obtenemos el contenedor donde renderizamos las tarjetas
    const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
    // Limpiar el contenedor
    contenedorTarjetas.innerHTML = '';

    filteredCharacters.forEach(personaje => {
        // Creamos el elemento HTML
        const article = document.createElement("article");
        // Agregamos estilo
        article.classList.add("tarjeta");
        // Inyectamos contenido a <article>
        article.innerHTML = `
        <img src="${personaje.image}" alt="Imagen del personaje ${personaje.name}" class="card_img-size">
        <label>Nombre:</label>
        <p>${personaje.name}</p>
        <div>
            <label>Estado:</label>
            <p><i class="fa-solid fa-circle ${personaje.status.toLowerCase()}"></i> ${personaje.status}</p>
            <label>Planeta:</label>
            <p>${personaje.location.name}</p>
        </div>
        `;

        // Inyectamos el contenido
        contenedorTarjetas.appendChild(article);
    });
}

// Función para filtrar personajes según el estado
function personajesFiltrados(status) {
    let filteredCharacters;
    if (status === 'all') {
        filteredCharacters = personajes;
    } else {
        filteredCharacters = personajes.filter(personaje => personaje.status === status);
    }
    displayCharacters(filteredCharacters);
}

// Evento para el cambio de selección en el select
document.getElementById('state').addEventListener('change', (event) => {
    personajesFiltrados(event.target.value);
});

// Llamada a la funcion
pedirDatos();