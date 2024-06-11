document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("maxVelocity").addEventListener("input", calculateStatistics);
    document.getElementById("minVelocity").addEventListener("input", calculateStatistics);
});

function calculateStatistics() {
    const maxVelocity = parseFloat(document.getElementById("maxVelocity").value) || 0;
    const minVelocity = parseFloat(document.getElementById("minVelocity").value) || 0;
    const avgVelocity = (maxVelocity + minVelocity) / 2;
    document.getElementById("avgVelocity").value = avgVelocity.toFixed(2);

    // Standard deviation calculation
    const velocities = [maxVelocity, minVelocity];
    const mean = avgVelocity;
    const variance = velocities.reduce((acc, velocity) => acc + Math.pow(velocity - mean, 2), 0) / velocities.length;
    const sd = Math.sqrt(variance);
    document.getElementById("sd").value = sd.toFixed(2);
}