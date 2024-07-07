
/**
 * 
 * @param {String} urlString 
 * @returns urlString
 */
function normalizeUrl(urlString){
    const newUrl = new URL(urlString);
    const hostPath = `${newUrl.hostname}${newUrl.pathname}`;
    if (hostPath.length && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1)
    }
    return hostPath;
}


module.exports = {
    normalizeUrl,
}