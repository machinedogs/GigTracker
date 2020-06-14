class Event {
    constructor(id, title, description, date,image, category,latitude,longitude,host ) {
        this.id = id;
        this.title = title,
        this.description = description,
        this.date = date, 
        this.image = image, 
        this.category = category,
        this.latitude = latitude
        this.longitude = longitude
        this.host = host
    }
};

export default Event;