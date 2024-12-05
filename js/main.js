var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var bookmarkerList = [];
var regex = {
  siteName: { value: /[a-zA-Z ]{3,10}$/, isValid: false },
  siteUrl: {
    value:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/,
    isValid: false,
  },
};

if (localStorage.getItem("bookmark")) {
  bookmarkerList = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmark(bookmarkerList);
}
function isUrlUnique(url) {
  return !bookmarkerList.some((bookmark) => bookmark.site === url);
}

function addBookmark() {
  if (!isUrlUnique(siteUrl.value)) {
    alert("This URL already exists in your bookmarks!");
    updateInput()
    submitBtn.disabled = true;
    return;
  }

  console.log("hello");
  bookmark = {
    name: siteName.value,
    site: siteUrl.value,
    index: bookmarkerList.length + 1,
    id: bookmarkerList.length,
  };
  bookmarkerList.push(bookmark);
  displayBookmark(bookmarkerList);
  updateInput();
  setLocalStorage();
  console.log(bookmark);
  console.log(bookmarkerList);
  submitBtn.disabled = true;
}

function displayBookmark(list) {
  var cartona = "";
  for (i = 0; i < list.length; i++) {
    cartona += ` 
          <tr>
            <th scope="row">${list[i].index}</th>
            <td>${list[i].name}</td>
            <td><button onclick="visitUrl(${i})"  type="button" class="btn btn-visit ps-3 pe-3 pt-1 pb-1"><span><i class="fa fa-eye me-1 "></i></span> Visit</button></td>
            <td><button onclick="deleteBookmark(${i})" type="button" class="btn btn-danger ps-2 pt-1 pb-1"><span><i class="fa fa-trash-can "></i></span> Delete</button></td>
          </tr>
       `;
  }
  document.getElementById("data").innerHTML = cartona;
}

function deleteBookmark(index) {
  console.log(index);
  bookmarkerList.splice(index, 1);
  setLocalStorage();
  displayBookmark(bookmarkerList);
}

function updateInput(obj) {
  siteName.value = obj ? obj.name : "";
  siteUrl.value = obj ? obj.site : "";
}

function visitUrl(index) {
  var url = bookmarkerList[index].site;
  console.log(url);
  window.open(url, "_blank");
}

function setLocalStorage() {
  localStorage.setItem("bookmark", JSON.stringify(bookmarkerList));
}

function validationInput(element) {
  console.log(element);

  if (regex[element.id].value.test(element.value) == true) {
    console.log("valid");
    element.nextElementSibling.classList.add("d-none");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    regex[element.id].isValid = true;
  } else {
    console.log("invalid");
    element.nextElementSibling.classList.remove("d-none");
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    regex[element.id].isValid = false;
  }
  toggleAddBtn();
}

function toggleAddBtn() {
  if (regex.siteName.isValid && regex.siteUrl.isValid) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}
