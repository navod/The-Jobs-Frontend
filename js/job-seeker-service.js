const showErrorMsg = (errorMsg) => {
  $("#loadSpiner").hide();
  $("#btnSubmit").show();
  $("#alertBox").text(errorMsg);
  $("#alertBox").css("background-color", "red");
  $("#alertBox").show().delay(2000).fadeOut();
};

$("#btnSubmit").click(function () {
  $("#loadSpiner").show();
  $("#btnSubmit").hide();
  if ($("#firstName").val() == "") {
    showErrorMsg("First Name Cannot be empty");
    return;
  }
  if ($("#email").val() == "") {
    showErrorMsg("Email Cannot be empty");
    return;
  }

  if ($("#mobile").val() == "") {
    showErrorMsg("Mobile Cannot be empty");
    return;
  }

  if ($("#nic").val() == "") {
    showErrorMsg("NIC Cannot be empty");
    return;
  }

  if (
    $("#jobSelector option:selected").text() == "" ||
    $("#jobSelector option:selected").text() == "Select job"
  ) {
    showErrorMsg("Job Cannot be empty");
    return;
  }

  if (
    $("#countrySelector option:selected").text() == "" ||
    $("#countrySelector option:selected").text() == "Select Country"
  ) {
    showErrorMsg("Country Cannot be empty");
    return;
  }

  if ($("#age").val() == "") {
    showErrorMsg("Age Cannot be empty");
    return;
  }

  $.ajax({
    method: "post",
    url: "http://localhost:8080/api/v1/booking/register",
    contentType: "application/json",
    data: JSON.stringify({
      preferDestination: $("#countrySelector option:selected").text(),
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      email: $("#email").val(),
      mobile: $("#mobile").val(),
      nic: $("#nic").val(),
      preferJobType: $("#jobSelector option:selected").text(),
      age: $("#age").val(),
      description: $("#description").val(),
      cv: "",
    }),
    success: function (resp) {
      clearAll();
      $("#alertBox").text("Your booking successfully added");
      $("#alertBox").css("background-color", "#26BC89");
      $("#alertBox").show().delay(2000).fadeOut();
      $("#btnSubmit").show();
      $("#loadSpiner").hide();
    },
    error: function (resp) {
      $("#loadSpiner").hide();
      $("#btnSubmit").show();

      $("#alertBox").text("Cannot submit your request");
      $("#alertBox").css("background-color", "red");
      $("#alertBox").show().delay(2000).fadeOut();
    },
  });
});

const clearAll = () => {
  $("#firstName").val("");
  $("#lastName").val("");
  $("#email").val("");
  $("#mobile").val("");
  $("#nic").val("");
  $("#description").val("");
};
