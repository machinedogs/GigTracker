import * as SecureStore from "expo-secure-store";
//Saves profile uri to local machine storage, takes in url(firebaseurl) and saves it storage
export const saveProfileDataToStorage = async (profileImage) => {
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

export const getProfileDataStorage = async () =>{
    //Get the stored image
    const images = await SecureStore.getItemAsync('images');
    //Means user has data saved, otherwise don't take into account
    if(images != null){
        console.log('Getting image from storage ');
        const transformedImageData = JSON.parse(images);
        console.log(transformedImageData)
        const { profileImage } = transformedImageData
        return profileImage
    }
}

