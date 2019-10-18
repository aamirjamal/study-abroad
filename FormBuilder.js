const FormBuilder = {
  createTextInput: function(options = {}) {
    const div = document.createElement("div");
    div.setAttribute("class", "form-group");
    const input = document.createElement("input");
    if (options.id) input.setAttribute("id", options.id);
    if (options.type) input.setAttribute("type", options.type);
    if (options.class) input.setAttribute("class", options.class);
    if (options.value) input.setAttribute("value", options.value);
    if (options.name) input.setAttribute("name", options.name);
    if (options.maxlength) input.setAttribute("max", options.maxlength);
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

  createRadioInput: function(options = {}) {
    const div = document.createElement("fieldset");
    const labelEle = document.createElement("legend");
    const label = document.createTextNode(options.label);
    labelEle.appendChild(label);
    div.appendChild(labelEle);
    for (val of options.values) {
      const radio = this.createTextInput({
        id: val,
        label: val,
        type: "radio",
        name: options.label,
        value: val
      });
      div.appendChild(radio);
    }
    return div;
  },

  createSelectInput: function(options = {}) {
    const div = document.createElement("div");
    const sel = document.createElement("select");
    const dummy = document.createElement("option");
    dummy.setAttribute("value", 0);
    dummy.textContent = "Select";
    sel.appendChild(dummy);
    if (options.id) sel.setAttribute("id", options.id);
    if (options.class) sel.setAttribute("class", options.class);
    if (options.values) {
      const vals = options.values;
      for (val of vals) {
        const opt = document.createElement("option");
        opt.setAttribute("value", val);
        opt.textContent = val;
        sel.appendChild(opt);
      }
    }
    const labelEle = document.createElement("label");
    if (options.id) labelEle.setAttribute("for", options.id);
    const label = document.createTextNode(options.label);
    labelEle.appendChild(label);
    div.appendChild(labelEle);
    div.appendChild(sel);
    return div;
  },

  getRadioVal: function(name) {
    const radios = document.getElementsByName(name);
    for (radio of radios) {
      if (radio.checked) return radio.value;
    }
  },

  removeChildren: function(element) {
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
    }
  },

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

  checkExisting: function() {
    const name = document.getElementById("name").value;
    this.name = name;
    this.removeChildren(document.getElementById("form"));
    const names = localStorage.getItem("names");
    if (names != null && names.indexOf("~" + name + "~") > -1) {
      console.log("User Exists");
      this.welcome(name);
      const userName = cookies.getCookie(name);
      if (userName) {
        console.log("cookie userName", userName);
        app.init(name, true);
      } else {
        console.log("username not found in cookie");
        app.init(name, false);
        // this.buildForm();
        // document.getElementById("name").value = name;
      }
    } else {
      this.buildForm();
      document.getElementById("name").value = name;
    }
  },

  welcome: function(name) {
    const form = document.getElementById("form");
    const h5ele = document.createElement("h5");
    const msg = document.createTextNode(`Welcome again ${name}!`);
    h5ele.appendChild(msg);
    form.appendChild(h5ele);
  },

  getData: function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phn = document.getElementById("phone").value;
    const gender = this.getRadioVal("Gender");
    const degree = this.getRadioVal("Degree");
    if (!localStorage.getItem("names")) localStorage.setItem("names", "");
    const names = localStorage.getItem("names");
    localStorage.setItem("names", names + "~" + name + "~");
    localStorage.setItem(name + "~email", email);
    localStorage.setItem(name + "~phn", phn);
    localStorage.setItem(name + "~gender", gender);
    localStorage.setItem(name + "~degree", degree);
    console.log("Data set in local storage");
  },

  setData: function(name) {
    const email = localStorage.getItem(name + "~email");
    const phn = localStorage.getItem(name + "~phone");
    const gender = localStorage.getItem(name + "~gender");
    const degree = localStorage.getItem(name + "~degree");
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = phn;
    if (gender == "Male") document.getElementById("Male").checked = true;
    if (gender == "Female") document.getElementById("Female").checked = true;
    if (degree == "Bachelors")
      document.getElementById("Bachelors").checked = true;
    if (degree == "Masters") document.getElementById("Masters").checked = true;
    if (degree == "PhD") document.getElementById("PhD").checked = true;
    console.log("Data fetch from local storage", gender, degree);
  },

  buildForm: function() {
    const sideTitle = document.createElement("p");
    const sideTitleText = document.createTextNode("Love Finder");
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
      placeholder: "Phone Number",
      maxlength: "10",
      class: "side-text-input"
    });
    const gender = this.createRadioInput({
      label: "Gender",
      values: ["Male", "Female"]
    });
    const degree = this.createRadioInput({
      label: "Degree",
      values: ["Bachelors", "Masters", "PhD"]
    });
    const dataset = this.createRadioInput({
      label: "Dataset",
      values: ["Dataset1", "Dataset2"]
    });
    // const degree = this.createSelectInput({
    //   id: "degree",
    //   label: "Degree:",
    //   values: ["Undergrad", "Grad", "PhD"],
    //   class: "side-text-input"
    // });

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

    phn.addEventListener("input", function(e) {
      var x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    });

    btn.addEventListener("click", () => {
      if (Validator.validate()) {
        this.getData();
        this.removeChildren(form);
        // app.fetchData(
        //   `https://raw.githubusercontent.com/ashwani20/Interactive-Form-Elements/6c90df5c3eafd4c6e173ef796f4d0de85ed96524/data1.json`
        // );
        app.init(this.name);
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
