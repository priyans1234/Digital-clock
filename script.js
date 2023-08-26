const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const formatToggle = document.getElementById('format-toggle');
const timezoneSelector = document.getElementById('timezone-selector');

function updateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    // Check the selected time format (12-hour or 24-hour)
    const is24HourFormat = formatToggle.textContent === 'Toggle Format';

    // Check the selected time zone
    const selectedTimezone = timezoneSelector.value;

    if (selectedTimezone === 'auto') {
        dateElement.textContent = now.toLocaleDateString('en-US', options);
        timeElement.textContent = is24HourFormat
            ? now.toLocaleTimeString()
            : now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    } else {
        const timezoneOptions = { timeZone: selectedTimezone, ...options };
        dateElement.textContent = now.toLocaleDateString('en-US', timezoneOptions);
        timeElement.textContent = is24HourFormat
            ? now.toLocaleTimeString('en-US', { timeZone: selectedTimezone })
            : now.toLocaleTimeString('en-US', { timeZone: selectedTimezone, hour: 'numeric', minute: 'numeric', hour12: true });
    }

    setTimeout(updateTime, 1000); // Update every 1 second
}

// Toggle between 12-hour and 24-hour time format
formatToggle.addEventListener('click', () => {
    formatToggle.textContent = formatToggle.textContent === 'Toggle Format' ? 'Switch to 24-Hour' : 'Toggle Format';
    updateTime();
});

// Update the clock based on the selected time zone
timezoneSelector.addEventListener('change', updateTime);

updateTime(); // Initial call to start the clock
