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