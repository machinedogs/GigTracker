class Event {
    constructor(id, title, description, date,image, category,latitude,longitude,address,host ) {
        this.id = id;
        this.title = title,
        this.description = description,
        this.date = date, 
        this.image = image, 
        this.category = category,
        this.latitude = latitude,
        this.longitude = longitude,
        this.address = address,
        this.host = host
    }
};

export default Event;