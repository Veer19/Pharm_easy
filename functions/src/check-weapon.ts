import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
// Imports the Google Cloud client library

import * as vision from '@google-cloud/vision';
// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file

var config = {
    apiKey: "AIzaSyDf7pIvqRGhPwEdEMa2gEaHvB5YwnuGMXc",
    authDomain: "captit-3c24c.firebaseapp.com",
    databaseURL: "https://captit-3c24c.firebaseio.com",
    projectId: "captit-3c24c",
    storageBucket: "captit-3c24c.appspot.com",
    messagingSenderId: "387939430325"
};
admin.initializeApp(config);

export const checkIfWeapon = functions.storage.object().onFinalize(object=>{
    
    const filePath = object.name;

    const fileName = filePath.split("/").pop();
    const bucket = admin.storage().bucket();
    const tempFilePath = '/tmp/'+ fileName;

    if(!object.contentType.startsWith("image/")){
        console.log("Not an image");
        return null;
    } 
    return bucket.file(filePath).download({
        destination: tempFilePath
    })
    .then(()=>{
        console.log(object.selfLink);
        return client.labelDetection(object.selfLink)
        
    })
    .then((results)=>{
        
        const labels = results[0].labelAnnotations;

        labels.forEach(label => {
            console.log("Labels "+label.description);
            if(label.description=="weapon"){
                console.log("pushing weaponID")
                admin.database().ref("weapons/").push(filePath).then(()=>console.log("pushed"))
            }
        });
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
})
