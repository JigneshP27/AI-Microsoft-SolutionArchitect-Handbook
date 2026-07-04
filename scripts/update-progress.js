const fs = require('fs');
const path = require('path');

const tasksPath = path.join(__dirname, '../TASKS.md');
const outputPath = path.join(__dirname, '../src/data/progress.json');

const content = fs.readFileSync(tasksPath, 'utf8');
const lines = content.split('\n');

const epics = [];
let currentEpic = null;

for (const line of lines) {
    if (line.startsWith('# ') && line.includes('EPIC')) {
        // Parse epic title, e.g., "# 🟢 EPIC 1 — Foundation Website"
        const match = line.match(/EPIC \d+ — (.+)/);
        if (match) {
            currentEpic = {
                name: match[1].trim(),
                total: 0,
                completed: 0
            };
            epics.push(currentEpic);
        }
    } else if (currentEpic && line.trim().startsWith('- [')) {
        currentEpic.total++;
        if (line.includes('- [x]') || line.includes('- [X]')) {
            currentEpic.completed++;
        }
    }
}

const progressData = epics.map(epic => ({
    name: epic.name,
    percent: epic.total === 0 ? 0 : Math.round((epic.completed / epic.total) * 100)
}));

fs.writeFileSync(outputPath, JSON.stringify(progressData, null, 2));
console.log('✅ Progress updated from TASKS.md');
