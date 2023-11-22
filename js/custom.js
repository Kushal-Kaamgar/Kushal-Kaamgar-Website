// to get current year
// function getYear() {
//     var currentDate = new Date();
//     var currentYear = currentDate.getFullYear();
//     document.querySelector("#displayYear").innerHTML = currentYear;
// }

// getYear();

// /** google_map js **/

// function myMap() {
//     var mapProp = {
//         center: new google.maps.LatLng(40.712775, -74.005973),
//         zoom: 18,
//     };
//     var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
// }


var geoinfo = null;
$(document).ready(function () {
    $.getJSON('https://ipapi.co/json/', function (data) {
        geoinfo = data;
    });
});

function ClearForm() {
    document.getElementById("txtFullName").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtCellphoneNumber").value = "";
    document.getElementById("txtMessage").value = "";
}

function SendMessage() {   
    var fullName = document.getElementById("txtFullName").value;
    var email = document.getElementById("txtEmail").value;
    var cellphoneNumber = document.getElementById("txtCellphoneNumber").value;
    var message = document.getElementById("txtMessage").value;
    
    document.getElementById("lblSendMessage").style.display = "none";

    if(fullName.replace(" ", "") == ""){
        displayErrorMsg("Please enter your full name !");
        return false;
    }

    if(email.replace(" ", "") == "" || validateEmail(email) == false){
        displayErrorMsg("Please enter a valid email address!");
        return false;
    }
    
    if (cellphoneNumber.replace(" ", "") == "" || validateCellphone(cellphoneNumber) == false) {
        displayErrorMsg("Please enter a valid cellphone number !");
        return false;
    }

    if(message.replace(" ", "") == ""){
        displayErrorMsg("Please enter your message !");
        return false;
    }

    var data = {
        'FullName': fullName,
        'Email': email,
        'Cellphone': cellphoneNumber,
        'Message': message,
        'ip_address_retrieved': geoinfo.ip,
        'city_retrieved': geoinfo.city,
        'region_retrieved': geoinfo.region,
        'country_name_retrieved': geoinfo.country_name,
        'postal_code_retrieved': geoinfo.postal,
        'internet_provider_retrieved': geoinfo.org,
    }

    $.ajax({        
        url: 'http://www.kushalkaamgar.com/kk.api/workforce/ContKK',
        headers: {    
            'Content-Type': 'application/json'
        },
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(data, null, 2),
        success: function (data) {
            if (data == false) {
                displayErrorMsg("Oops ! Something went wrong. Please try after sometime...");
            }
            else {
                document.getElementById("lblSendMessage").style.display = "block";
                document.getElementById("lblSendMessage").innerHTML = "Thanks for contacting us. We will get back soon...";
                document.getElementById("lblSendMessage").style.color = "#00EFD6";
                ClearForm();
            }

        },
        error: function (data) {
            displayErrorMsg("Oops ! Something went wrong. Please try after sometime.");
        }
    });
    return false;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateCellphone(cellphone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(String(cellphone).toLowerCase());
}
function displayErrorMsg(msg){
    document.getElementById("lblSendMessage").innerHTML = msg;
    document.getElementById("lblSendMessage").style.display = "block";
    document.getElementById("lblSendMessage").style.color = "#ff5d5a";
}