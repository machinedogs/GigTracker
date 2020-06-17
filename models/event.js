class Event {
    constructor(id, title, description, date,image, category,location, host ) {
        this.id = id;
        this.title = title,
        this.description = description,
        this.date = date, 
        this.image = image, 
        this.category = category,
        this.location = location,
        this.host = host
    }
};

export default Event;