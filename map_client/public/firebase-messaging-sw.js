importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
const firebaseConfig = {
     apiKey: "AIzaSyBEreXeH2yJhBzlkyTa6HJjSiBb_P5HzJ8",
     authDomain: "crimeanalyser.firebaseapp.com",
     projectId: "crimeanalyser",
     storageBucket: "crimeanalyser.appspot.com",
     messagingSenderId: "83931387865",
     appId: "1:83931387865:web:73702aafdcf1e7ff582bc8",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
     const promiseChain = clients
          .matchAll({
               type: "window",
               includeUncontrolled: true,
          })
          .then((windowClients) => {
               for (let i = 0; i < windowClients.length; i++) {
                    const windowClient = windowClients[i];
                    windowClient.postMessage(payload);
               }
          })
          .then(() => {
               return registration.showNotification("my notification title");
          });
     return promiseChain;
});
self.addEventListener("notificationclick", function(event) {
     console.log(event);
});
