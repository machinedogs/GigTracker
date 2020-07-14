export const getGeoInfo = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            let coordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude };
            console.log(coordinates)
            resolve(coordinates);
        }),
            error => reject(error),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    })
}