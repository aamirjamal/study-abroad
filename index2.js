const app = {
  data: {
    question: "what do you prefer cities or nature?",
    cities: {
      question: "what language city?",
      Arabic: {
        question: "what type of city?",
        "Ancient cities": {
          text: "Middle East Studies",
          link:
            "https://rikmt-horizons.symplicity.com/index.php?s=programs&mode=form&id=fa80ac657a94e0ef3cdb6815f261a177"
        },
        "New cities": {
          text: "Rit Dubai- Direct enroll",
          link:
            "https://rit-horizons.symplicity.com/index.php?s=programs&mode=form&id=fc0905cd6f7264a9ce00289539c1e22b"
        }
      },
      Spanish: {
        question: "what program?",
        Humanites: "Advanced liberal Arts - Barcelona",
        Sciences: "Santiago - Health Studies"
      }
    },
    nature: {
      question: "what type of nature?",
      Mountains: {
        question: "Where mountains?",
        "South America": "Semester in Cusco",
        Asia: "Big cats of the Himalayas"
      },
      Islands: {
        question: "what islands?",
        Caribbean: "Marine Resource Studies",
        "South Pacific": "Protecting the Phoenix Islands"
      }
    }
  },

  init: function() {
    const div = document.getElementById("main");
    const clearBtn = document.createElement("button");
    const span = document.createElement("div");
    const clearTxt = document.createTextNode("Start over");
    clearBtn.appendChild(clearTxt);
    clearBtn.addEventListener("click", () => {
      this.removeParentSiblings(clearBtn);
      this.addSelectionToDOM(this.data);
    });
    span.appendChild(clearBtn);
    div.appendChild(span);
    this.addSelectionToDOM(this.data);
  },

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
        label.setAttribute("for", "u");
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
