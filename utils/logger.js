function logEvent(event) {
    console.log("EVENT LOG:");
    console.log(JSON.stringify(event, null, 2));
}

function logError(error) {
    console.error("ERROR:", error.message);
}

module.exports = {
    logEvent,
    logError
};