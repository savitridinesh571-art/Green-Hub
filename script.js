// Sample data storage (in real app, use database)
        let participants = JSON.parse(localStorage.getItem('greenParticipants')) || [];
        let stats = JSON.parse(localStorage.getItem('greenStats')) || {
            treesPlanted: 1247,
            tonsRecycled: 56,
            energySaved: 2300000,
            participants: 892
        };

        // Update stats display
        function updateStats() {
            document.getElementById('treesPlanted').textContent = stats.treesPlanted.toLocaleString();
            document.getElementById('tonsRecycled').textContent = stats.tonsRecycled;
            document.getElementById('energySaved').textContent = (stats.energySaved/1000).toLocaleString();
            document.getElementById('participants').textContent = stats.participants.toLocaleString();
        }

        // Update dates dynamically
        function updateEventDates() {
            const today = new Date();
            const treeDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
            const recycleDate = new Date(today.getTime() + 19 * 24 * 60 * 60 * 1000);
            const energyDate = new Date(today.getTime() + 24 * 24 * 60 * 60 * 1000);

            document.getElementById('treeDate').textContent = treeDate.toLocaleDateString();
            document.getElementById('recycleDate').textContent = recycleDate.toLocaleDateString();
            document.getElementById('energyDate').textContent = energyDate.toLocaleDateString();
        }

        // Join event function
        function joinEvent(eventType) {
            document.getElementById('eventType').value = eventType;
            document.getElementById('participate').scrollIntoView({ behavior: 'smooth' });
            alert(`Great choice! Scroll down to register for the ${eventType} event.`);
        }

        // Form submission
        document.getElementById('participationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                event: document.getElementById('eventType').value,
                details: document.getElementById('activityDetails').value,
                points: 0,
                date: new Date().toLocaleDateString(),
                id: Date.now()
            };

            // Calculate points
            const pointsMap = { tree: 50, recycle: 30, energy: 25, other: 15 };
            formData.points = pointsMap[formData.event] || 15;

            // Add to participants
            participants.unshift(formData);
            participants = participants.slice(0, 100); // Keep top 100

            // Update stats
            stats.participants += 1;
            if (formData.event === 'tree') stats.treesPlanted += 1;
            if (formData.event === 'recycle') stats.tonsRecycled += 0.1;
            if (formData.event === 'energy') stats.energySaved += 5000;

            // Save to localStorage
            localStorage.setItem('greenParticipants', JSON.stringify(participants));
            localStorage.setItem('greenStats', JSON.stringify(stats));

            // Reset form and show success
    