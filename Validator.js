const Validator = {
  validateName: function() {
    const name = document.getElementById("name");
    if (name.value == "") {
      this.addError("Name is required!");
      return false;
    }
    return true;
  },

  validateEmail: function() {
    const email = document.getElementById("email").value;
    if (email === "") {
      this.addError("Email is required!");
      return false;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return true;

    this.addError("You have entered an invalid email address!");
    return false;
  },

  validatePhone: function() {
    const num = document.getElementById("phone").value;
    if (num.length == 14) return true;
    this.addError("Please enter a valid Phone number!");
    return false;
  },

  // validateSelect: function(id) {
  //   const val = document.getElementById(id).value;
  //   if (val != 0) return true;
  //   this.addError(`Please select a ${id}!`);
  //   return false;
  // },

  validateRadio: function(name) {
    const radios = document.getElementsByName(name);
    for (radio of radios) {
      if (radio.checked) return true;
    }
    this.addError(`Please select a ${name}!`);
    return false;
  },

  addError: function(errMsg) {
    const errDiv = document.getElementById("error");
    const err = document.createElement("p");
    const msg = document.createTextNode(errMsg);
    err.appendChild(msg);
    errDiv.appendChild(err);
  },

  validate: function() {
    const errDiv = document.getElementById("error");
    while (errDiv.hasChildNodes()) {
      errDiv.removeChild(errDiv.lastChild);
    }
    isNameValid = this.validateName();
    isEmailValid = this.validateEmail();
    isNumberValid = this.validatePhone();
    isGenderValid = this.validateRadio("Gender");
    isDegreeValid = this.validateRadio("Degree");
    isDatasetValid = this.validateRadio("Dataset");
    return (
      isNameValid &&
      isEmailValid &&
      isNumberValid &&
      isGenderValid &&
      isDegreeValid &&
      isDatasetValid
    );
  }
};
