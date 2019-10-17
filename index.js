// let wholedata = {
//   cities: {
//     Arabic: {
//       "Ancient cities": "Middle East Studies",
//       "New cities": "Rit Dubai- Direct enroll"
//     },
//     Spanish: {
//       Humanites: "Advanced liberal Arts - Barcelona",
//       Sciences: "Santiago - Health Studies"
//     }
//   },

//   nature: {
//     Mountains: {
//       "South America": "Semester in Cusco",
//       Asia: "Big cats of the Himalayas"
//     },
//     Islands: {
//       Caribbean: "Marine Resource Studies",
//       "South Pacific": "Protecting the Phoenix Islands"
//     }
//   }
// };

let wholedata2 = {
  question: "what do you prefer cities or nature?",
  cities: {
    question: "what type of city?",
    Arabic: {
      "Ancient cities": "Middle East Studies",
      "New cities": "Rit Dubai- Direct enroll"
    },
    Spanish: {
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
};

const app = {
  data: undefined,

  // init: function
  fetchData: function(url) {
    const div = document.getElementById("main");
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        this.data = JSON.parse(http.responseText);
        const sel = this.buildSelectElement(this.data);
        div.appendChild(sel);
        this.unfade(sel);
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
    for (let option of options) {
      const opt = document.createElement("option");
      opt.setAttribute("value", option);
      opt.textContent = option;
      sel.appendChild(opt);
    }
    let me = this;
    sel.addEventListener("change", function(e) {
      me.optionSelected(e, this);
    });
    sel.style.opacity = 0.1;
    return sel;
  },

  optionSelected: function(e, ele) {
    const div = document.getElementById("main");
    const data = e.target.data;
    this.removeNextSiblings(ele);
    if (typeof data[ele.value] === "object") {
      const sel = this.buildSelectElement(data[ele.value]);
      div.appendChild(sel);
      this.unfade(sel);
    } else {
      document.getElementById("ans").innerHTML = data[ele.value];
    }
  },

  unfade: function(element) {
    var op = 0.1; // initial opacity
    // element.style.display = "block";
    var timer = setInterval(function() {
      if (op >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      op += op * 0.1;
    }, 50);
  },

  removeNextSiblings: function(sel) {
    while (sel.nextSibling != null) {
      sel.nextSibling.remove();
    }
  }
};

// function fetchData(url) {
//   const http = new XMLHttpRequest();
//   http.open("GET", url);
//   http.onreadystatechange = () => {
//     if (http.readyState == 4 && http.status == 200) {
//       const sel = buildSelectElement(JSON.parse(http.responseText));
//       div.appendChild(sel);
//       unfade(sel);
//     }
//   };
//   http.send(null);
// }

// const div = document.getElementById("main");

// function buildSelectElement(data) {
//   const sel = document.createElement("select");
//   sel.data = data;
//   const dummy = document.createElement("option");
//   dummy.setAttribute("value", 0);
//   dummy.textContent = "Select";
//   sel.appendChild(dummy);
//   const options = Object.keys(data);
//   for (let option of options) {
//     const opt = document.createElement("option");
//     opt.setAttribute("value", option);
//     opt.textContent = option;
//     sel.appendChild(opt);
//   }
//   sel.addEventListener("change", optionSelected);
//   sel.style.opacity = 0.1;
//   return sel;
// }

// function optionSelected(e) {
//   removeNextSiblings(this);
//   const data = e.target.data;
//   if (typeof data[this.value] === "object") {
//     const sel = buildSelectElement(data[this.value]);
//     div.appendChild(sel);
//     unfade(sel);
//   } else {
//     document.getElementById("ans").innerHTML = data[this.value];
//   }
// }

// /**
//  * Refered from stackoverflow
//  * @param {Node} element
//  */
// function unfade(element) {
//   var op = 0.1; // initial opacity
//   // element.style.display = "block";
//   var timer = setInterval(function() {
//     if (op >= 1) {
//       clearInterval(timer);
//     }
//     element.style.opacity = op;
//     element.style.filter = "alpha(opacity=" + op * 100 + ")";
//     op += op * 0.1;
//   }, 50);
// }

// function removeNextSiblings(sel) {
//   while (sel.nextSibling != null) {
//     sel.nextSibling.remove();
//   }
// }

// FormBuilder.buildForm();

// fetchData(
//   `https://raw.githubusercontent.com/ashwani20/Interactive-Form-Elements/6c90df5c3eafd4c6e173ef796f4d0de85ed96524/data1.json`
// );

// const sel = buildSelectElement(wholedata);
// div.appendChild(sel);
// unfade(sel);
