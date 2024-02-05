const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname){
        console.log(`Will not crawl ${currentURL}, since it is on a different domain than ${baseURL}`)
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1


    console.log(`Actively crawling: ${currentURL} ...`)

    try {
        resp = await fetch(currentURL)

        if (resp.status > 399){
            console.log(`${resp.status} status code while fetching ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("Content-Type")
        if (!contentType.includes("text/html")){
            console.log(`Non-HTML content type : ${contentType} while fetching ${currentURL}`)
            return pages
        } 
        const htmlBody = await resp.text()

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }
        return pages
    } catch (err) {
        console.log(`Error while fetching ${currentURL} : ${err.message}`)
        return pages
    }

}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {

        if (linkElement.href.startsWith('/')){
            try {
                urlCheck = new URL(linkElement.href, baseURL)
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
    normalizeURL,
    crawlPage,
    getURLsFromHTML
  }  