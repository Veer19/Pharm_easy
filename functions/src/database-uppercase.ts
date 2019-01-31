import * as functions from 'firebase-functions';

export const listenForChangeDatabase =  functions.database.ref("name/original").onCreate((snapshot, context) =>{
    const originalName = snapshot.val()
    const upperName = originalName.toUpperCase();
    return snapshot.ref.parent.child('uppercase').set(upperName);
})
