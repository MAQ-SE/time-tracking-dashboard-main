// Fetch the data from the JSON file
async function loadData(timeframe) {
  const response = await fetch('data.json'); // Ensure 'data.json' is in the same directory
  const data = await response.json();

  const activityContainer = document.getElementById('activity-cards');
  activityContainer.innerHTML = ''; // Clear existing cards

  // Define colors for each activity
  const colors = {
    "Work": "#FF8C66",
    "Play": "#56C2E6",
    "Study": "#FF5C7C",
    "Exercise": "#4BCF83",
    "Social": "#7536D3",
    "Self Care": "#F1C75B"
  };

  data.forEach(activity => {
    const { title, timeframes } = activity;
    const { current, previous } = timeframes[timeframe];
    const cardColor = colors[title] || "#1f2937"; 

    // Create card dynamically
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card p-3" style="background-color: ${cardColor}; border-radius: 10px;">
        <div class="card-title text-white">${title}</div>
        <div class="card-body text-white">
          <p class="display-6">${current}hrs</p>
          <p class="previous">Last ${timeframe} - ${previous}hrs</p>
        </div>
      </div>
    `;
    activityContainer.appendChild(card);
  });
}

// Load weekly data by default
document.addEventListener('DOMContentLoaded', () => loadData('weekly'));