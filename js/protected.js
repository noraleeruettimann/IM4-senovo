document.addEventListener("DOMContentLoaded", async () => {
  try {
    const phpRes = await fetch("api/protected.php", { credentials: "include" });
    const phpData = await phpRes.json();
    if (!phpData || phpData.daysBefore === undefined) throw new Error("Ungültige PHP-Daten");

    document.getElementById("headline").textContent = phpData.headline;

    const tasksRes = await fetch("data/tasks.json");
    const allTasks = await tasksRes.json();

    const days = phpData.daysBefore;
    let activeGroup = "";

    if (days >= 730) activeGroup = "2–3";
    else if (days >= 365) activeGroup = "12–18";
    else if (days >= 0) activeGroup = "6";
    else activeGroup = "nach";

    const checklistContainer = document.getElementById("tasksList");
    const visibleTasks = allTasks.filter(task => task.group === activeGroup);

    if (visibleTasks.length === 0) {
      checklistContainer.innerHTML = "<p>Keine Aufgaben für diesen Zeitraum gefunden.</p>";
      return;
    }

    const section = document.createElement("section");
    section.classList.add("checklist-section");

    const title = document.createElement("h2");
    title.textContent = getGroupTitle(activeGroup);
    section.appendChild(title);

    visibleTasks.forEach(task => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      const linksHtml = task.links?.map(link =>
        `<a href="${link.url}" target="_blank">${link.label}</a>`
      ).join("<br>") || "";

      taskDiv.innerHTML = `
        <label>
          <input type="checkbox">
          <div>
            <strong>${task.title}</strong><br>
            <p>${task.description}</p>
            ${linksHtml}
          </div>
        </label>
      `;

      // NEU: Checkbox-Listener für completed-Style
      const checkbox = taskDiv.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", (e) => {
        taskDiv.classList.toggle("completed", e.target.checked);
      });

      section.appendChild(taskDiv);
    });

    checklistContainer.appendChild(section);

  } catch (err) {
    console.error(err);
    alert("Fehler beim Laden deiner Checkliste.");
  }
});

function getGroupTitle(groupKey) {
  switch (groupKey) {
    case "2–3": return "2 bis 3 Jahre vor der Pensionierung";
    case "12–18": return "12 bis 18 Monate vor der Pensionierung";
    case "6": return "6 Monate vor der Pensionierung";
    case "nach": return "Nach der Pensionierung";
    default: return "Checkliste";
  }
}
