function normalizeURL(url){
    fullURL = new URL(url)
    urlClean = fullURL.host + fullURL.pathname
    while (urlClean.endsWith('/')){
        urlClean = urlClean.slice(0,-1)
    }
    return urlClean
}

module.exports = {
    normalizeURL
  }  