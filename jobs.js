let ul = document.getElementById("jobs");
const list = document.createDocumentFragment();

fetch("https://boards-api.greenhouse.io/v1/boards/convoy/jobs")
  .then((response) => response.json())
  .then((data) => {
    // log data to console
    console.log(data.jobs);

    // data is job listings
    let jobs = data.jobs;

    jobs.map((job) => {
      let li = document.createElement("li");
      let title = document.createElement("h2");

      title.innerHTML = `${job.title}`;

      li.appendChild(title);
      list.appendChild(li);
      console.log(list);
    });
    ul.appendChild(list);
  }) // output will be the required data
  .catch((error) => console.log(error));
