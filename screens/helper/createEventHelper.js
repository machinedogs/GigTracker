import {
	openImagePickerAsync,
	uploadImage,
	getImage,
  } from "../../screens/helper/ImageHelpers";


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
	var wkday = date.getDay();
	if (wkday === 0) wkday = "Sunday";
	else if (wkday === 1) wkday = "Monday";
	else if (wkday === 2) wkday = "Tuesday";
	else if (wkday === 3) wkday = "Wednesday";
	else if (wkday === 4) wkday = "Thursday";
	else if (wkday === 5) wkday = "Friday";
	else if (wkday === 6) wkday = "Saturday";
	return wkday + ", " + mm + "/" + dd + "/" + yyyy;
};

export const stringifyTime = (time) => {
	const str = time.toLocaleTimeString();
	console.log("local time === " + str);
	let s1 = "";
	if (str[1] === ":") {
		s1 = str.substr(0, 4);
	} else {
		s1 = str.substr(0, 5);
	}
	const s2 = str.substr(8);
	const res = s1.concat(" ", s2);
	return res;
};

export const uploadEventPhoto = async () => {
    console.log("Inside update event photo ");
    //Get image from camera library
	var file = await openImagePickerAsync();
	//Only do if  file was chosen
	if(file){
		var imageUrl =  await getImage(file);
		return imageUrl;
	}
  };
