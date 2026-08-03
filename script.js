function updateGreeting(){

    const hour = new Date().getHours();

    const greetingTitle = document.getElementById("greeting-title");

    if(hour >= 5 && hour < 12){

        greetingTitle.textContent = "Good Morning, Lily!🌞";

    }

    else if(hour >= 12 && hour < 16){

        greetingTitle.textContent = "Good Afternoon, Lily!🌤️";

    }

    else if(hour >= 16 && hour < 23){

        greetingTitle.textContent = "Good Evening, Lily!🌇";

    }

    else{

        greetingTitle.textContent = "Hello there, night owl!🌌";

    }

}

updateGreeting();
const winsContainer = document.getElementById("wins-list");
let tomorrowPlan = [];
// ========================================
// LOAD & MERGE SAVED DATA
// ========================================

const savedSubjects = localStorage.getItem("jeeos-subjects");

if(savedSubjects){

    const savedData = JSON.parse(savedSubjects);

    subjects = subjects.map(sourceSubject => {

        // Find this subject in saved data
        const savedSubject = savedData.find(
            saved => saved.name === sourceSubject.name
        );

        // If this is a completely new subject
        if(!savedSubject){

            return sourceSubject;

        }

        // Merge chapters
        const mergedChapters = sourceSubject.chapters.map(
            sourceChapter => {

                // Find matching saved chapter
                const savedChapter = savedSubject.chapters.find(
                    saved => saved.name === sourceChapter.name
                );

                // New chapter → use the fresh chapter
                if(!savedChapter){

                    return sourceChapter;

                }

                // Merge tasks
                const mergedTasks = sourceChapter.tasks.map(
                    sourceTask => {

                        const savedTask = savedChapter.tasks.find(
                            saved => saved.name === sourceTask.name
                        );

                        // New task
                        if(!savedTask){

                            return sourceTask;

                        }

                        // Existing task → preserve progress
                        return {

                            ...sourceTask,

                            completed: savedTask.completed

                        };

                    }
                );

                return {

                    ...sourceChapter,

                    notes: savedChapter.notes ?? sourceChapter.notes,

                    tasks: mergedTasks

                };

            }
        );

        return {

            ...sourceSubject,

            chapters: mergedChapters

        };

    });

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
const todaysTasksContainer = document.getElementById("todays-tasks-list");
const clearPlanBtn = document.getElementById("clear-plan-btn");

function renderSubjects()
{

    container.innerHTML = "";

    subjects.forEach((subject, subjectIndex) => {

        const subjectCard = createSubjectCard(subject, subjectIndex);

        container.appendChild(subjectCard);

    });

}
function createSubjectCard(subject, subjectIndex)
{

    const subjectCard = document.createElement("div");
    subjectCard.classList.add("subject-card");
    subjectCard.style.setProperty(
    "--subject-color",
    subject.color
);

    const title = document.createElement("h2");
    title.textContent = `▶ ${subject.name}`;
    title.style.color = subject.color;

    const chaptersContainer = document.createElement("div");
    chaptersContainer.classList.add("chapters-container");
    chaptersContainer.style.display = "none";

    title.addEventListener("click", () => {

        const expanded = chaptersContainer.style.display === "block";

        chaptersContainer.style.display = expanded ? "none" : "block";

        title.textContent = expanded
            ? `▶ ${subject.name}`
            : `▼ ${subject.name}`;

    });

    subject.chapters.forEach((chapter, chapterIndex) => {

        const chapterCard = createChapter(
            subject,
            chapter,
            subjectIndex,
            chapterIndex
        );

        chaptersContainer.appendChild(chapterCard);

    });

    subjectCard.appendChild(title);
    subjectCard.appendChild(chaptersContainer);

    return subjectCard;

}

function createChapter(subject, chapter, subjectIndex, chapterIndex)
{

    // Main chapter container
    const chapterDiv = document.createElement("div");
    chapterDiv.classList.add("chapter");

    // Chapter title
    const chapterTitle = document.createElement("h3");
    chapterTitle.textContent = `▶ ${chapter.name}`;

    // Hidden task container
    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");
    tasksContainer.style.display = "none";

    // Expand / Collapse
    chapterTitle.addEventListener("click", () => {

        const expanded = tasksContainer.style.display === "block";

        tasksContainer.style.display = expanded ? "none" : "block";

        chapterTitle.textContent = expanded
            ? `▶ ${chapter.name}`
            : `▼ ${chapter.name}`;

    });

    // Generate every task
    chapter.tasks.forEach((task, taskIndex) => {

        const taskRow = createTask(

            task,

            subjectIndex,

            chapterIndex,

            taskIndex

        );

        tasksContainer.appendChild(taskRow);

    });

    // ==========================
// Notes
// ==========================

const notes = document.createElement("textarea");

notes.classList.add("chapter-notes");

notes.placeholder = "Write notes here...";

notes.value = chapter.notes;

notes.addEventListener("input", () => {

    chapter.notes = notes.value;

    saveData();

});

tasksContainer.appendChild(notes);

    chapterDiv.appendChild(chapterTitle);
    chapterDiv.appendChild(tasksContainer);

    return chapterDiv;

}

function createTask(task, subjectIndex, chapterIndex, taskIndex){

    // ==========================
    // Task Row
    // ==========================

    const taskRow = document.createElement("div");
    taskRow.classList.add("task-row");

    // Give this row the subject's color
    taskRow.style.setProperty(
        "--subject-color",
        subjects[subjectIndex].color
    );

    // ==========================
    // Left Side
    // ==========================

    const left = document.createElement("div");
    left.classList.add("task-left");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {

        task.completed = checkbox.checked;

        saveData();

        renderTomorrowPlan();

        renderTodayWins();

    });

    // Label
    const checkboxId = `task-${subjectIndex}-${chapterIndex}-${taskIndex}`;

    checkbox.id = checkboxId;

    const label = document.createElement("label");
    label.htmlFor = checkboxId;
    label.textContent = task.name;

    left.appendChild(checkbox);
    left.appendChild(label);

    // ==========================
    // Star Button
    // ==========================

    const star = document.createElement("button");
    star.classList.add("star-btn");

    const alreadyPlanned = tomorrowPlan.some(item =>

        item.subjectIndex === subjectIndex &&
        item.chapterIndex === chapterIndex &&
        item.taskIndex === taskIndex

    );

    star.textContent = alreadyPlanned ? "⭐" : "☆";

    star.addEventListener("click", () => {

        toggleTomorrowTask(

            subjectIndex,
            chapterIndex,
            taskIndex,
            star

        );

    });

    // ==========================
    // Assemble
    // ==========================

   taskRow.appendChild(left);
taskRow.appendChild(star);


// ==========================
// Click Task Row to Star
// ==========================

taskRow.addEventListener("click", (event) => {

    // Don't star when clicking the checkbox
    if(event.target === checkbox){

        return;

    }

    // Don't interfere with the star button itself
    if(event.target === star){

        return;

    }

    toggleTomorrowTask(

        subjectIndex,
        chapterIndex,
        taskIndex,
        star

    );

});


return taskRow;

}

function toggleTomorrowTask(subjectIndex, chapterIndex, taskIndex, star){

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
renderTomorrowPlan();

renderTodayWins();
}

function renderTomorrowPlan(){

    todaysTasksContainer.innerHTML = "";

    if(tomorrowPlan.length === 0){

        const empty = document.createElement("p");

        empty.textContent = "Nothing planned yet.";

        empty.classList.add("empty-message");

        todaysTasksContainer.appendChild(empty);

        return;

    }

    tomorrowPlan.forEach(item => {

        const subject = subjects[item.subjectIndex];

        const chapter = subject.chapters[item.chapterIndex];

        const task = chapter.tasks[item.taskIndex];

        const card = document.createElement("div");
card.classList.add("planned-task");

// Subject Badge
const badge = document.createElement("span");
badge.classList.add("subject-badge");

badge.textContent = subject.name;

badge.style.backgroundColor = subject.color;

// Chapter
const chapterText = document.createElement("div");
chapterText.classList.add("planned-chapter");
chapterText.textContent = chapter.name;

// Task
// Real checkbox
const taskRow = document.createElement("div");
taskRow.classList.add("planned-task-row");

const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = task.completed;

checkbox.addEventListener("change", () => {

    task.completed = checkbox.checked;

    saveData();

    renderTomorrowPlan();
    renderTodayWins();
    renderSubjects();

});

const label = document.createElement("label");
label.textContent = task.name;

taskRow.appendChild(checkbox);
taskRow.appendChild(label);

card.appendChild(badge);
card.appendChild(chapterText);
card.appendChild(taskRow);

todaysTasksContainer.appendChild(card);

    });

}



clearPlanBtn.addEventListener("click", () => {

    tomorrowPlan = [];

    saveData();

    renderTomorrowPlan();

    renderSubjects();

});

function renderTodayWins(){

    winsContainer.innerHTML = "";

    let found = false;

    tomorrowPlan.forEach(item => {

        const subject = subjects[item.subjectIndex];

        const chapter = subject.chapters[item.chapterIndex];

        const task = chapter.tasks[item.taskIndex];

        if(task.completed){

            found = true;

            const win = document.createElement("div");

            win.classList.add("planned-task");

            const badge = document.createElement("span");
            badge.classList.add("subject-badge");

            badge.style.backgroundColor = subject.color;
            badge.textContent = subject.name;

            const text = document.createElement("div");

            text.textContent =
                `✔ ${chapter.name} → ${task.name}`;

            win.appendChild(badge);
            win.appendChild(text);

            winsContainer.appendChild(win);

        }

    });

    if(!found){

        winsContainer.innerHTML =
        "<p class='empty-message'>Complete a planned task to see it here!</p>";

    }

}



// ========================================
// PAGE NAVIGATION
// ========================================

const dashboardPage =
    document.getElementById("dashboard-page");

const notesPage =
    document.getElementById("notes-page");

const completedPage =
    document.getElementById("completed-page");

const calendarPage =
    document.getElementById("calendar-page");

const statisticsPage =
    document.getElementById("statistics-page");


// Navigation buttons

const navDashboard =
    document.getElementById("nav-dashboard");

const navNotes =
    document.getElementById("nav-notes");

const navCompleted =
    document.getElementById("nav-completed");

const navCalendar =
    document.getElementById("nav-calendar");

const navStatistics =
    document.getElementById("nav-statistics");


// ========================================
// ACTIVE SIDEBAR ITEM
// ========================================

function setActiveNav(activeNav){

    document
        .querySelectorAll(".sidebar nav li")
        .forEach(item => {

            item.classList.remove("active");

        });

    activeNav.classList.add("active");

}


// ========================================
// SHOW PAGE
// ========================================

function showPage(page){

    dashboardPage.style.display = "none";

    notesPage.style.display = "none";

    completedPage.style.display = "none";

    calendarPage.style.display = "none";

    statisticsPage.style.display = "none";


    page.style.display = "block";

}


// ========================================
// DASHBOARD
// ========================================

navDashboard.addEventListener("click", () => {

    showPage(dashboardPage);

    setActiveNav(navDashboard);

});


// ========================================
// CHAPTER NOTES
// ========================================

navNotes.addEventListener("click", () => {

    showPage(notesPage);

    setActiveNav(navNotes);

});


// ========================================
// COMPLETED TASKS
// ========================================

navCompleted.addEventListener("click", () => {

    showPage(completedPage);

    setActiveNav(navCompleted);

});


// ========================================
// CALENDAR
// ========================================

navCalendar.addEventListener("click", () => {

    showPage(calendarPage);

    setActiveNav(navCalendar);

});


// ========================================
// STATISTICS
// ========================================

navStatistics.addEventListener("click", () => {

    showPage(statisticsPage);

    setActiveNav(navStatistics);

});


// ========================================
// DEFAULT PAGE
// ========================================

showPage(dashboardPage);

setActiveNav(navDashboard);
// ========================================
// CHAPTER NOTES
// ========================================

function renderChapterNotes(){

    const container = document.getElementById("notes-container");

    container.innerHTML = "";


    subjects.forEach((subject) => {

        // ==========================
        // Subject Card
        // ==========================

        const subjectCard = document.createElement("div");

        subjectCard.classList.add("notes-subject-card");


        // ==========================
        // Subject Title
        // ==========================

        const title = document.createElement("h3");

        title.textContent = `▶ ${subject.name}`;

        title.style.color = subject.color;


        // ==========================
        // Chapters Container
        // ==========================

        const chaptersContainer = document.createElement("div");

        chaptersContainer.classList.add(
            "notes-chapters-container"
        );

        chaptersContainer.style.display = "none";


        // ==========================
        // Subject Toggle
        // ==========================

        title.addEventListener("click", () => {

            const expanded =
                chaptersContainer.style.display === "block";


            chaptersContainer.style.display =
                expanded ? "none" : "block";


            title.textContent = expanded
                ? `▶ ${subject.name}`
                : `▼ ${subject.name}`;

        });


        // ==========================
        // Generate Chapters
        // ==========================

        subject.chapters.forEach((chapter) => {

            const noteCard =
                document.createElement("div");

            noteCard.classList.add("note-card");


            // Chapter name

            const chapterTitle =
                document.createElement("h4");

            chapterTitle.textContent =
                chapter.name;


            // Notes

            const notes =
                document.createElement("textarea");

            notes.value =
                chapter.notes || "";

            notes.placeholder =
                "Write your notes here...";


            // Save notes

            notes.addEventListener("input", () => {

                chapter.notes =
                    notes.value;

                saveData();

            });


            noteCard.appendChild(chapterTitle);

            noteCard.appendChild(notes);

            chaptersContainer.appendChild(noteCard);

        });


        // ==========================
        // Assemble
        // ==========================

        subjectCard.appendChild(title);

        subjectCard.appendChild(
            chaptersContainer
        );

        container.appendChild(subjectCard);

    });

}


// ========================================
// COMPLETED TASKS
// ========================================

function renderCompletedTasks(){

    const container =
        document.getElementById("completed-container");

    container.innerHTML = "";


    subjects.forEach(subject => {

        // ==========================
        // Subject Card
        // ==========================

        const subjectCard =
            document.createElement("div");

        subjectCard.classList.add(
            "completed-subject-card"
        );


        // ==========================
        // Subject Title
        // ==========================

        const title =
            document.createElement("h3");

        title.textContent =
            `▶ ${subject.name}`;

        title.style.color =
            subject.color;


        // ==========================
        // Chapters Container
        // ==========================

        const chaptersContainer =
            document.createElement("div");

        chaptersContainer.classList.add(
            "completed-chapters-container"
        );

        chaptersContainer.style.display =
            "none";


        // ==========================
        // Subject Toggle
        // ==========================

        title.addEventListener("click", () => {

            const expanded =
                chaptersContainer.style.display === "block";


            chaptersContainer.style.display =
                expanded ? "none" : "block";


            title.textContent = expanded
                ? `▶ ${subject.name}`
                : `▼ ${subject.name}`;

        });


        // ==========================
        // Chapters
        // ==========================

        subject.chapters.forEach(chapter => {

            const completedTasks =
                chapter.tasks.filter(
                    task => task.completed
                );


            // Skip empty chapters

            if(completedTasks.length === 0){

                return;

            }


            // ==========================
            // Chapter Section
            // ==========================

            const chapterSection =
                document.createElement("div");

            chapterSection.classList.add(
                "completed-chapter-section"
            );


            // Chapter Name

            const chapterTitle =
                document.createElement("h4");

            chapterTitle.textContent =
                chapter.name;


            // ==========================
            // Completed Tasks
            // ==========================

            const taskList =
                document.createElement("div");

            taskList.classList.add(
                "completed-task-list"
            );


            completedTasks.forEach(task => {

                const taskRow =
                    document.createElement("div");

                taskRow.classList.add(
                    "completed-task"
                );


                const check =
                    document.createElement("span");

                check.textContent = "✓";


                const taskName =
                    document.createElement("span");

                taskName.textContent =
                    task.name;


                taskRow.appendChild(check);

                taskRow.appendChild(taskName);

                taskList.appendChild(taskRow);

            });


            chapterSection.appendChild(
                chapterTitle
            );

            chapterSection.appendChild(
                taskList
            );

            chaptersContainer.appendChild(
                chapterSection
            );

        });


        // ==========================
        // Assemble
        // ==========================

        subjectCard.appendChild(title);

        subjectCard.appendChild(
            chaptersContainer
        );

        container.appendChild(
            subjectCard
        );

    });

}


renderSubjects();
renderTomorrowPlan();
renderTodayWins();
renderChapterNotes();
renderCompletedTasks();
