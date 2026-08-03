/*
    let tomorrowPlan = [];
const savedSubjects = localStorage.getItem("jeeos-subjects");
console.log(savedSubjects);
if(savedSubjects){

    subjects = JSON.parse(savedSubjects);

}

const savedPlan = localStorage.getItem("jeeos-plan");

if(savedPlan){

    tomorrowPlan = JSON.parse(savedPlan);

}


function saveData(){

    localStorage.setItem(

        "jeeos-subjects",

        JSON.stringify(subjects)

    );

    localStorage.setItem(

        "jeeos-plan",

        JSON.stringify(tomorrowPlan)

    );

}
const container = document.getElementById("subjects-container");
console.log(subjects);
subjects.forEach((subject, subjectIndex) => {

    console.log("SUBJECT:", subject.name);
    console.log(subject.chapters);


    // Create subject card
    const subjectCard = document.createElement("div");
    subjectCard.classList.add("subject-card");

    // Subject title
    const title = document.createElement("h2");
    title.textContent = `▶ ${subject.name}`;
    title.style.color = subject.color;

    // Hidden container for chapters
    const chaptersContainer = document.createElement("div");
    chaptersContainer.classList.add("chapters-container");
    chaptersContainer.style.display = "none";

    // Loop through chapters
   subject.chapters.forEach((chapter, chapterIndex) => {

    console.log("CHAPTER =", chapter);

    // Chapter container
    const chapterDiv = document.createElement("div");
    chapterDiv.classList.add("chapter");

    // Chapter title
    const chapterTitle = document.createElement("h3");
    chapterTitle.textContent = `▶ ${chapter.name}`;

    // Hidden task container
    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");
    tasksContainer.style.display = "none";
console.log(chapter);
    // Generate tasks automatically
chapter.tasks.forEach((task, taskIndex) => {

    // ==========================
    // Task Row
    // ==========================

    const taskRow = document.createElement("div");
    taskRow.classList.add("task-row");

    // Left Side
    const left = document.createElement("div");
    left.classList.add("task-left");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {

        task.completed = checkbox.checked;
        saveData();

    });

    // Label
    const label = document.createElement("label");
    label.textContent = task.name;

    left.appendChild(checkbox);
    left.appendChild(label);

    // ==========================
    // Star Button
    // ==========================

    const star = document.createElement("button");
    star.classList.add("star-btn");

    // Check whether this task is already planned
    const alreadyPlanned = tomorrowPlan.some(item =>

        item.subjectIndex === subjectIndex &&
        item.chapterIndex === chapterIndex &&
        item.taskIndex === taskIndex

    );

    star.textContent = alreadyPlanned ? "⭐" : "☆";

    star.addEventListener("click", () => {

        const existingIndex = tomorrowPlan.findIndex(item =>

            item.subjectIndex === subjectIndex &&
            item.chapterIndex === chapterIndex &&
            item.taskIndex === taskIndex

        );

        if(existingIndex === -1){

            tomorrowPlan.push({

                subjectIndex,
                chapterIndex,
                taskIndex

            });

            star.textContent = "⭐";

        }

        else{

            tomorrowPlan.splice(existingIndex, 1);

            star.textContent = "☆";

        }

        saveData();

        // We'll add this function later
        // renderTomorrowPlan();

    });

    // ==========================
    // Assemble Row
    // ==========================

    taskRow.appendChild(left);
    taskRow.appendChild(star);

    tasksContainer.appendChild(taskRow);

});;

    // Expand / Collapse chapter
    chapterTitle.addEventListener("click", () => {

        if(tasksContainer.style.display === "none"){

            tasksContainer.style.display = "block";
            chapterTitle.textContent = `▼ ${chapter.name}`;

        }

        else{

            tasksContainer.style.display = "none";
            chapterTitle.textContent = `▶ ${chapter.name}`;

        }

    });

    chapterDiv.appendChild(chapterTitle);
    chapterDiv.appendChild(tasksContainer);

    chaptersContainer.appendChild(chapterDiv);

});

    // Expand / Collapse subject
    title.addEventListener("click", () => {

        if (chaptersContainer.style.display === "none") {

            chaptersContainer.style.display = "block";
            title.textContent = `▼ ${subject.name}`;

        } else {

            chaptersContainer.style.display = "none";
            title.textContent = `▶ ${subject.name}`;

        }

    });

    subjectCard.appendChild(title);
    subjectCard.appendChild(chaptersContainer);

    container.appendChild(subjectCard);})
*/