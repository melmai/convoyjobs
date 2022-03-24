let jobList = document.getElementById("jobs");
let categoryFilter = document.getElementById("category");
const list = document.createDocumentFragment();
let currList;

fetch("https://boards-api.greenhouse.io/v1/boards/convoy/departments")
  .then((response) => response.json())
  .then((data) => {
    // log data to console
    // console.log(data.departments);

    // data is job listings
    let departments = data.departments;

    // create sections for each dept
    departments.map((dept) => {
      let deptContainer = document.createElement("div");
      let deptTitle = document.createElement("h2");
      let categoryOption = document.createElement("option");

      // populate category filter
      categoryOption.innerHTML = `${dept.name}`;
      let attrValue = dept.name.replace(/[^A-Z0-9]+/gi, "-").toLowerCase();
      categoryOption.setAttribute("value", attrValue);
      categoryFilter.appendChild(categoryOption);

      // assign classes to accordion
      deptContainer.setAttribute("class", "department");
      deptContainer.classList.add(attrValue);

      // populate department titles
      deptTitle.innerHTML = `${dept.name}`;
      deptContainer.appendChild(deptTitle);

      // create job listings for each dept
      dept.jobs.map((job) => {
        let jobTitle = document.createElement("h3");
        let jobLocation = document.createElement("span");

        jobTitle.innerHTML = `<a href="${job.absolute_url}" target="_blank">${job.title}</a>`;
        jobLocation.innerHTML = `${job.location.name}`;
        deptContainer.appendChild(jobTitle);
        deptContainer.appendChild(jobLocation);
      });

      list.appendChild(deptContainer);
      currList = list;
      // console.log(currList);
    });
    jobList.appendChild(list);

    // test by category filter
    // filterbyCategory("brokerage-operations");
  }) // output will be the required data
  .catch((error) => console.log(error));

// filter list by category - hide all but current selected category
const filterbyCategory = (cat) => {
  let depts = document.querySelectorAll("div.department");
  console.log(depts);
  depts.forEach((dept) => {
    if (!dept.classList.contains(cat)) {
      dept.classList.add("hidden");
    }
  });
};

// toggle accordion
const toggleAccordion = this;
