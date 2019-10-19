/**
 * Mainly responsible for building the form dynamically.
 */
const FormBuilder = {
  /**
   * This is a constructor function for input elements.
   * @param {Object} options : options that are mostly attributes for the Input element
   */
  createTextInput: function(options = {}) {
    const div = document.createElement("div");
    div.setAttribute("class", "form-group");
    const input = document.createElement("input");
    if (options.id) input.setAttribute("id", options.id);
    if (options.type) input.setAttribute("type", options.type);
    if (options.class) input.setAttribute("class", options.class);
    if (options.value) input.setAttribute("value", options.value);
    if (options.name) input.setAttribute("name", options.name);
    if (options.oninput) input.setAttribute("oninput", options.oninput);
    if (options.maxlength) input.setAttribute("maxlength", options.maxlength);
    if (options.placeholder)
      input.setAttribute("placeholder", options.placeholder);
    const labelEle = document.createElement("label");
    if (options.id) labelEle.setAttribute("for", options.id);
    const label = document.createTextNode(options.label);

    labelEle.appendChild(label);
    div.appendChild(labelEle);
    div.appendChild(input);
    return div;
  },

  /**
   * Constructor function for radio buttons.
   * @param {Object} options : attributes for radio input
   */
  createRadioInput: function(options = {}) {
    const div = document.createElement("fieldset");
    const labelEle = document.createElement("legend");
    const label = document.createTextNode(options.label);

    labelEle.appendChild(label);
    div.appendChild(labelEle);
    for (val1 of options.values) {
      const radio = this.createTextInput({
        id: val1,
        label: val1,
        type: "radio",
        name: options.label,
        value: val1
      });
      div.appendChild(radio);
    }
    return div;
  },

  /**
   * Constructor function for select element
   * @param {Object} options : Attributes for select element
   */
  createSelectInput: function(options = {}) {
    const div = document.createElement("div");
    const sel = document.createElement("select");
    const dummy = document.createElement("option");
    dummy.setAttribute("value", 0);
    dummy.textContent = options.defaultValue;
    sel.appendChild(dummy);
    if (options.id) sel.setAttribute("id", options.id);
    if (options.class) sel.setAttribute("class", options.class);
    if (options.values) {
      const vals = options.values;
      for (val1 of vals) {
        const opt = document.createElement("option");
        opt.setAttribute("value", val1);
        opt.textContent = val1;
        sel.appendChild(opt);
      }
    }
    const labelEle = document.createElement("label");
    if (options.id) labelEle.setAttribute("for", options.id);
    const label = document.createTextNode(options.label);
    labelEle.appendChild(label);
    // div.appendChild(labelEle);
    div.appendChild(sel);
    return div;
  },

  /**
   * Gets the selected val of radio group
   * @param {String} name : name of the radio group
   */
  getRadioVal: function(name) {
    const radios = document.getElementsByName(name);
    for (radio of radios) {
      if (radio.checked) return radio.value;
    }
  },

  /**
   * Removes all children nodes of passed in element.
   * @param {Element} element : element whose children need to be removed
   */
  removeChildren: function(element) {
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
    }
  },

  /**
   * Generates a sign in page asking user name.
   */
  signIn: function() {
    const mainTitle = document.createElement("p");
    const mainTitleText = document.createTextNode("Love With Location");
    mainTitle.classList.add("main-title");
    mainTitle.appendChild(mainTitleText);
    const mainTitleIcon = document.createElement("i");
    mainTitleIcon.classList.add("fas", "fa-heart");
    mainTitle.appendChild(mainTitleIcon);

    const name = this.createTextInput({
      id: "name",
      label: "",
      placeholder: "Please enter your full name",
      class: "text-input"
    });

    const nextButton = document.createElement("button");
    nextButton.classList.add("btn", "btn-dark");
    const nextButtonTxt = document.createTextNode("Next ");
    nextButton.appendChild(nextButtonTxt);
    const nextButtonIcon = document.createElement("i");
    nextButtonIcon.classList.add("fas", "fa-arrow-circle-right");
    nextButton.appendChild(nextButtonIcon);

    nextButton.addEventListener("click", () => {
      this.checkExisting();
    });
    const form = document.getElementById("form");
    form.classList.add("input-form");
    form.appendChild(mainTitle);
    form.appendChild(name);
    form.appendChild(nextButton);
  },

  /**
   * Checks if the user signing in exists in the local storage or not.
   */
  checkExisting: function() {
    const name = document.getElementById("name").value;
    this.name = name;
    this.removeChildren(document.getElementById("form"));
    const names = localStorage.getItem("names");
    // Checking if user exists in local storage (signed in before).
    if (names != null && names.indexOf("~" + name + "~") > -1) {
      this.welcome(name);
      const userName = cookies.getCookie(name);
      // Checking if user exists in cookies (Selected the location).
      console.log("username in cookie", userName);
      const dataset = localStorage.getItem(name + "~dataset");
      const url = this.getURLFromDataset(dataset);
      if (userName) app.fetchData(url, name, true);
      else app.fetchData(url, name, false);
    } else {
      this.buildForm();
      document.getElementById("name").value = name;
    }
  },

  /**
   * Prints welcome message for old users.
   * @param {String} name : name of the user.
   */
  welcome: function(name) {
    const form = document.getElementById("form");
    const h5ele = document.createElement("h5");
    const msg = document.createTextNode(`Welcome again ${name}!`);
    h5ele.style.marginTop = "30px";
    h5ele.classList.add("side-title");
    h5ele.appendChild(msg);
    form.appendChild(h5ele);
  },

  /**
   * Gets the data from the form and stores it in
   * local storage.
   */
  getData: function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phn = document.getElementById("phone").value;
    const gender = document.getElementById("gender").value;
    const degree = document.getElementById("degree").value;
    const dataset = document.getElementById("dataset").value;
    if (!localStorage.getItem("names")) localStorage.setItem("names", "");
    const names = localStorage.getItem("names");
    localStorage.setItem("names", names + "~" + name + "~");
    localStorage.setItem(name + "~email", email);
    localStorage.setItem(name + "~phn", phn);
    localStorage.setItem(name + "~gender", gender);
    localStorage.setItem(name + "~degree", degree);
    localStorage.setItem(name + "~dataset", dataset);
    console.log("Data set in local storage");
  },

  /**
   * Fetches data from local storage and stores it into the form.
   * @param {String} name : name of the user
   */
  setData: function(name) {
    const email = localStorage.getItem(name + "~email");
    const phn = localStorage.getItem(name + "~phn");
    const gender = localStorage.getItem(name + "~gender");
    const degree = localStorage.getItem(name + "~degree");
    const dataset = localStorage.getItem(name + "~dataset");
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = phn;
    document.getElementById("gender").value = gender;
    document.getElementById("degree").value = degree;
    document.getElementById("dataset").value = dataset;
  },

  onlyNumber: function(id) {
    var DataVal = document.getElementById(id).value;
    document.getElementById(id).value = DataVal.replace(/[^0-9]/g, "");
  },

  // /**
  //  * Returns the url on the basis of dataset chosen.
  //  * @param {String} dataset : Dataset name
  //  */
  // getURLFromDataset: function getURLFromDataset(dataset) {
  //   if (dataset == "Dataset1")
  //     return "http://serenity.ist.rit.edu/~aj1243/project1/data1.json";
  //   return "http://serenity.ist.rit.edu/~aj1243/project1//data2.json";
  // },
  /**
   * Returns the url on the basis of dataset chosen.
   * @param {String} dataset : Dataset name
   */

  getURLFromDataset: function getURLFromDataset(dataset) {
    if (dataset == "Dataset1")
      return "https://raw.githubusercontent.com/aamirjamal/study-abroad/master/data1.json";
    return "https://raw.githubusercontent.com/aamirjamal/study-abroad/master/data2.json";
  },

  /**
   * Builds the form and puts it on the DOM
   */
  buildForm: function() {
    const sideTitle = document.createElement("p");
    const sideTitleText = document.createTextNode(
      "Valentine's Destination Finder"
    );
    sideTitle.classList.add("side-title");
    sideTitle.appendChild(sideTitleText);
    const sideTitleIcon = document.createElement("i");
    sideTitleIcon.classList.add("fas", "fa-heart");
    sideTitle.appendChild(sideTitleIcon);

    const form = document.getElementById("form");
    const clearBtn = document.createElement("button");
    const clearBtnTxt = document.createTextNode(" Clear");
    const clearBtnIcon = document.createElement("i");
    clearBtnIcon.classList.add("fas", "fa-broom");
    clearBtn.appendChild(clearBtnIcon);
    clearBtn.classList.add("btn", "btn-dark");
    clearBtn.appendChild(clearBtnTxt);

    const name = this.createTextInput({
      id: "name",
      label: "",
      placeholder: "Full Name",
      class: "side-text-input"
    });
    const email = this.createTextInput({
      id: "email",
      label: "",
      placeholder: "Email",
      class: "side-text-input"
    });
    const phn = this.createTextInput({
      id: "phone",
      label: "",
      oninput:
        "this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');",
      placeholder: "Phone Number",
      maxlength: "10",
      class: "side-text-input"
    });
    const degree = this.createSelectInput({
      id: "degree",
      label: "Degree:",
      values: ["Undergrad", "Grad", "PhD"],
      class: "side-text-input",
      defaultValue: "Select Degree:"
    });
    const gender = this.createSelectInput({
      id: "gender",
      label: "Gender:",
      values: ["Male", "Female", "Non Binary"],
      class: "side-text-input",
      defaultValue: "Select Gender:"
    });
    const dataset = this.createSelectInput({
      id: "dataset",
      label: "Dataset:",
      values: ["Dataset1", "Dataset2"],
      class: "side-text-input",
      defaultValue: "Select Dataset:"
    });

    const btn = document.createElement("button");
    const btnTxt = document.createTextNode("Find ");
    btn.setAttribute("id", "btn");
    btn.appendChild(btnTxt);
    const btnIcon = document.createElement("i");
    btnIcon.classList.add("fas", "fa-plane-departure");
    btn.appendChild(btnIcon);
    btn.classList.add("btn", "btn-dark");

    const errDiv = document.createElement("div");
    errDiv.setAttribute("id", "error");

    btn.addEventListener("click", () => {
      if (Validator.validate()) {
        this.getData();
        const dataset = document.getElementById("dataset").value;
        let url = this.getURLFromDataset(dataset);
        this.removeChildren(form);
        app.fetchData(url, this.name);
      }
    });

    clearBtn.addEventListener("click", () => {
      this.removeChildren(form);
      this.buildForm();
    });

    form.appendChild(sideTitle);
    form.appendChild(name);
    form.appendChild(email);
    form.appendChild(phn);
    form.appendChild(gender);
    form.appendChild(degree);
    form.appendChild(dataset);
    form.appendChild(clearBtn);
    form.appendChild(btn);
    form.appendChild(errDiv);
  }
};
