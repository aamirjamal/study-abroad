const FormBuilder = {
  createTextInput: function(options = {}) {
    const div = document.createElement("div");
    div.setAttribute("class","form-group");
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
    // Making Title for main page
    const mainTitle = document.createElement("p");
    const mainTitleText = document.createTextNode("Love Finder");
    mainTitle.classList.add("main-title");
    mainTitle.appendChild(mainTitleText);
    const mainTitleIcon = document.createElement("i");
    mainTitleIcon.classList.add("fas","fa-heart");
    mainTitle.appendChild(mainTitleIcon);


    const name = this.createTextInput({
      id: "name",
      label: "",
      placeholder: "Please enter your full name",
      class: "text-input"
    });


    const nextButton = document.createElement("button");
    nextButton.classList.add("btn","btn-dark");
    const nextButtonTxt = document.createTextNode("Next ");
    nextButton.appendChild(nextButtonTxt);
    const nextButtonIcon = document.createElement("i");
    nextButtonIcon.classList.add("fas","fa-arrow-circle-right");
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
    const userName = cookies.getCookie("userName");
    if (!userName) {
      this.removeChildren(document.getElementById("form"));
      this.buildForm();
      document.getElementById("name").value = name;
    }
  },

  buildForm: function() {

    // Side Title for next page
    const sideTitle = document.createElement("p");
    const sideTitleText = document.createTextNode("Love Finder");
    sideTitle.classList.add("side-title");
    sideTitle.appendChild(sideTitleText);
    const sideTitleIcon = document.createElement("i");
    sideTitleIcon.classList.add("fas","fa-heart");
    sideTitle.appendChild(sideTitleIcon);

    const form = document.getElementById("form");
    const clearBtn = document.createElement("button");
    const clearBtnTxt = document.createTextNode("Clear");
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
    const gender = this.createSelectInput({
      id: "gender",
      label: "Gender:",
      values: ["Male", "Female"],
      class: "side-text-input"
    });
    const degree = this.createSelectInput({
      id: "degree",
      label: "Degree:",
      values: ["Undergrad", "Grad", "PhD"],
      class: "side-text-input"
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
    btn.classList.add("btn","btn-dark");

    clearBtn.addEventListener("click", () => {
      this.removeChildren(form);
      this.buildForm();
    });
    clearBtn.classList.add("btn","btn-dark");

    form.appendChild(sideTitle);
    form.appendChild(name);
    form.appendChild(email);
    form.appendChild(phn);
    form.appendChild(gender);
    form.appendChild(degree);
    form.appendChild(clearBtn);
    form.appendChild(btn);
    form.appendChild(errDiv);
  }
};



