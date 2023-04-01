function getInfo(itemLink) {
    fetch("http://localhost:78393/api/v1/")
}

function getSearchResults() {
    // search for the contents of each search result, return the title and link url
    const result = document.evaluate("//div[@data-component-type='s-search-result']//div[contains(concat(' ', normalize-space(@class), ' '), ' s-title-instructions-style ')]//h2//a", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    let node = null;
    const items = [];
    while (node = result.iterateNext()) {
        items.push({ "title": node.innerText, "url": node.href });
    }
    return items;
}

function getCurrentResult() {
    // get the title and url of current page, if it is a product
    const title = document.getElementById("productTitle");
    if (title === null) {
        return null;
    } else {
        return {"title": document.getElementById("productTitle"), "url": window.location.href};
    }
}

function getOrderConfirmationResults() {
    if (window.location.pathname.startsWith("/gp/buy/thankyou/handlers/display.html") || /* TODO */ true) {
        // this is an order confirmation page !! store the products bought
        // find all products purchased
        const result = document.evaluate("//div[contains(concat(' ', normalize-space(@class), ' '), ' checkout-quantity-badge ']/..", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

        let node = null;
        const items = [];
        while (node = result.iterateNext()) {
            items.push({ "title": node.firstChild.alt, "url": node.href });
        }
        return items;


    }
}

export default function Amazon() {
    console.log(getCurrentResult())

}
