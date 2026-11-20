function createWaterfallPopup(data) {
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
    const addMetric = (label, value, suffix = "") => {
        if (value === undefined || value === null || value === "") {
            return "";
        }

        return `<div class="marker-stat"><span class="marker-label">${label}</span><strong>${escapeHtml(value)}${suffix}</strong></div>`;
    };

    const metrics = [
        addMetric("Beauty", data.beauty, data.beauty === "" ? "" : "/10"),
        addMetric("Photo", data.photo, data.photo === "" ? "" : "/10"),
        addMetric("Hike difficulty", data.hDifficulty, data.hDifficulty === "" ? "" : "/10"),
        addMetric("Hike distance", data.hDistance, typeof data.hDistance === "number" ? " miles" : ""),
        addMetric("Elevation", data.elevation, data.elevation === "" ? "" : " ft"),
        addMetric("Canopy", data.canopy),
        addMetric("Compass heading", data.compass, typeof data.compass === "number" ? "°" : "")
    ].filter(Boolean).join("");
    const page = data.pageNumber === undefined || data.pageNumber === null || data.pageNumber === ""
        ? ""
        : `<span>Guide page ${escapeHtml(data.pageNumber)}</span>`;
    const coordinates = `${escapeHtml(data.lat)}, ${escapeHtml(data.lng)}`;
    const destination = `${encodeURIComponent(data.lat)},${encodeURIComponent(data.lng)}`;
    const title = escapeHtml(data.title);

    return `<div class="marker">
        <div class="marker-heading">
            <span class="marker-eyebrow">Waterfall details</span>
            <h3>${title}</h3>
        </div>
        <div class="marker-stats">${metrics}</div>
        <div class="marker-meta">${page}<span>${coordinates}</span></div>
        <a href="https://www.google.com/maps/dir/?api=1&amp;destination=${destination}" target="_blank" rel="noopener noreferrer" class="button" aria-label="Get directions to ${title}">Get directions <span aria-hidden="true">&rarr;</span></a>
    </div>`;
}
