const fs = require("fs");
const path = require("path");

const DATA_DIRECTORY = path.join(__dirname, "..", "data");
const SNAPSHOT_FILE = path.join(DATA_DIRECTORY, "snapshots.json");

function ensureSnapshotDirectory() {
    if (!fs.existsSync(DATA_DIRECTORY)) {
        fs.mkdirSync(DATA_DIRECTORY, { recursive: true });
    }
}

function saveSnapshot(state, lastSequence) {
    ensureSnapshotDirectory();

    const snapshot = {
        lastSequence,
        state,
        createdAt: new Date().toISOString()
    };

    fs.writeFileSync(SNAPSHOT_FILE, JSON.stringify(snapshot, null, 2));
    return snapshot;
}

function loadSnapshot() {
    ensureSnapshotDirectory();

    if (!fs.existsSync(SNAPSHOT_FILE)) {
        return null;
    }

    return JSON.parse(fs.readFileSync(SNAPSHOT_FILE, "utf8"));
}

module.exports = {
    saveSnapshot,
    loadSnapshot
};
