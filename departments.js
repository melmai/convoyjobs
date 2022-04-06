const jobList = document.getElementById("jobs");
const categoryFilter = document.getElementById("category");
const list = document.createDocumentFragment();

fetch("https://boards-api.greenhouse.io/v1/boards/convoy/departments")
  .then((response) => response.json())
  .then((data) => {
    // log data to console
    // console.log(data.departments);

    // data is job listings
    const departments = data.departments;

    // create sections for each dept
    departments.map((dept) => {
      // skip dept if no jobs found
      if (!dept.jobs.length) return false;

      // create accordion elements and category filter if jobs available in category
      let toggle = document.createElement("div");
      let panel = document.createElement("div");
      let categoryOption = document.createElement("option");

      // populate category filter
      categoryOption.innerHTML = `${dept.name}`;
      let attrValue = dept.name.replace(/[^A-Z0-9]+/gi, "-").toLowerCase();
      categoryOption.setAttribute("value", attrValue);
      categoryFilter.appendChild(categoryOption);

      // assign classes to accordion and add title to value
      toggle.setAttribute("class", "department");
      toggle.classList.add(attrValue);
      toggle.innerHTML = `${dept.name}`;

      // add event listener
      toggle.addEventListener("click", toggleAccordion);

      // add classes to panel
      panel.setAttribute("class", "panel");
      panel.classList.add("hidden");

      // create job listings for each dept
      dept.jobs.map((job) => {
        let jobTitle = document.createElement("h3");
        let jobLocation = document.createElement("span");

        jobTitle.innerHTML = `<a href="${job.absolute_url}" target="_blank">${job.title}</a>`;
        jobLocation.innerHTML = `${job.location.name}`;
        panel.appendChild(jobTitle);
        panel.appendChild(jobLocation);
      });

      list.appendChild(toggle);
      list.appendChild(panel);
    });
    jobList.appendChild(list);

    // test by category filter
    // filterbyCategory("brokerage-operations");
  }) // output will be the required data
  .catch((error) => console.log(error));

// filter list by category - hide all but current selected category
const filterByCategory = () => {
  const cat = categoryFilter.options[categoryFilter.selectedIndex].value;
  const depts = document.querySelectorAll("div.department");

  if (cat === "all") {
    depts.forEach((dept) => {
      if (dept.classList.contains("hidden")) {
        dept.classList.remove("hidden");
      } else {
        dept.nextElementSibling.classList.add("hidden");
      }
    });
  } else {
    depts.forEach((dept) => {
      if (!dept.classList.contains(cat)) {
        dept.classList.add("hidden");
        dept.nextElementSibling.classList.add("hidden");
      } else {
        dept.classList.remove("hidden");
        dept.nextElementSibling.classList.remove("hidden");
      }
    });
  }
};

// toggle accordion
const toggleAccordion = (e) => {
  e.target.nextElementSibling.classList.toggle("hidden");
};
