import Event from "../../models/event";
import host from "../../models/host";
import location from "../../models/location";

export const constructEvents = (data) => {
    console.log("constructing events");
    var hosted = data.map((item) => {
        return new Event(
            item.event,
            item.title,
            item.description,
            item.date,
            item.image,
            item.category,
            new location(
                item.location.latitude,
                item.location.longitude,
                item.location.address
            ),
            new host(item.host.profile, item.host.name, item.host.email)
        );
    });
    console.log(hosted);
    return hosted;
};
