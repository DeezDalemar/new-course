let cardStorage = document.querySelector("#cardContainer");

async function retriveCourse() {
   let responce = await fetch("http://localhost:8081/api/courses");
   let collegeCourses = await responce.json();

   for (const course of collegeCourses) {
      createCard(course.dept, course.courseNum, course.courseName, course.id);
   }
}

retriveCourse();

function createCard(dept, courseNum, courseName, id) {
   let card = document.createElement("div");
   card.className = "card w-25 container p-0 m-0";

   let cardHeader = document.createElement("div");
   cardHeader.className = "d-flex alight-items-center justify-content-between purple p-2";

   let cardTitle = document.createElement("h6");
   cardTitle.innerText = courseName + " " + courseNum;
   cardTitle.className = "card-title";

   let courseImg = document.createElement("img");
   courseImg.style = "width: 3rem";
   courseImg.className = "mt-2 card-img";

   switch (dept) {
      case "CompSci":
         courseImg.src = "images/science.png";
         break;
      case "Math":
         courseImg.src = "images/calculating.png";
         break;
      case "English":
         courseImg.src = "images/eng.png";
         break;
      case "Finance":
         courseImg.src = "images/budget.png";
         break;
      default:
         courseImg.src = "images/training.png";
   }

   let cardBody = document.createElement("div");
   cardBody.className = "card-body";

   let department = document.createElement("p");
   department.innerText = "Department: " + dept;

   let anchor = document.createElement("a");
   anchor.href = `http://127.0.0.1:5500/details.html?courseid=${id}`;
   anchor.text = "Details";

   cardStorage.appendChild(card);
   card.appendChild(cardHeader);
   cardHeader.appendChild(cardTitle);
   cardHeader.appendChild(courseImg);
   card.appendChild(cardBody);
   cardBody.appendChild(department);
   cardBody.appendChild(anchor);
}
