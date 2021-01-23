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
    if ($("#submit").hasClass('editing')) {
        //getting the index of editing line.
        var z = $("#submit").attr('indexVal');
        console.log(z)
        //getting values from local storage.
        retrieveData[z].Name = $("#name").val();
        retrieveData[z].City = $("#city").val();
        retrieveData[z].Country = $("#country").val();
        localStorage.setItem('userData', JSON.stringify(retrieveData))
        location.reload();
    }
    //Regular submit function will run.
    else {

        var inputName = $("#name").val();
        var inputCity = $("#city").val();
        var inputCountry = $("#country").val();

        //Creating object with user data.
        var userData = {
            "Name": inputName,
            "City": inputCity,
            "Country": inputCountry
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
        $("tbody").append("<tr> <td> " + inputName + " </td> <td> " + inputCity + " </td> <td> " + inputCountry + "</td><td> <button class='delete'  onclick='deleteData(this);'>DELETE</button> <button class='edit' onclick='editData(this);'>EDIT</button></td></tr>")

        //Setting input fields to empty again.
        $("#name").val("");
        $("#city").val("");
        $("#country").val("");

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
            $("tbody").append("<tr> <td > " + retrieveData[i].Name + " </td><td > " + retrieveData[i].City + " </td> <td> " + retrieveData[i].Country + "</td> <td> <button class = 'delete' onclick='deleteData(this);' >DELETE</button> <button class='edit' onclick='editData(this);'> EDIT</button> </td> </tr > ");
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
    $("#submit").addClass('editing');
    //getting index of the row for editing.
    var y = ($(e).parents('tr').index())
    console.log("index of clicked button: " + y);
    console.log(retrieveData[y])
    //getting the edited row's value in the placeholder.
    $("#name").val(retrieveData[y].Name);
    $("#city").val(retrieveData[y].City);
    $("#country").val(retrieveData[y].Country);

    //adding a attribute in the submit value with ythe index of the clicked row.
    $("#submit").attr('indexVal', y);

}
