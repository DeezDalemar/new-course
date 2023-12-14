const courseNameField = document.querySelector("#courseNameField");
const courseNumberField = document.querySelector("#courseNumberField");
const instructorField = document.querySelector("#instructorField");
const startDateField = document.querySelector("#startDateField");
const durationField = document.querySelector("#durationField");
const submitButton = document.querySelector("#submitButton");
const courseDeptSelect = document.querySelector("#courseDeptSelect");

window.onload = loadCourseDept();
submitButton.addEventListener("click", addCourse);

async function loadCourseDept() {
   let response = await fetch("http://localhost:8081/api/courses");
   let data = await response.json();

   const addedDepartments = {};

   for (const department of data) {
      if (!addedDepartments[department.dept]) {
         let option = new Option(department.dept);
         courseDeptSelect.appendChild(option);
         addedDepartments[department.dept] = true;
      }
   }
}

async function addCourse() {
   let response = await fetch("http://localhost:8081/api/courses", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(grabCurrentData()),
   });

   let data = await response.json();
   console.log(data);
}

function grabCurrentData() {
   const dateObject = new Date(startDateField.value);
   const monthWord = monthToWord(dateObject.getMonth());
   const day = dateObject.getDate();
   let fullDate = monthWord + " " + (day + 1);

   let dataObj = {
      dept: courseDeptSelect.value,
      courseNum: courseNumberField.value,
      courseName: courseNameField.value,
      instructor: instructorField.value,
      startDate: fullDate,
      numDays: durationField.value,
    };
    
    return dataObj
}

function monthToWord(month) {
   const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];
   return months[month];
}


