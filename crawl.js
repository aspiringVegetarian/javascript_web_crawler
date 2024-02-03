function normalizeURL(url){
    try{
        fullURL = new URL(url)
    }
    catch(err){
        return ''
    }
    urlClean = fullURL.host + fullURL.pathname
    while (urlClean.length > 0 && urlClean.endsWith('/')){
        urlClean = urlClean.slice(0,-1)
    }
    return urlClean
}

module.exports = {
    normalizeURL
  }  