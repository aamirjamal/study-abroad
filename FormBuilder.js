const FormBuilder = {
  createTextInput: function(options = {}) {
    const div = document.createElement("div");
    const input = document.createElement("input");
    if (options.id) input.setAttribute("id", options.id);
    if (options.type) input.setAttribute("type", options.type);
    if (options.class) input.setAttribute("class", options.class);
    if (options.value) input.setAttribute("value", options.value);
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

  removeChildren: function(element) {
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
    }
  },

  signIn: function() {
    const name = this.createTextInput({
      id: "name",
      label: "Please enter your Name: ",
      placeholder: "Full Name"
    });
    const nextButton = document.createElement("button");
    const nextBtnTxt = document.createTextNode("Next");
    nextButton.appendChild(nextBtnTxt);
    nextButton.addEventListener("click", () => {
      this.checkExisting();
    });
    const form = document.getElementById("form");
    form.appendChild(name);
    form.appendChild(nextButton);
  },

  checkExisting: function() {
    const name = document.getElementById("name").value;
    this.name = name;
    this.removeChildren(document.getElementById("form"));
    const names = localStorage.getItem("names");
    if (names != null) {
      if (names.indexOf("~" + name + "~") > -1) {
        this.buildForm();
        document.getElementById("name").value = name;
      } else {
        app.init(name);
      }
    } else this.buildForm();
  },

  getData: function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phn = document.getElementById("phone").value;
    const gender = document.getElementById("gender").value;
    const degree = document.getElementById("degree").value;
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
    document.getElementById("gender").value = gender;
    document.getElementById("degree").value = degree;
    console.log("Data fetch from local storage");
  },

  buildForm: function() {
    const form = document.getElementById("form");
    const clearBtn = document.createElement("button");
    const clearBtnTxt = document.createTextNode("Clear");
    clearBtn.appendChild(clearBtnTxt);
    const name = this.createTextInput({
      id: "name",
      label: "Name:",
      placeholder: "Full Name"
    });
    const email = this.createTextInput({ id: "email", label: "Email" });
    const phn = this.createTextInput({
      id: "phone",
      label: "Phone Number:",
      placeholder: "(123) 456-7890",
      maxlength: "10"
    });
    const gender = this.createSelectInput({
      id: "gender",
      label: "Gender:",
      values: ["Male", "Female"]
    });
    const degree = this.createSelectInput({
      id: "degree",
      label: "Degree:",
      values: ["Undergrad", "Grad", "PhD"]
    });

    const btn = document.createElement("button");
    const btnTxt = document.createTextNode("Find Destination");
    btn.setAttribute("id", "btn");
    btn.appendChild(btnTxt);

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

    form.appendChild(clearBtn);
    form.appendChild(name);
    form.appendChild(email);
    form.appendChild(phn);
    form.appendChild(gender);
    form.appendChild(degree);
    form.appendChild(btn);
    form.appendChild(errDiv);
  }
};
