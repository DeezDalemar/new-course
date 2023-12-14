let id = 0;
const courseNAndN = document.querySelector("#courseNameAndNumber");
const department = document.querySelector("#department");
const instructor = document.querySelector("#instructor");
const startDate = document.querySelector("#startDate");
const duration = document.querySelector("#duration");
const classIcon = document.querySelector("#classIcon");
const deleteButton = document.querySelector("#deleteButton");
const editButton = document.querySelector("#editButton");
const finishButton = document.querySelector("#finishButton");
const warningText = document.querySelector("#emptyWarningText");

window.onload = init();
deleteButton.addEventListener("click", deleteCourse);
editButton.addEventListener("click", editCourse);

function init() {
   const urlParams = new URLSearchParams(location.search);

   if (urlParams.has("courseid") === true) {
      id = urlParams.get("courseid");
   }

   loadCourseData();
}

async function loadCourseData() {
   let response = await fetch("http://localhost:8081/api/courses/" + id);
   let data = await response.json();
   console.log(data);

   courseNAndN.innerText = data.courseName + " " + data.courseNum;
   department.innerText = data.dept;
   instructor.innerText = "Prof. " + data.instructor;
   startDate.innerText = data.startDate;
   duration.innerText = data.numDays + " Days";

   switch (data.dept) {
      case "CompSci":
         classIcon.innerText = "CS" + data.courseNum;
         break;
      case "Math":
         classIcon.innerText = "MTH" + data.courseNum;
         break;
      case "English":
         classIcon.innerText = "ENG" + data.courseNum;
         break;
      case "Finance":
         classIcon.innerText = "FIN" + data.courseNum;
         break;
      default:
         classIcon.innerText = "Alert IT Team if your seeing this.";
   }
}

async function deleteCourse() {
   let response = await fetch("http://localhost:8081/api/courses/" + id, {
      method: "DELETE",
   });

   let data = await response.json();
   console.log(data);
}

async function editCourse() {
   let newDataObj = {}

   let response = await fetch("http://localhost:8081/api/courses/" + id);
   let data = await response.json();

   warningText.innerText = "Note: Course Name and Number ID Cannot Be Changed";

   let departmentInput = document.createElement("input");
   departmentInput.value = data.dept;

   let instructorInput = document.createElement("input");
   instructorInput.value = data.instructor;

   let startDateInput = document.createElement("input");
   startDateInput.value = data.startDate;

   let durationInput = document.createElement("input");
   durationInput.value = data.numDays;

   instructor.replaceWith(instructorInput);
   department.replaceWith(departmentInput);
   startDate.replaceWith(startDateInput);
   duration.replaceWith(durationInput);

   finishButton.style.display = "inline"

   finishButton.addEventListener("click", async function () {
      finishButton.style.display = "none"
      warningText.innerText = ""

      newDataObj = {
         dept: departmentInput.value,
         courseNum: data.courseNum,
         courseName: data.courseName,
         instructor: instructorInput.value,
         startDate: startDateInput.value,
         numDays: durationInput.value,
      };

      let putResponse = await fetch("http://localhost:8081/api/courses/" + id, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newDataObj)
      });

      console.log(putResponse.status);

      loadCourseData()

      instructorInput.replaceWith(instructor);
      departmentInput.replaceWith(department);
      startDateInput.replaceWith(startDate);
      durationInput.replaceWith(duration);

   })


   
}
