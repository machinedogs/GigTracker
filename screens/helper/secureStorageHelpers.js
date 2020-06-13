import * as SecureStore from "expo-secure-store";

//Saves profile uri to local machine storage, takes in url(firebaseurl) and saves it storage
export const saveDataToStorage = async (profileImage) => {
    console.log(
        `Save to storage got the uri....${profileImage}...securely storing it`
    );
    SecureStore.setItemAsync(
        "images",
        JSON.stringify({
            profileImage: profileImage,
        })
    );
};