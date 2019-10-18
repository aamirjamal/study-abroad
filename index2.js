/**
 * This app object is responsible for fetching data and generating select boxes
 * and setting the cookie values for selected location.
 */
const app = {
  data: {
    question: "What do you prefer?",
    cities: {
      question: "What do you prefer?",
      Arabic: {
        question: "What do you prefer?",
        "Ancient cities": {
          text: "Middle East Studies",
          link:
            "https://rit-horizons.symplicity.com/index.php?s=programs&mode=form&id=0f30e6c7e993fafeda90e8dde9b83467"
        },
        "New cities": {
          text: "Rit Dubai- Direct enroll",
          link:
            "https://rit-horizons.symplicity.com/index.php?s=programs&mode=form&id=0e062b2cfb65db2f6778cd26aad9311d"
        }
      },
      Spanish: {
        question: "What do you prefer?",
        Humanites: {
          text: "Advanced liberal Arts - Barcelona",
          link:
            "https://rit-horizons.symplicity.com/index.php?s=programs&mode=form&id=473cb41401b20b3d91b31432e80e8e4f"
        },
        Sciences: {
          text: "Santiago - Health Studies",
          link:
            "https://rit-horizons.symplicity.com/index.php?s=programs&mode=form&id=89894ba735af3935a4611a2205fff648"
        }
      }
    },
    nature: {
      question: "What do you prefer?",
      Mountains: {
        question: "What do you prefer?",
        "South America": {
          text: "Semester in Cusco",
          link:
            "https://rit-horizons.symplicity.com/index.php?s=programs&mode=form&id=ae8939c42459a2b58f247a8e2cff284b"
        },
        Asia: {
          text: "Big cats of the Himalayas",
          link:
            "https://rit-horizons.symplicity.com/index.php?s=programs&mode=form&id=ddbf516c2873f7087f3d631ca7f239a2"
        }
      },
      Islands: {
        question: "What do you prefer?",
        Caribbean: {
          text: "Marine Resource Studies",
          link:
            "https://rit-horizons.symplicity.com/index.php?s=programs&mode=form&id=e66910d6fcad2576bea3f4a4dcef3897"
        },
        "South Pacific": {
          text: "Protecting the Phoenix Islands",
          link:
            "https://rit-horizons.symplicity.com/index.php?s=programs&mode=form&id=1008cf2cf5051059f9138d0787a23388"
        }
      }
    }
  },

  name: undefined,

  /**
   * This initialises the selection options for the user.
   * @param {String} name : name of the user
   * @param {Bool} savedIncookie : whether the user exists in cookie
   */
  init: function(name, savedIncookie) {
    this.name = name;
    const div = document.getElementById("main");
    const clearBtn = document.createElement("button");
    const clrDiv = document.createElement("div");
    const clearTxt = document.createTextNode("Start over");
    clearBtn.appendChild(clearTxt);
    clearBtn.addEventListener("click", () => {
      this.removeParentSiblings(clearBtn);
      this.addEditButton();
      this.addSelectionToDOM(this.data);
    });
    clrDiv.appendChild(clearBtn);

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
      (BrowserDetect.browser == "Netscape" && BrowserDetect.version == "5") // IE 11
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
    const editDiv = document.createElement("div");
    const editTxt = document.createTextNode("Edit User");
    editBtn.appendChild(editTxt);
    editBtn.addEventListener("click", () => {
      FormBuilder.removeChildren(div);
      FormBuilder.buildForm();
      console.log(name, this.name);
      FormBuilder.setData(this.name);
    });
    editDiv.appendChild(editBtn);
    div.appendChild(editDiv);
  },

  /**
   * Fetches the data from the url and creates selection
   * elements dynamically on its basis.
   * @param {String} url
   */
  fetchData: function(url) {
    const div = document.getElementById("main");
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        this.data = JSON.parse(http.responseText);
        this.addSelectionToDOM(this.data);
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
    sel.data = data;
    const dummy = document.createElement("option");
    dummy.setAttribute("value", 0);
    dummy.textContent = "Select";
    sel.appendChild(dummy);
    const options = Object.keys(data);
    const label = document.createElement("label");
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
      me.optionSelected(e, this);
    });
    selDiv.appendChild(label);
    selDiv.appendChild(sel);
    selDiv.style.opacity = 0.1;
    return selDiv;
  },

  optionSelected: function(e, ele) {
    const div = document.getElementById("main");
    const data = e.target.data;
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
      const ans = document.createTextNode(data[ele.value].text);
      a.appendChild(ans);
      a.setAttribute("href", data[ele.value].link);
      div.appendChild(a);
    }
  },

  addSelectionToDOM: function(data) {
    const sel = this.buildSelectElement(this.data);
    document.getElementById("main").appendChild(sel);
    this.unfade(sel);
  },

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

  removeParentSiblings: function(sel) {
    while (sel.parentNode.nextSibling != null) {
      sel.parentNode.nextSibling.remove();
    }
  }
};
