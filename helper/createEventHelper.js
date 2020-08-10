import {
	openImagePickerAsync,
	getImage,
} from "./ImageHelpers";


export const getCurrentLocation = function (options) {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
};

export const combineDateAndTime = (date, time) => {
	let d = date.toISOString();
	let t = time.toISOString();
	d = d.substr(0, 10);
	t = t.substr(10);
	const dateTime = d.concat(t);
	console.log(dateTime);
	return dateTime;
};

export const stringifyDate = (date) => {
	var dd = date.getDate();
	var mm = date.getMonth() + 1;
	var yyyy = date.getFullYear();
	if (dd < 10) {
		dd = "0" + dd;
	}
	if (mm < 10) {
		mm = "0" + mm;
	}
	var weekDay = date.getDay();

	switch (weekDay) {
		case 0: weekDay = "Sunday"; break;
		case 1: weekDay = "Monday"; break;
		case 2: weekDay = "Tuesday"; break;
		case 3: weekDay = "Wednesday"; break;
		case 4: weekDay = "Thursday"; break;
		case 5: weekDay = "Friday"; break;
		case 6: weekDay = "Saturday"; break;
		default: weekDay = ""; break;
	}
	return weekDay + ", " + mm + "/" + dd + "/" + yyyy;
};

export const stringifyDateShort = (date) => {
	var dd = date.getDate();
	var mm = date.getMonth() + 1;
	var yyyy = date.getFullYear();
	if (dd < 10) {
		dd = "0" + dd;
	}
	if (mm < 10) {
		mm = "0" + mm;
	}
	var weekDay = date.getDay();

	switch (weekDay) {
		case 0: weekDay = "Sun"; break;
		case 1: weekDay = "Mon"; break;
		case 2: weekDay = "Tues"; break;
		case 3: weekDay = "Wed"; break;
		case 4: weekDay = "Thurs"; break;
		case 5: weekDay = "Fri"; break;
		case 6: weekDay = "Sat"; break;
		default: weekDay = ""; break;
	}
	return weekDay + ", " + mm + "/" + dd + "/" + yyyy;
};

export const stringifyTime = (time) => {
	const str = time.toLocaleTimeString();
	let s1 = "";
	if (str[1] === ":") {
		s1 = str.substr(0, 4);
	} else {
		s1 = str.substr(0, 5);
	}
	const s2 = str.substr(8).trim();
	const res = s1.concat(" ", s2);
	return res;
};

export const uploadEventPhoto = async () => {
	console.log("Inside update event photo ");
	//Get image from camera library
	var file = await openImagePickerAsync();
	//Only do if  file was chosen
	if (file) {
		var imageUrl = await getImage(file);
		return imageUrl;
	} else {
		return null;
	}
};

export const createEventFormIsValid = (
	title, description, latitude, longitude, address, date, category, imageLength
) => {
	if (
		title &&
		description &&
		latitude &&
		longitude &&
		address &&
		date &&
		category &&
		imageLength > 3 // The length of the image object type lets us know if a picture was selected
	) {
		return (true)
	} else {
		return (false)
	}
}
