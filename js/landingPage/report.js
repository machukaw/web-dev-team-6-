
const reportsData = [
    { name: "Chelsea Nvidia", id: "2024-03655", reports: 5 },
    { name: "Lance Radeon", id: "2024-03656", reports: 2 },
    { name: "Mike Intel", id: "2024-03657", reports: 8 }
  ];
  
  const respondedData = [
    { name: "Chelsea Nvidia", date: "2024-04-10", type: "Harassment", status: "Online" },
    { name: "Lance Radeon", date: "2024-04-12", type: "Spam", status: "Offline" },
    { name: "Mike Intel", date: "2024-04-14", type: "Cheating", status: "Online" }
  ];
  
  const pendingData = [
    { name: "Emma Ryzen", date: "2024-04-15", type: "Abuse", status: "Offline" },
    { name: "John Xeon", date: "2024-04-16", type: "Plagiarism", status: "Online" }
  ];
  
  
  function createStatusBadge(status) {
    const badge = document.createElement("span");
    badge.classList.add("status-badge");
    badge.classList.add(status.toLowerCase()); // adds 'online' or 'offline'
    badge.textContent = status;
    return badge;
  }
  
  // Render cards into a container
  function renderCards(data, containerId, type) {
    const container = document.getElementById(containerId);
  
    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
  
      let content = document.createElement("div");
  
      if (type === "report") {
        content.innerHTML = `
          <h4>${item.id} - ${item.name}</h4>
          <p>Report Count: ${item.reports}</p>
        `;
      } else {
        content.innerHTML = `
          <h4>${item.name}</h4>
          <p>${item.date} - ${item.type}</p>
        `;
      }
  
      card.appendChild(content);
  
      if (item.status) {
        const badge = createStatusBadge(item.status);
        card.appendChild(badge);
      }
  
      container.appendChild(card);
    });
  }
  
  // Call render functions
  document.addEventListener("DOMContentLoaded", () => {
    renderCards(reportsData, "reports-container", "report");
    renderCards(respondedData, "responded-container", "responded");
    renderCards(pendingData, "pending-container", "pending");
  });
  item.id