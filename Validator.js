/**
 * This Object is mainly responsible for validating the form.
 */
const Validator = {
  /**
   * Validates the name field.
   */
  validateName: function() {
    const nameNode = document.getElementById("name");
    if (nameNode.value == "") {
      nameNode.classList.add("error-text");
      nameNode.classList.remove("side-text-input");
      this.addError("Name is required!", nameNode);
      return false;
    }
    return true;
  },

  /**
   * Validates the email field.
   */
  validateEmail: function() {
    const emailNode = document.getElementById("email");
    if (emailNode.value === "") {
      emailNode.classList.add("error-text");
      emailNode.classList.remove("side-text-input");
      this.addError("Email is required!", emailNode);
      return false;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailNode.value))
      return true;

    emailNode.classList.add("error-text");
    emailNode.classList.remove("side-text-input");
    this.addError("You have entered an invalid email address!", emailNode);
    return false;
  },

  /**
   * Validates the phone field.
   */
  validatePhone: function() {
    const numberNode = document.getElementById("phone");
    if (numberNode.value.length == 14) return true;
    this.addError("Please enter a valid Phone number!", numberNode);
    numberNode.classList.add("error-text");
    numberNode.classList.remove("side-text-input");
    return false;
  },

  /**
   * Validates the select element
   * @param {String} id : id of the select element to validate
   */
  validateSelect: function(id) {
    const selectNode = document.getElementById(id);
    if (selectNode.value != 0) return true;
    this.addError(`Please select a ${id}!`, selectNode);
    selectNode.classList.add("error-text");
    selectNode.classList.remove("side-text-input");
    return false;
  },

  /**
   * Validates radio buttons
   * @param {String} name : name of the radio group
   */
  validateRadio: function(name) {
    const radios = document.getElementsByName(name);
    for (radio of radios) {
      if (radio.checked) return true;
    }
    this.addError(`Please select a ${name}!`);
    return false;
  },

  /**
   * Adds validation error message to the form.
   * @param {String} errorMessage : message to be displayed
   */
  addError: function(errorMessage, node) {
    // const errDiv = document.getElementById("error");
    // const err = document.createElement("p");
    // const msg = document.createTextNode(errMsg);
    // err.appendChild(msg);
    // errDiv.appendChild(err);

    this.removeError(node);
    const parentNode = node.parentElement;
    const errorNode = document.createElement("p");
    errorNode.classList.add("left-col");
    const messageNode = document.createTextNode(errorMessage);
    errorNode.appendChild(messageNode);
    parentNode.appendChild(errorNode);
  },

  removeError: function(node) {
    node.parentNode.childNodes.forEach(function(item) {
        console.log(item.nodeName);
      if (item.nodeName === "P") node.parentNode.removeChild(item);
      console.log(item);
    });
  },

  /**
   * Validates the form and returns true if valid else returns false.
   */
  validate: function() {
    const errDiv = document.getElementById("error");
    while (errDiv.hasChildNodes()) {
      errDiv.removeChild(errDiv.lastChild);
    }
    isNameValid = this.validateName();
    isEmailValid = this.validateEmail();
    isNumberValid = this.validatePhone();
    isGenderValid = this.validateSelect("gender");
    isDegreeValid = this.validateSelect("degree");
    isDatasetValid = this.validateSelect("dataset");
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
