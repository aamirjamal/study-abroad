/**
 * This app object is responsible for fetching data and generating select boxes
 * and setting the cookie values for selected location.
 */
const app = {
  data: {},

  name: undefined,

  /**
   * This initialises the selection options for the user.
   * @param {String} name : name of the user
   * @param {Bool} savedIncookie : whether the user exists in cookie
   */
  init: function(name, savedIncookie) {
    this.name = name;
    const div = document.getElementById("main");
    div.classList.add("center");
    const clearBtn = document.createElement("button");
    const clrDiv = document.createElement("div");
    const clearTxt = document.createTextNode("Start over");
    clearBtn.classList.add("btn", "btn-dark");
    clrDiv.classList.add("col");
    clearBtn.appendChild(clearTxt);

    clearBtn.addEventListener("click", () => {
      this.removeParentSiblings(clearBtn);
      this.addEditButton();
      this.addSelectionToDOM(this.data);
    });
    clrDiv.appendChild(clearBtn);
    clrDiv.style.textAlign = "right";
    div.appendChild(clrDiv);
    this.addEditButton();

    // If user was found in cookie show chosen value,
    // else show choices for selection.
    if (!savedIncookie) this.addSelectionToDOM(this.data);
    else this.addSavedSelection();
  },

  /**
   * Checks browser compatibility. If not compatible,
   * shows download link for latest version of chrome.
   */
  detectBrowser: function() {
    if (
      (BrowserDetect.browser == "Chrome" &&
        parseInt(BrowserDetect.version) > 75) ||
      (BrowserDetect.browser == "Firefox" &&
        parseInt(BrowserDetect.version) > 65) ||
      (BrowserDetect.browser == "Safari" &&
        parseInt(BrowserDetect.version) > 11) ||
      (BrowserDetect.browser == "Netscape" && BrowserDetect.version == "5") ||
      (BrowserDetect.browser == "Mozilla" && BrowserDetect.version == "11") // IE 11
    ) {
      console.log("Your Browser is compatible");
      FormBuilder.signIn();
    } else {
      const div = document.getElementById("main");
      const err = document.createElement("h2");
      const msg = document.createTextNode(
        "Sorry, your browser is not compatible! :("
      );
      err.appendChild(msg);
      const errMsg = document.createElement("p");
      const txt = document.createTextNode(
        "Please download the recommended browser :"
      );
      errMsg.appendChild(txt);
      err.style.marginTop = "100px";
      const a = document.createElement("a");
      a.setAttribute("href", "https://www.google.com/intl/en/chrome/");
      const linktext = document.createTextNode("Chrome");
      a.appendChild(linktext);
      div.appendChild(err);
      div.appendChild(errMsg);
      div.appendChild(a);
    }
  },

  /**
   * Fetches the selection saved in the cookie for an old user
   * and displays it.
   */
  addSavedSelection: function() {
    const div = document.getElementById("main");
    const header = document.createElement("h5");
    const msg = document.createTextNode("The destination by your choice is:");
    header.appendChild(msg);
    div.appendChild(header);
    const a = document.createElement("a");
    const linkTxt = cookies.getCookie(this.name);
    const linkTxtNode = document.createTextNode(linkTxt);
    a.setAttribute("href", cookies.getCookie(linkTxt));
    a.appendChild(linkTxtNode);
    div.appendChild(a);
  },

  /**
   * Constructs and add the button which leads to
   * user form editing and sets the data onto the
   * form from local storage.
   */
  addEditButton: function() {
    const div = document.getElementById("main");
    const editBtn = document.createElement("button");
    const br = document.createElement("br");
    const editDiv = document.createElement("div");
    const editTxt = document.createTextNode("Edit User");
    editBtn.appendChild(editTxt);
    editBtn.classList.add("btn", "btn-dark");
    editDiv.classList.add("col");
    editBtn.addEventListener("click", () => {
      FormBuilder.removeChildren(div);
      FormBuilder.buildForm();
      console.log(name, this.name);
      FormBuilder.setData(this.name);
    });
    editDiv.appendChild(editBtn);
    editDiv.style.textAlign = "left";
    div.appendChild(editDiv);
  },

  /**
   * Fetches the data from the url and creates selection
   * elements dynamically on its basis.
   * @param {String} url  : url of the dataset
   * @param {String} name : Name of the user
   */
  fetchData: function(url, name) {
    const div = document.getElementById("main");
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        this.data = JSON.parse(http.responseText);
        this.init(name); ////pass name todo
      }
    };
    http.send(null);
  },

  /**
   * Dynamically builds Select element on the basis of data
   * @param {Object} data : contains sub data options for the select input
   */
  buildSelectElement: function(data) {
    const sel = document.createElement("select");
    const br = document.createElement("br");
    sel.data = data;
    const dummy = document.createElement("option");
    dummy.setAttribute("value", 0);
    dummy.textContent = "Select";
    sel.appendChild(dummy);
    const options = Object.keys(data);
    const label = document.createElement("label");
    console.log(options);
    for (let option of options) {
      if (option == "question") {
        const ques = document.createTextNode(sel.data[option]);
        label.appendChild(ques);
      } else {
        const opt = document.createElement("option");
        opt.setAttribute("value", option);
        opt.textContent = option;
        sel.appendChild(opt);
      }
    }
    const selDiv = document.createElement("div");

    let me = this;
    sel.addEventListener("change", function(e) {
      me.optionSelected(e);
    });
    sel.classList.add("text-input");

    selDiv.appendChild(label);
    selDiv.appendChild(br);
    selDiv.appendChild(sel);

    selDiv.style.opacity = 0.1;
    selDiv.style.margin = "auto";
    selDiv.style.width = "100%";
    // selDiv.style.clear = "both";
    // selDiv.style.textAlign = "center";

    return selDiv;
  },

  /**
   * Event handler for change on selection.
   * Creates a new Select element on the basis of selection.
   * @param {Event} e : change event
   */
  optionSelected: function(e) {
    const div = document.getElementById("main");
    const ele = e.target;
    const data = ele.data;
    this.removeParentSiblings(ele);
    if ("question" in data[ele.value]) {
      const sel = this.buildSelectElement(data[ele.value]);

      div.appendChild(sel);
      this.unfade(sel);
    } else {
      console.log("Setting cookie 1", this.name, data[ele.value].text);
      console.log(
        "Setting cookie 2",
        data[ele.value].text,
        data[ele.value].link
      );
      cookies.setCookie(this.name, data[ele.value].text);
      cookies.setCookie(data[ele.value].text, data[ele.value].link);
      const a = document.createElement("a");
      const ansDiv = document.createElement("div");

      // a.style.display = "inline-block";
      ansDiv.style.margin = "auto";
      ansDiv.style.width = "100%";

      const ans = document.createTextNode(data[ele.value].text);
      a.appendChild(ans);
      a.setAttribute("href", data[ele.value].link);
      ansDiv.appendChild(a);
      div.appendChild(ansDiv);
    }
  },

  /**
   * Adds the select element on to DOM and gives a fade
   * in animation.
   * @param {Object} data : data for the select options
   */
  addSelectionToDOM: function(data) {
    const sel = this.buildSelectElement(this.data);
    document.getElementById("main").appendChild(sel);
    this.unfade(sel);
  },

  /**
   * Fades in an element by using setTimeout animation.
   * @param {DOM Element} element
   */
  unfade: function(element) {
    element.style.opacity = parseFloat(element.style.opacity) + 0.1;
    if (element.style.opacity > 1.0) {
      element.style.opacity = 1.0;
    } else {
      setTimeout(() => {
        this.unfade(element);
      }, 200);
    }
  },

  /**
   * Removes all the siblings of the parent element.
   * @param {Element} sel
   */
  removeParentSiblings: function(sel) {
    while (sel.parentNode.nextSibling != null) {
      sel.parentNode.nextSibling.remove();
    }
  }
};
