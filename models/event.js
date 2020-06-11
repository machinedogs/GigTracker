class Event {
    constructor(id, date, hostName, hostEmail, title, description, category, latitude, longitude) {
        this.id = id;
        this.date = date;
        this.host = {
            hostName: hostName,
            hostEmail: hostEmail
        }
        this.title = title;
        this.description = description;
        this.category = category;
        this.location = {
            latitude: latitude,
            longitude: longitude
        }
    }
};

export default Event;