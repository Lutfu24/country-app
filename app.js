const container = document.getElementById("container");
const list = document.getElementById("list");
const showBtn = document.getElementById("showBtn");

let count = 12;
let html = "";

function scrollCards() {
  showBtn.scrollIntoView({ behavior: "smooth" });
}

function getfilData(region = "") {
  if (!region) {
    return (filData = data.filter((item) => item.name !== "Armenia"));
  } else {
    return (filData = data.filter(
      (item) => item.name !== "Armenia" && item.region === region
    ));
  }
}
function getData(region = "") {
  head.innerHTML = "";
  let randomNum = Math.floor(
    getfilData(region).length - Math.random() * getfilData(region).length
  );
  let findedElement = getfilData(region).find(
    (item, index) => data[index] == data[randomNum]
  );
  head.innerHTML += `<div
                        class="w-md rounded-md col-span-1 shadow-md dark:bg-gray-50 dark:text-gray-800"
                        >
                        <img
                            src=${findedElement.flag}
                            alt=""
                            class="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
                        />
                        <div class="flex flex-col justify-between p-6 space-y-8">
                            <div class="space-y-2">
                            <span class="block text-xs font-medium tracking-widest uppercase dark:text-black">${
                              findedElement.region
                            }</span>
                            <h2 class="text-3xl font-semibold dark:text-green-800 tracking-wide truncate">
                                ${findedElement.name}, ${
    findedElement.capital ? findedElement.capital : findedElement.demonym
  }
                            </h2>
                            </div>
                            <a
                            target="_blank"
                            href="./detail.html?aplhaCode=${
                              findedElement.alpha3Code
                            }"
                            class="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-black text-white dark:bg-red-900 dark:text-gray-50"
                            fdprocessedid="4kvp"
                            >
                            Read more
                            </a>
                        </div>
                        </div>`;

  html = "";
  getfilData(region)
    .slice(0, count)
    .forEach((item) => {
      html += `<div
                        class="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800"
                        >
                        <img
                            src=${item.flag}
                            alt=""
                            class="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
                        />
                        <div class="flex flex-col justify-between p-6 space-y-8">
                            <div class="space-y-2">
                            <span class="block text-xs font-medium tracking-widest uppercase dark:text-black">${item.region}</span>
                            <h2 class="text-3xl font-semibold dark:text-green-800 tracking-wide truncate">
                                ${item.name}, ${item.capital}
                            </h2>
                            </div>
                            <a
                            target="_blank"
                            href="./detail.html?aplhaCode=${item.alpha3Code}"
                            class="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-black text-white dark:bg-red-900 dark:text-gray-50"
                            fdprocessedid="4kvp"
                            >
                            Read more
                            </a>
                        </div>
                        </div>`;
    });
  container.innerHTML = html;
}
getData();

function getRegion() {
  let regions = [...new Set(data.map((item) => item.region))];
  regions.forEach((item) => {
    list.innerHTML += `<li class="flex">
                        <button
                        rel="noopener noreferrer"
                        onclick="getFilteredData('${item}')"
                        class="flex items-center px-4 -mb-1 border-b-2 dark:border-"
                        >${item}</button
                        >
                    </li>`;
  });
}
getRegion();

function getFilteredData(reg) {
  btnshow.style.display = "none";
  count = 50;
  html = "";
  getData(reg);
}

function showMore() {
  count += 30;
  if (count >= data.length) {
    btnshow.style.display = "none";
  }
  getData();
}
const drkDiv = document.getElementById("dark-mode-div");
drkDiv.innerHTML = `<i class="fa-solid fa-sun fa-2xl" style="color: #f5cb32"></i>`;

function changeDarkMode() {
  document.documentElement.classList.toggle("dark");

  if (
    drkDiv.innerHTML ==
    `<i class="fa-solid fa-sun fa-2xl" style="color: #f5cb32"></i>`
  ) {
    drkDiv.innerHTML = `<i class="fa-solid fa-moon fa-2xl" style="color: #000"></i>`;
  } else if (
    drkDiv.innerHTML ==
    `<i class="fa-solid fa-moon fa-2xl" style="color: #000"></i>`
  ) {
    drkDiv.innerHTML = `<i class="fa-solid fa-sun fa-2xl" style="color: #f5cb32"></i>`;
  }
}

drkDiv.addEventListener("click", changeDarkMode);

const input = document.getElementById("inputS");

function searchCountry() {
  html = "";

  getfilData()
    .filter((item) =>
      item.name.toUpperCase().startsWith(input.value.toUpperCase())
    )
    .forEach((item) => {
      html += `<div
                        class="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800"
                        >
                        <img
                            src=${item.flag}
                            alt=""
                            class="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
                        />
                        <div class="flex flex-col justify-between p-6 space-y-8">
                            <div class="space-y-2">
                            <span class="block text-xs font-medium tracking-widest uppercase dark:text-black">${item.region}</span>
                            <h2 class="text-3xl font-semibold dark:text-green-800 tracking-wide truncate">
                                ${item.name}, ${item.capital}
                            </h2>
                            </div>
                            <a
                            target="_blank"
                            href="./detail.html?aplhaCode=${item.alpha3Code}"
                            class="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-black text-white dark:bg-red-900 dark:text-gray-50"
                            fdprocessedid="4kvp"
                            >
                            Read more
                            </a>
                        </div>
                        </div>`;
    });
  container.innerHTML = html;
}

input.addEventListener("input", searchCountry);
