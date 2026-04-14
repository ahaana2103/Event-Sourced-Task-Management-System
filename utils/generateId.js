function generateId() {
    return `evt_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

module.exports = generateId;
