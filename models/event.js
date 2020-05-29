class Event {
    constructor(id, date, hostName, title, description, category, latitude, longitude) {
        this.id = id;
        this.date = date;
        this.hostName = hostName;
        this.title = title;
        this.description = description;
        this.category = category;
        this.latitude = latitude;
        this.longitude = longitude;
    }
};

export default Event;