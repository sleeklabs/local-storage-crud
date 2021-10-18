// the default students data array stored locally
if (localStorage.getItem("studentsInfo")) {
    studentsInfo = JSON.parse(localStorage.getItem("studentsInfo")); // students array from local storage
} else {
    studentsInfo = []; // empty array if nothing is set
}

/** Set online/offline listeners */
window.addEventListener('online', updateStatus); 
window.addEventListener('offline', updateStatus);

// Update Connection status
function updateStatus(event) {
    if(navigator.onLine) {
        isUserOnline = true;
        console.log("Your Connection is back!");
    } else {
        isUserOnline = false;
        console.log("You have lost your internet connection");
    }
}


$(document).ready(function(){

  updateStatus(); // listen for changes in the intenet status

  // Save the Student Offline
  $("#studentForm").submit(function(e){
        e.preventDefault(); // prevent the form from submitting data

        // get student info from form
        studentInfo = {
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            school: $("#school").val(),
            country: $("#country").val()
        }

        /** Save Data Online or Offline depending on connectivity */
        if (isUserOnline) {
            // Use API to store Student Information Online
            console.log("Data Saved Via API - Online!")

        } else {
            // save student data offline
            studentsInfo.push(studentInfo); // add student to the array
            localStorage.setItem("studentsInfo", JSON.stringify(studentsInfo));

            $("#firstname").val();  // clears input field
            $("#lastname").val(); // clears input field
            $("#school").val(); // clears input field
            $("#country").val(); // clears input field

            console.log(studentsInfo);
        }
    });


});


/* Synchronize One offline item */
function synchronizeOne(index) {
    if (isUserOnline) {
        console.log('User is online! Syncing...' + index)
        console.log(studentsInfo[index]);
        // if sync is successful, wipe this data from offline storage
    } else {
        console.log("Wait! You seem to be offline! - Connect your device and try again")
    }
    
}

/* Synchronize All Offline Data at once */
function synchronizeAll() {
    // synchronize only when user is online
    if (isUserOnline) {
         // call the api to synchronize data online
        console.log("Synchronizing offline data....")
        console.log(studentsInfo)
        // if sync is successful, empty the offline storage
    } else {
        console.log("You seem to be offline! - Connect your device and try again")
    }

}

/* Delete data item from offline storage */
function deleteStudentInfo(index) {
    // delete the info from local storage
    console.log("Deleting: Index-" + index);
    console.log(studentsInfo.splice(index,1)); // delete element at {index} position
    console.log("Element Deleted Successfully...");

    // update local storage object
    studentsInfo = (localStorage.setItem("studentsInfo", JSON.stringify(studentsInfo))); // students array from local storage
    console.log("Local Data Updated Successfully...");
    window.location.reload(); // reload the page

}

/* Edit Student Info offline */
function editStudentInfo(index){
    console.log("Editing Offline Data: Index-" + index)
    console.log(studentsInfo[index]);
}

/* A getter for local data by key */
function getLocalData(key){
    item = key;
    if (localStorage.getItem(item)) {
        console.log(localStorage.getItem(item));
        return localStorage.getItem(item); // returns the local data
    } else {
        console.log('Nothing Like that!');
        return null; // just nothing 
    }
}

/* Display Offline Data -- For testing purposes only */
function displayOfflineData(){
    // the default students data array
    if (localStorage.getItem("studentsInfo")) {
        console.log(localStorage.getItem("studentsInfo")); // students array from local storage
    }
}


// Alert Me -- Console Testing
function alertMe(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=ree0p8rvq51m5jgsr80eo5uig5");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://dapucharity.com/users/readAllUsers.php", requestOptions)
        .then(response => response.text())
        .then(result => {

            // Store
            localStorage.setItem("allUsers", result);

            //Retrieve 
            localData = localStorage.getItem("allUsers");
            console.log(localData);
        
        })
        .catch(error => console.log('error', error));
    
       // console.log("I am working")
}

