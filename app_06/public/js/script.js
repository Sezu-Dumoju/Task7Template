console.log('javascript work!!!!!!!!');

async function loadStats() {
    const statsDiv = document.getElementById('stats');
    
    try {
        const response = await fetch('/stats');
        const data = await response.json();
        
        statsDiv.innerHTML = `
            <p><span class="highlight">📊</span> Wiadomość: ${data.message}</p>
            <p><span class="highlight">⏱️</span> Czas pracy: ${Math.round(data.uptime)}s</p>
            <p><span class="highlight">📅</span> Data: ${data.timestamp}</p>
        `;
    } catch (error) {
        statsDiv.innerHTML = `<p style="color: #ff4444;">❌ Błąd: ${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Strona załadowana!');
    loadStats();
});

setTimeout(loadStats, 5000);