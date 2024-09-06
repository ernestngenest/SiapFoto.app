const toBase64Uri = (mimetype, base64) => {
    return `data:${mimetype};base64,${base64}`;
};

module.exports = toBase64Uri