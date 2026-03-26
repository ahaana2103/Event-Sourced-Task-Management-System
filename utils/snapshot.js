const fs = require('fs');

const SNAPSHOT_FILE = './snapshots.json';

function saveSnapshot(state) {
    fs.writeFileSync(SNAPSHOT_FILE, JSON.stringify(state, null, 2));
}

function loadSnapshot() {
    if (!fs.existsSync(SNAPSHOT_FILE)) return null;
    return JSON.parse(fs.readFileSync(SNAPSHOT_FILE));
}

module.exports = {
    saveSnapshot,
    loadSnapshot
};