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

const { JSDOM } = require('jsdom')

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        
        if (linkElement.href.startsWith('/')){
            try {
                urlCheck = new URL(baseURL+linkElement.href)
            } catch (err) {
                console.log(err.message)
                continue
            }
        } else{
            try {
                urlCheck = new URL(linkElement.href)
            } catch (err) {
                console.log(err.message)
                continue
            }
        }
        urls.push(urlCheck.href)

    }
    return urls
}
module.exports = {
    normalizeURL,
    getURLsFromHTML
  }  