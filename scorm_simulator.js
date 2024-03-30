// JavaScript Document

var scormData = {};

window.API_1484_11 = {
    Initialize: function() {
        console.log("SCORM API has been initialized");
        return "true";
    },
    GetValue: function(element) {
        return scormData[element] || "";
    },
    SetValue: function(element, value) {
        scormData[element] = value;
        return "true";
    },
    Commit: function() {
        localStorage.setItem('scormData', JSON.stringify(scormData));
        console.log("Data committed: ", scormData);
        return "true";
    },
    Terminate: function() {
        console.log("SCORM API has been terminated");
        return "true";
    }
};

// Load previously saved data if any
document.addEventListener("DOMContentLoaded", function() {
    var savedData = localStorage.getItem('scormData');
    if (savedData) {
        scormData = JSON.parse(savedData);
    }
});
