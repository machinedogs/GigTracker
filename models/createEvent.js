class eventBuilder {
    constructor(title, description, date, image, category, latitude, longitude, address) {
        this.title = title,
            this.description = description,
            this.date = date,
            this.image = image,
            this.category = category,
            this.latitude = latitude,
            this.longitude = longitude
            this.address = address
    }
};

export default eventBuilder;