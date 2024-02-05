
function printReport(pages){
    console.log('=========================')
    console.log('!!!!! START REPORT !!!!!!')
    console.log('=========================')
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages){
      const url = sortedPage[0]
      const count = sortedPage[1]
      if (count > 0){
        console.log(`Found ${count} internal links to ${url}`)
      } else {
        console.log(`Found external link to ${url}`)
      }
    }
    console.log('=========================')
    console.log('!!!!!! END REPORT !!!!!!!')
    console.log('=========================')
  }
  
 
  function sortPages(pages){
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => {
      return b[1] - a[1]
    })
    return pagesArr
  }
  
  module.exports = {
    printReport,
    sortPages
  }