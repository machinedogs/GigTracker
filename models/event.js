class Event {
    constructor(id, date, hostName, hostEmail, title, description, category, latitude, longitude) {
        this.id = id;
        this.date = date;
        this.name = hostName,
        this.email = hostEmail
        this.title = title;
        this.description = description;
        this.category = category;
        this.latitude = latitude,
        this.longitude = longitude
    }
};

export default Event;