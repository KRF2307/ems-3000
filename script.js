let map, marker;

// Initialize map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 13.7563, lng: 100.5018 },
        zoom: 15
    });

    marker = new google.maps.Marker({
        position: { lat: 13.7563, lng: 100.5018 },
        map: map,
        draggable: true
    });

    google.maps.event.addListener(marker, 'position_changed', () => {
        const pos = marker.getPosition();
        document.getElementById('manualAddress').value = `${pos.lat().toFixed(6)}, ${pos.lng().toFixed(6)}`;
    });
}

// Handle the send alert button click
document.getElementById('sendAlert').addEventListener('click', async () => {
    const incidentType = document.getElementById('incidentType').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const manualAddress = document.getElementById('manualAddress').value;
    const additionalInfo = document.getElementById('additionalInfo').value;

    const alert = {
        incidentType,
        contactNumber,
        manualAddress,
        additionalInfo,
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
    };

    // Send the alert to the server
    await fetch('/api/alerts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alert)
    });

    alert('Emergency Alert Sent!');
});

// Load the Google Maps API
const script = document.createElement('script');
