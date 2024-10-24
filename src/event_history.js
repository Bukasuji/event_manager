let currentPage = 1;
let rowsPerPage = 10;
let events = []; // Will store the fetched events
let filteredEvents = []; // Store filtered events for display

// Fetch the data (update the path to your data.json)
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    events = data; // Store the fetched events
    filteredEvents = events; // Initial copy for filtering
    populateDropdowns();
    applyFilters(); // Ensure table is displayed on load
    setupPagination();
  })
  .catch(error => console.error('Error fetching data:', error));

// Populate the Date and Speaker dropdowns
function populateDropdowns() {
  const filterByDate = document.getElementById('filterByDate');
  const filterBySpeaker = document.getElementById('filterBySpeaker');

  // Populate Date Dropdown
  const dates = [...new Set(events.map(event => event.date))];
  dates.forEach(date => {
    const option = document.createElement('option');
    option.value = date;
    option.textContent = date;
    filterByDate.appendChild(option);
  });

  // Populate Speaker Dropdown
  const speakers = [...new Set(events.map(event => event.speaker))];
  speakers.forEach(speaker => {
    const option = document.createElement('option');
    option.value = speaker;
    option.textContent = speaker;
    filterBySpeaker.appendChild(option);
  });
}

// Display the table based on current page and filters
function displayTable() {
  const eventTableBody = document.getElementById('event-table-body');
  eventTableBody.innerHTML = ''; // Clear existing rows

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedEvents = filteredEvents.slice(start, end);

  paginatedEvents.forEach(event => {
    const row = document.createElement('tr');
    //row.classList.add('border-b', 'dark:border-gray-700');

    // Add row click event listener to open the modal
    row.addEventListener('click', () => {
      openModal(event); // Pass event details to openModal function
    });

    const eventNameCell = document.createElement('td');
    eventNameCell.classList.add('p-3');
    eventNameCell.textContent = event.event_name;
    row.appendChild(eventNameCell);

    const dateCell = document.createElement('td');
    dateCell.classList.add('p-3');
    dateCell.textContent = event.date;
    row.appendChild(dateCell);

    const speakerCell = document.createElement('td');
    speakerCell.classList.add('p-3');
    speakerCell.textContent = event.speaker;
    row.appendChild(speakerCell);

    const statusCell = document.createElement('td');
    statusCell.classList.add('p-2');

    statusCell.classList.add('inline-block', 'px-3', 'mt-3', 'py-1', 'rounded-full', 'text-sm');
    
    if(event.status === 'In progress') {
      statusCell.classList.add('bg-[#DBEAFE]','dark:bg-transparent', 'dark:text-[#77B1FF]', 'dark:border','dark:border-[#77B1FF]', 'text-[#3B82F6]');
    } else {
      statusCell.classList.add ('bg-[#D1FAE5]', 'dark:bg-transparent', 'dark:text-[#65DDB5]','dark:border','dark:border-[#65DDB5]', 'text-[#10B981]')
    }

    statusCell.innerHTML = `&#8226; ${event.status}`;
    row.appendChild(statusCell);

    eventTableBody.appendChild(row);
  });
}

function displayTableMobile() {
  const eventTableBody = document.getElementById('event-mobile-table-body');
  eventTableBody.innerHTML = ''; // Clear existing rows

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedEvents = filteredEvents.slice(start, end);

  paginatedEvents.forEach(event => {
    const eventRow = document.createElement('div');
    eventRow.classList.add('event-row', 'flex', 'flex-col', 'py-2', 'cursor-pointer');
    
    // Container for event name and status
    const eventInfoContainer = document.createElement('div');
    eventInfoContainer.classList.add('flex', 'justify-between', 'items-center', 'w-full');

    // Event name container with dropdown icon
    const eventNameContainer = document.createElement('div');
    eventNameContainer.classList.add('flex', 'items-center', 'flex-grow');

    // Custom dropdown icon (rotates on click)
    const dropdownIcon = document.createElement('div');
    dropdownIcon.classList.add('dropdown-icon', 'mr-2', 'text-sm', 'transform', 'transition-transform', 'duration-300');
    dropdownIcon.textContent = '>';
    
    // Event name
    const eventNameDiv = document.createElement('div');
    eventNameDiv.textContent = event.event_name;
    eventNameDiv.classList.add('text-sm')

    // Append dropdown icon and event name to the container
    eventNameContainer.appendChild(dropdownIcon);
    eventNameContainer.appendChild(eventNameDiv);
    eventInfoContainer.appendChild(eventNameContainer);

    // Status badge
    const statusDiv = document.createElement('div');
    statusDiv.classList.add('status-badge', 'px-2','py-1', 'mt-2', 'inline-block', 'rounded-full', 'text-xs', 'text-right');

    if (event.status === 'In progress') {
      statusDiv.classList.add('bg-[#DBEAFE]', 'dark:bg-transparent', 'dark:text-[#77B1FF]', 'dark:border', 'dark:border-[#77B1FF]', 'text-[#3B82F6]');
    } else {
      statusDiv.classList.add('bg-[#D1FAE5]', 'dark:bg-transparent', 'dark:text-[#65DDB5]', 'dark:border', 'dark:border-[#65DDB5]', 'text-[#10B981]');
    }
    statusDiv.innerHTML = `${event.status}`;

    // Append status badge to event info container
    eventInfoContainer.appendChild(statusDiv);
    eventRow.appendChild(eventInfoContainer);

    // Dropdown content (hidden by default)
    const dropdownContent = document.createElement('div');
    dropdownContent.classList.add('dropdown-content', 'flex', 'text-sm', 'bg-[#F2F2F7]', 'hidden', 'pl-0', 'py-4'); // Hidden and with padding for alignment
    dropdownContent.innerHTML =
     `    <p>${event.speaker}</p>
          <p class='ml-auto'>${event.date}</p>
    `;

    // Append dropdown content to the event row
    eventRow.appendChild(dropdownContent);

    // Add event listener to toggle the dropdown
    eventNameContainer.addEventListener('click', () => {
      dropdownContent.classList.toggle('hidden');
      dropdownIcon.classList.toggle('rotate-90'); // Rotate icon when toggled

      // Toggle background color for event name container
      eventInfoContainer.classList.toggle('bg-[#F2F2F7]');
    });

    // Append the row to the mobile table body
    eventTableBody.appendChild(eventRow);
  });
}


function applyFilters() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const selectedDate = document.getElementById('filterByDate').value;
  const selectedStatus = document.getElementById('filterByStatus').value;
  const selectedSpeaker = document.getElementById('filterBySpeaker').value;
  const sortBy = document.getElementById('sortBy').value;

  // Filter the events without requiring search input
  filteredEvents = events.filter(event => {
    const matchesSearch = searchValue ? event.event_name.toLowerCase().includes(searchValue) : true;
    const matchesDate = selectedDate ? event.date === selectedDate : true;
    const matchesStatus = selectedStatus ? event.status === selectedStatus : true;
    const matchesSpeaker = selectedSpeaker ? event.speaker === selectedSpeaker : true;

    // Return true if all filter conditions match
    return matchesSearch && matchesDate && matchesStatus && matchesSpeaker;
  });

  // Sort the events
  if (sortBy === 'recent') {
    filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === 'oldest') {
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // Reset to first page after applying filters
  currentPage = 1;
  displayTable();
  displayTableMobile();
  setupPagination();
}


// Setup Pagination
function setupPagination() {
  const paginationNumbers = document.getElementById('pagination-numbers');
  paginationNumbers.innerHTML = ''; // Clear existing pagination numbers

  const pageCount = Math.ceil(filteredEvents.length / rowsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const pageNumber = document.createElement('button');
    pageNumber.textContent = i;
    pageNumber.classList.add('w-7', 'h-7','border-gray-300', 'text-sm', 'rounded-full');
    if (i === currentPage) {
      pageNumber.classList.add('bg-[#8576FF]', 'text-white');
    }
    pageNumber.addEventListener('click', () => {
      currentPage = i;
      displayTable();
      displayTableMobile();
      setupPagination();
    });
    paginationNumbers.appendChild(pageNumber);
  }

  // Enable/Disable Prev and Next buttons
  document.getElementById('prevBtn').disabled = currentPage === 1;
  document.getElementById('nextBtn').disabled = currentPage === pageCount;
}

// Function to open the modal and populate event details
function openModal(event) {
  const modal = document.getElementById('eventModal');
  document.getElementById('modalEventName').textContent = event.event_name;
  document.getElementById('modalEventDate').textContent = event.date;
  //document.getElementById('modalEventSpeaker').textContent = event.speaker;
 // document.getElementById('modalEventStatus').textContent = event.status;
  
  modal.classList.remove('hidden'); // Show modal
}

// close the modal
const eventModal = document.getElementById('eventModal');
const closeButtons = document.querySelectorAll('#closeModal, #closeXModal');

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    eventModal.classList.add('hidden');
  });
});



// Event Listeners
document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayTable();
    displayTableMobile();
    setupPagination();
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  const pageCount = Math.ceil(filteredEvents.length / rowsPerPage);
  if (currentPage < pageCount) {
    currentPage++;
    displayTable();
    displayTableMobile();
    setupPagination();
  }
});

document.getElementById('rowsPerPage').addEventListener('change', (event) => {
  rowsPerPage = parseInt(event.target.value);
  currentPage = 1; // Reset to first page when rows per page change
  displayTable();
  displayTableMobile();
  setupPagination();
});

// Apply Filters and Search
document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('filterByDate').addEventListener('change', applyFilters);
document.getElementById('filterByStatus').addEventListener('change', applyFilters);
document.getElementById('filterBySpeaker').addEventListener('change', applyFilters);
document.getElementById('sortBy').addEventListener('change', applyFilters);