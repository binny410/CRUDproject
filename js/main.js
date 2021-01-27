$(document).ready(function () {
    //Getting data from local storage on every page load.
    getData();
});

//Fetching data from the local storage(if not then null).
fetchData = localStorage.getItem('userData');
retrieveData = JSON.parse(fetchData);

//Function to upload data after clicking submit button.
function submitData() {
    //Edit function will work
    if ($("#submitEdit").hasClass('editing')) {
        //getting the index of editing line.
        var z = $("#submitEdit").attr('indexVal');
        console.log(z);
        //getting values from local storage.
        retrieveData[z].Name = $("#Mname").val();
        retrieveData[z].Email = $("#Memail").val();
        retrieveData[z].Address = $("#Maddress").val();
        retrieveData[z].Copy = $("input:radio[name=Mctype]:checked").val();
        retrieveData[z].Message = $("#Mmessage").val();
        localStorage.setItem('userData', JSON.stringify(retrieveData))
        location.reload();
    }
    //Regular submit function will run.
    else {

        var inputName = $("#name").val();
        var inputEmail = $("#email").val();
        var inputAddress = $("#address").val();
        var inputCopy = $("input:radio[name=ctype]:checked").val()
        var inputMessage = $("#message").val();

        //Creating object with user data.
        var userData = {
            "Name": inputName,
            "Email": inputEmail,
            "Address": inputAddress,
            "Copy": inputCopy,
            "Message": inputMessage
        }

        //If there is no data stored in local storage  then retrieveData is empty array.
        if (retrieveData == null) retrieveData = []

        //Adding fresh data to the retrieved data from local storage.
        retrieveData.push(userData);

        //Stringifying all data to JSON format.
        var jsonData = JSON.stringify(retrieveData);

        //Adding the data to local storage.
        localStorage.setItem("userData", jsonData);

        //Displaying the entered data to the table.
        $("tbody").append("<tr> <td> " + inputName + " </td> <td> " + inputEmail + " </td> <td> " + inputAddress + " </td><td> " + inputCopy + " </td> <td> " + inputMessage + "</td><td> <button class='delete btn btn-secondary'  onclick='deleteData(this);'>DELETE</button> <button class='edit btn btn-light' data-toggle='modal' data-target='#myModal' onclick='editData(this);'>EDIT</button></td></tr>")

        //Setting input fields to empty again.
        $("#name").val("");
        $("#email").val("");
        $("#address").val("");
        $("#message").val("");

    }
}
//Function to retrieve data.
function getData() {
    //if there is nothing to retrieve.
    if (retrieveData == null) {
        //nothing happens
    } else {
        n = retrieveData.length;
        for (var i = 0; i < n; i++) {
            console.log(retrieveData[i]);
            $("tbody").append("<tr> <td > " + retrieveData[i].Name + " </td> <td > " + retrieveData[i].Email + " </td><td > " + retrieveData[i].Address + " </td> <td > " + retrieveData[i].Copy + " </td> <td> " + retrieveData[i].Message + "</td> <td> <button class = 'delete btn btn-secondary' onclick='deleteData(this);' >DELETE</button> <button data-toggle='modal' data-target='#myModal' class='edit btn btn-light' onclick='editData(this);'> EDIT</button> </td> </tr > ");
        }
    }

}

//Delete function
function deleteData(e) {
    //index of the clicked delete button.
    var x = ($(e).parents('tr').index())
    console.log("this index val: " + x)
    // Deleting entire row when clicked delete.
    $(e).parents("tr").remove();
    //deleteing from the stored data in local storage.
    retrieveData.splice(x, 1);
    //storing data
    localStorage.setItem('userData', JSON.stringify(retrieveData));
}

//Edit function
function editData(e) {

    //add a class to the submit button in the form when clicked on the edit button.
    $("#submitEdit").addClass('editing');
    //getting index of the row for editing.
    var y = ($(e).parents('tr').index())
    console.log("index of clicked button: " + y);
    console.log(retrieveData[y])
    //getting the edited row's value in the placeholder.
    $("#Mname").val(retrieveData[y].Name);
    $("#Memail").val(retrieveData[y].Email);
    $("#Maddress").val(retrieveData[y].Address);
    $("#Mcopy").val(retrieveData[y].Copy);
    $("#Mmessage").val(retrieveData[y].Message);

    //adding a attribute in the submit value with ythe index of the clicked row.
    $("#submit").attr('indexVal', y);
    $("#submitEdit").attr('indexVal', y);

}
