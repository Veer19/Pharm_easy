"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions = require("firebase-functions");
//import { Bucket } from '@google-cloud/storage';
//const bucket: Bucket = {} as any;
//const gcs = require('@google-cloud/storage')();
//const spawn = require('child-process-promise').spawn
var child_process_promise_1 = require("child-process-promise");
var admin = require("firebase-admin");
var config = {
    apiKey: "AIzaSyDf7pIvqRGhPwEdEMa2gEaHvB5YwnuGMXc",
    authDomain: "captit-3c24c.firebaseapp.com",
    databaseURL: "https://captit-3c24c.firebaseio.com",
    projectId: "captit-3c24c",
    storageBucket: "captit-3c24c.appspot.com",
    messagingSenderId: "387939430325"
};
admin.initializeApp(config);
exports.generateThumbnail = functions.storage.object().onFinalize(function (object) {
    var filePath = object.name;
    var fileName = filePath.split("/").pop();
    var bucket = admin.storage().bucket();
    var tempFilePath = '/tmp/' + fileName;
    if (fileName.startsWith('thumb_')) {
        console.log("Already a thumbnail");
        return null;
    }
    if (!object.contentType.startsWith("image/")) {
        console.log("Not an image");
        return null;
    }
    return bucket.file(filePath).download({
        destination: tempFilePath
    })
        .then(function () {
        console.log("Converting....");
        return child_process_promise_1.spawn("convert", [tempFilePath, "-thumbnail", "200x200>", tempFilePath]);
    })
        .then(function () {
        console.log("Thumb created");
        var thumbFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1thumb_$2');
        return bucket.upload(tempFilePath, {
            destination: thumbFilePath
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXRodW1ibmFpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZS10aHVtYm5haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBZ0Q7QUFDaEQsaURBQWlEO0FBQ2pELG1DQUFtQztBQUNuQyxpREFBaUQ7QUFDakQsc0RBQXNEO0FBQ3RELCtEQUE4QztBQUM5QyxzQ0FBdUM7QUFFdkMsSUFBSSxNQUFNLEdBQUc7SUFDVCxNQUFNLEVBQUUseUNBQXlDO0lBQ2pELFVBQVUsRUFBRSw4QkFBOEI7SUFDMUMsV0FBVyxFQUFFLHFDQUFxQztJQUNsRCxTQUFTLEVBQUUsY0FBYztJQUN6QixhQUFhLEVBQUUsMEJBQTBCO0lBQ3pDLGlCQUFpQixFQUFFLGNBQWM7Q0FDbEMsQ0FBQztBQUNKLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFZixRQUFBLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQUEsTUFBTTtJQUV6RSxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQzdCLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0MsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hDLElBQU0sWUFBWSxHQUFHLE9BQU8sR0FBRSxRQUFRLENBQUM7SUFFdkMsSUFBRyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUNsQyxPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsSUFBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFDO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDbEMsV0FBVyxFQUFFLFlBQVk7S0FDNUIsQ0FBQztTQUNELElBQUksQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5QixPQUFPLDZCQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBQyxVQUFVLEVBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtJQUNqRixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUM7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFdkUsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtZQUMvQixXQUFXLEVBQUUsYUFBYTtTQUM3QixDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnVuY3Rpb25zIGZyb20gJ2ZpcmViYXNlLWZ1bmN0aW9ucyc7XHJcbi8vaW1wb3J0IHsgQnVja2V0IH0gZnJvbSAnQGdvb2dsZS1jbG91ZC9zdG9yYWdlJztcclxuLy9jb25zdCBidWNrZXQ6IEJ1Y2tldCA9IHt9IGFzIGFueTtcclxuLy9jb25zdCBnY3MgPSByZXF1aXJlKCdAZ29vZ2xlLWNsb3VkL3N0b3JhZ2UnKSgpO1xyXG4vL2NvbnN0IHNwYXduID0gcmVxdWlyZSgnY2hpbGQtcHJvY2Vzcy1wcm9taXNlJykuc3Bhd25cclxuaW1wb3J0IHsgc3Bhd24gfSBmcm9tICdjaGlsZC1wcm9jZXNzLXByb21pc2UnO1xyXG5pbXBvcnQgKiBhcyBhZG1pbiBmcm9tICdmaXJlYmFzZS1hZG1pbidcclxuXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICBhcGlLZXk6IFwiQUl6YVN5RGY3cEl2cVJHaFB3RWRFTWEyZ0VhSHZCNVl3bnVHTVhjXCIsXHJcbiAgICBhdXRoRG9tYWluOiBcImNhcHRpdC0zYzI0Yy5maXJlYmFzZWFwcC5jb21cIixcclxuICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vY2FwdGl0LTNjMjRjLmZpcmViYXNlaW8uY29tXCIsXHJcbiAgICBwcm9qZWN0SWQ6IFwiY2FwdGl0LTNjMjRjXCIsXHJcbiAgICBzdG9yYWdlQnVja2V0OiBcImNhcHRpdC0zYzI0Yy5hcHBzcG90LmNvbVwiLFxyXG4gICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMzg3OTM5NDMwMzI1XCJcclxuICB9O1xyXG5hZG1pbi5pbml0aWFsaXplQXBwKGNvbmZpZyk7XHJcblxyXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVUaHVtYm5haWwgPSBmdW5jdGlvbnMuc3RvcmFnZS5vYmplY3QoKS5vbkZpbmFsaXplKG9iamVjdD0+e1xyXG5cclxuICAgIGNvbnN0IGZpbGVQYXRoID0gb2JqZWN0Lm5hbWU7XHJcbiAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLnNwbGl0KFwiL1wiKS5wb3AoKTtcclxuICAgIGNvbnN0IGJ1Y2tldCA9IGFkbWluLnN0b3JhZ2UoKS5idWNrZXQoKTtcclxuICAgIGNvbnN0IHRlbXBGaWxlUGF0aCA9ICcvdG1wLycrIGZpbGVOYW1lO1xyXG5cclxuICAgIGlmKGZpbGVOYW1lLnN0YXJ0c1dpdGgoJ3RodW1iXycpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbHJlYWR5IGEgdGh1bWJuYWlsXCIpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIW9iamVjdC5jb250ZW50VHlwZS5zdGFydHNXaXRoKFwiaW1hZ2UvXCIpKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBhbiBpbWFnZVwiKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0gICAgXHJcbiAgICByZXR1cm4gYnVja2V0LmZpbGUoZmlsZVBhdGgpLmRvd25sb2FkKHtcclxuICAgICAgICBkZXN0aW5hdGlvbjogdGVtcEZpbGVQYXRoXHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKCk9PntcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbnZlcnRpbmcuLi4uXCIpO1xyXG4gICAgICAgIHJldHVybiBzcGF3bihcImNvbnZlcnRcIiwgW3RlbXBGaWxlUGF0aCwgXCItdGh1bWJuYWlsXCIsXCIyMDB4MjAwPlwiLHRlbXBGaWxlUGF0aF0pXHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKCk9PntcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRodW1iIGNyZWF0ZWRcIik7XHJcbiAgICAgICAgY29uc3QgdGh1bWJGaWxlUGF0aCA9IGZpbGVQYXRoLnJlcGxhY2UoLyhcXC8pPyhbXlxcL10qKSQvLCAnJDF0aHVtYl8kMicpO1xyXG5cclxuICAgICAgICByZXR1cm4gYnVja2V0LnVwbG9hZCh0ZW1wRmlsZVBhdGgsIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb246IHRodW1iRmlsZVBhdGhcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufSlcclxuIl19