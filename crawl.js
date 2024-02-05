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

async function crawlPage(currentURL){
    console.log(`Actively crawling: ${currentURL} ...`)

    try {
        resp = await fetch(currentURL)

        if (resp.status > 399){
            console.log(`${resp.status} status code while fetching ${currentURL}`)
            return
        }

        const contentType = resp.headers.get("Content-Type")
        if (!contentType.includes("text/html")){
            console.log(`Non-HTML content type : ${contentType} while fetching ${currentURL}`)
            return
        } 
        console.log(await resp.text())
    } catch (err) {
        console.log(`Error while fetching ${currentURL} : ${err.message}`)
    }

}

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
    crawlPage,
    getURLsFromHTML
  }  