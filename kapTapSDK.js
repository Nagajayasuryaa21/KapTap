window.parent.addEventListener('custom-event', (event) => {
    const eventData = event.detail; // Access the payload data
    // Handle the event data
    console.log("EVENT");
    console.log(eventData);
});
