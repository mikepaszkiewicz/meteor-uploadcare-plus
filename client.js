loadUploadcare = function(key, callback){
  //todo - shift arguements to support just callback
  if(typeof uploadcare === "undefined"){
    if(!key && Meteor.settings && Meteor.settings.public && Meteor.settings.public.uploadcare && Meteor.settings.public.uploadcare.publickey)
        key = Meteor.settings.public.uploadcare.publickey;

    if(key){
        // Functions to run after the script tag has loaded
        var loadCallback = function() {
          window.UPLOADCARE_PUBLIC_KEY = key;

          if (Object.prototype.toString.call(callback) === "[object Function]")
            callback();
        };

        // If the script doesn't load
        var  = function(error) {
          if(typeof console !== "undefined") {
            console.log(error);
          }
        };

        // Generate a script tag
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://ucarecdn.com/widget/2.0.2/uploadcare/uploadcare.min.js";
        script.onload = loadCallback;
        script.onerror = errorCallback;

        // Load the script tag
        document.getElementsByTagName('head')[0].appendChild(script);
      
    }else{
      if(typeof console !== "undefined") {
        console.log("uploadcare-plus - tried to load but key not supplied");
      }
    }
  }
};

UI.registerHelper("uploadcareUUIDToImageUrl", function(uuid, operations) {
  var url = "";
  if(uuid){
    var cdn = "http://www.ucarecdn.com/"
    if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.uploadcare && Meteor.settings.public.uploadcare.cdn)
      cdn = Meteor.settings.public.uploadcare.cdn;


    url = cdn + uuid + "/";
    if(operations)
      url += operations;
  }
  return url;
});
