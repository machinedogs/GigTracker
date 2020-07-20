import * as firebase from 'firebase';
import { firebaseConfig } from '../../firebase/index';
import * as ImagePicker from "expo-image-picker";
//Function that lets you pick the image from your library, and uploads it to firebase and returns the name of the file
// If null returned then picking image was unsuccessful and do nothing
export const openImagePickerAsync = async (ratio) => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        // this creates a sqaure. if we change this we must change the aspect ratio
        // for images that are picked with this component.
        aspect: ratio ? ratio : [4, 4],
        quality: 1,
        });
    if (!pickerResult.cancelled) {
        //generate random file name
        var fileName = Math.random().toString(36).substring(7);
        console.log(`Random File Name ${fileName}`);
        var response = await uploadImage(pickerResult.uri, fileName);
        return fileName
        //Returns null if the user did not choose an image
    }else{
        return null
    }
};

//Uploads image, pass in uri and give it a image name
export const uploadImage = async (uri, imageName) => {
    console.log("In upload");
    const response = await fetch(uri);
    const blob = await response.blob();
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    var ref = firebase.storage().ref().child(`images/${imageName}`);
    //Stores image to firebase
    return ref.put(blob);
};

//get image from firebase, returns the url from firebase to access the image
export const getImage = async (fileName) => {
    console.log(`Getting Image with name ${fileName}`);
    var url = await firebase
        .storage()
        .ref()
        .child(`images/${fileName}`)
        .getDownloadURL();
    console.log(`Got image from firebase. here it is.... ${url}`);
    return url;
};
