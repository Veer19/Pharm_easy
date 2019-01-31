import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
// Imports the Google Cloud client library

import * as vision from '@google-cloud/vision';
// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file

var config = {
    apiKey: "AIzaSyDOp6gO9z7fEIVCD8N6D7A-Gn18JSpOpGk",
    authDomain: "justhack-2019.firebaseapp.com",
    databaseURL: "https://justhack-2019.firebaseio.com",
    projectId: "justhack-2019",
    storageBucket: "justhack-2019.appspot.com",
    messagingSenderId: "993079514906"
  };
admin.initializeApp(config);

export const labelDetection = functions.storage.object().onFinalize(object=>{
    
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
        return client.labelDetection(tempFilePath)
    })
    .then((results)=>{
        
        const labels = results[0].labelAnnotations;

        console.log('Labels:');
        labels.forEach(label => console.log(label.description));
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
})
