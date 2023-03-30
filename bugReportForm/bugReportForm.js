let formSubmitted = false;

let storedBugReports = JSON.parse(localStorage.getItem('storedBugReports')) || [];

const clearHistoryButton = document.createElement('button');

const table = document.getElementById('bug-report-table');
table.style.display = 'none';

// Store user inputs in local storage
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
nameInput.value = localStorage.getItem('name') || '';
emailInput.value = localStorage.getItem('email') || '';

nameInput.addEventListener('change', () => {
localStorage.setItem('name', nameInput.value);
});

emailInput.addEventListener('change', () => {
localStorage.setItem('email', emailInput.value);
});

let bugReportCount = 1;

// Create div with form data
const createBugReportDiv = (formData) => {
    const bugReportDiv = document.createElement('div');
    bugReportDiv.className = 'bug-report';
    bugReportDiv.innerHTML = `
        <tempdiv><strong>Bug Description:</strong> ${formData.get('description')}</tempdiv
    `;

    bugReportCount++;
    return bugReportDiv;
};


// Display success message and refresh page upon submission
const form = document.getElementById('bug-report-form');
form.addEventListener('submit', (event) => {
event.preventDefault();

const submitButton = event.submitter;
submitButton.style.display = 'none'; // Hide the submit button

table.style.display = 'block';
const formData = new FormData(event.target);
const xhr = new XMLHttpRequest();
xhr.open('POST', form.action);
xhr.onload = () => {
    if (xhr.status === 200) {
    // show success message and reset form
    const successMessage = document.createElement('p');
    successMessage.textContent = 'Bug report submitted successfully!';
    form.parentElement.insertBefore(successMessage, form);

    // Clear form fields, except name and email
    const fieldsToClear = ['description', 'steps-to-reproduce', 'severity', 'platform'];
    fieldsToClear.forEach((fieldName) => {
        const field = document.getElementById(fieldName);
        field.value = '';
    });

    // Create and store bug report div
    const bugReportDiv = createBugReportDiv(formData);
    document.body.appendChild(bugReportDiv);
    storedBugReports.push(bugReportDiv.outerHTML);
    localStorage.setItem('storedBugReports', JSON.stringify(storedBugReports));

    setTimeout(() => {
        successMessage.remove();
        table.style.display = 'none';
        submitButton.style.display = 'block';
        location.reload();
    }, 3000);
    } else {
    console.error(xhr.statusText);
    }
};
xhr.send(formData);
});

// Populate stored bug reports on page load
storedBugReports.forEach((bugReport, index) => {
    const bugReportDiv = document.createElement('div');
    bugReportDiv.innerHTML = bugReport;
    bugReportDiv.firstChild.textContent = '#' + (index + 1) + ': ' + bugReportDiv.firstChild.textContent;

    document.body.appendChild(bugReportDiv);
});

// Clear stored bug reports and remove existing bug report divs
clearHistoryButton.textContent = 'Clear Local Bug Report History';
clearHistoryButton.addEventListener('click', () => {
  localStorage.removeItem('storedBugReports');
  storedBugReports = [];
  while (storedBugReports.firstChild) {
    storedBugReports.removeChild(storedBugReports.firstChild);
  }
  clearHistoryButton.style.display = 'none';
  location.reload();
});

if (storedBugReports.length > 0) {
  document.body.appendChild(clearHistoryButton);
  clearHistoryButton.style.display = 'block';
} else {
  clearHistoryButton.style.display = 'none';
}