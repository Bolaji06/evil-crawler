
const { normalizeUrl, getURLsFromHTML, crawlPage } = require('./crawl');

async function main(){
    if (process.argv.length < 3){
        console.log('no website provided');
        process.exit(1);
    }else if (process.argv.length > 3){
        console.log('too many argument provided');
        process.exit(1);
    }
    const baseUrl = process.argv[2];
    console.log('start crawling ' + baseUrl);

   const pages = await crawlPage(baseUrl, baseUrl, {});
   loop: for (let page of Object.entries(pages)){
    if (!page){
        continue loop;
    }
    console.log(page);
   }
}

main()
