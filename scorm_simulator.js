// SCORM Engine Replicator

var scormData = {
    // Pre-populate with default values for specific SCORM elements as needed
};

var errorCodes = {
    "0": "No error",
    "101": "General exception",
    "201": "Invalid argument error",
    "301": "Not initialized",
    "401": "Not implemented error",
    "403": "Data model element value not initialized",
};

// Tracks if the SCORM API has been initialized
var isInitialized = false;

window.API_1484_11 = {
    Initialize: function() {
        if (isInitialized) {
            this.lastErrorCode = "101"; // Already initialized
            return "false";
        }
        console.log("SCORM API has been initialized");
        isInitialized = true;
        this.lastErrorCode = "0";
        return "true";
    },
    GetValue: function(element) {
        if (!isInitialized) {
            this.lastErrorCode = "301";
            return "";
        }
        if (element in scormData) {
            this.lastErrorCode = "0"; // Success
            return scormData[element];
        } else {
            this.lastErrorCode = "401"; // Not implemented error
            return "";
        }
    },
    SetValue: function(element, value) {
        if (!isInitialized) {
            this.lastErrorCode = "301";
            return "false";
        }
        scormData[element] = value;
        this.lastErrorCode = "0"; // Success
        return "true";
    },
    Commit: function() {
        if (!isInitialized) {
            this.lastErrorCode = "301";
            return "false";
        }
        localStorage.setItem('scormData', JSON.stringify(scormData));
        console.log("Data committed: ", scormData);
        this.lastErrorCode = "0"; // Success
        return "true";
    },
    Terminate: function() {
        if (!isInitialized) {
            this.lastErrorCode = "301";
            return "false";
        }
        console.log("SCORM API has been terminated");
        isInitialized = false;
        this.lastErrorCode = "0"; // Success
        return "true";
    },
    GetLastError: function() {
        return this.lastErrorCode || "0";
    },
    GetErrorString: function(errorCode) {
        return errorCodes[errorCode] || "";
    },
    GetDiagnostic: function(errorCode) {
        // This could be expanded to provide more diagnostic information
        return "Diagnostic information for error code: " + errorCode;
    },
    lastErrorCode: "0"
};

// Load previously saved data if any
document.addEventListener("DOMContentLoaded", function() {
    var savedData = localStorage.getItem('scormData');
    if (savedData) {
        scormData = JSON.parse(savedData);
    }
});

