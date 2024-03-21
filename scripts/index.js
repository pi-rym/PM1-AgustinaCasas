class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
        this.id = 0;
    }

    // Crea una actividad y la agrega al array
    createActivity(title, description, imgUrl) {
        const id = this.id++;
        const newActivity = new Activity(id, title, description, imgUrl);
        this.activities.push(newActivity);
    }

    // Devuelve todas las actividades
    getAllActivities() {
        return this.activities;
    }

    // Elimina una actividad por id
    deleteActivity(id) {
        this.activities = this.activities.filter((activity) => activity.id !== id);
    }
}

//Creo una instancia de la calse Repository
const activityRepository = new Repository();

function createCard(activity) {
    const { id, title, description, imgUrl } = activity;

    //Creo elementos HTML
    const cardDiv = document.createElement("div");
    const titleElement = document.createElement("h3");
    const descriptionElement = document.createElement("p");
    const imageElement = document.createElement("img");
    const deleteButton = document.createElement("button");

    //Asigno valores de la actividad
    titleElement.innerHTML = title;
    descriptionElement.innerHTML = description;
    imageElement.src = imgUrl;
    imageElement.alt = title; 
    deleteButton.innerHTML = "Eliminar";
    
    //Asigno las clases para aplicar estilos
    cardDiv.classList.add("card_item");
    titleElement.classList.add("title");
    descriptionElement.classList.add("description");
    imageElement.classList.add("card_img");
    deleteButton.classList.add("button");
    deleteButton.classList.add("eliminar");
    deleteButton.id = id;

    deleteButton.addEventListener("click", function () {
        handleDeleteActivity(id);
    });

    //Agrego todos los elementos al div
    cardDiv.appendChild(imageElement);
    cardDiv.appendChild(titleElement);
    cardDiv.appendChild(descriptionElement);
    cardDiv.appendChild(deleteButton);

    return cardDiv;
}

function updateCardContainer() {
    const cardContainer = document.getElementById("cardContainer");
    
    cardContainer.innerHTML = "";

    //Actualizo el panel con las actividades del repositorio
    const activities = activityRepository.getAllActivities();
    const activityElements = activities.map((activity) => createCard(activity));
    
    cardContainer.append(...activityElements);
}

function handleCreateActivity(event) {
    event.preventDefault();

    //Obtengo los elementos y sus valores
    const titleInput = document.getElementById("titleInput");
    const descriptionInput = document.getElementById("descriptionInput");
    const urlInput = document.getElementById("urlInput");

    const title = titleInput.value;
    const description = descriptionInput.value;
    const imgUrl = urlInput.value;
    
    activityRepository.createActivity(title, description, imgUrl);
    
    updateCardContainer();
    
    //Vuelvo a nulo el formulario
    titleInput.value = "";
    descriptionInput.value = "";
    urlInput.value = "";
}

const addActivityButton = document.getElementById("addActivity");
addActivityButton.addEventListener("click", handleCreateActivity);

function handleDeleteActivity(activityId) {
    activityRepository.deleteActivity(activityId);
    updateCardContainer();
}