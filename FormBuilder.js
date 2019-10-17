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
    const userName = cookies.getCookie("userName");
    if (!userName) {
      this.removeChildren(document.getElementById("form"));
      this.buildForm();
      document.getElementById("name").value = name;
    }
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
        this.removeChildren(form);
        // app.fetchData(
        //   `https://raw.githubusercontent.com/ashwani20/Interactive-Form-Elements/6c90df5c3eafd4c6e173ef796f4d0de85ed96524/data1.json`
        // );
        app.init();
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
