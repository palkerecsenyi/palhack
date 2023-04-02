import {getProductDetail, getCurrentResult, parseCart, getInfo} from '../utils.js';


function getSearchResults(dom = document) {
    // search for the contents of each search result, return the title and link url
    const result = dom.evaluate("//div[@data-component-type='s-search-result']//div[contains(concat(' ', normalize-space(@class), ' '), ' s-title-instructions-style ')]//h2//a", dom, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    let node = null;
    const items = [];
    while (node = result.iterateNext()) {
        items.push({ title: node.innerText, url: node.href, node: node });
    }
    return items || null;
}

async function showCarbonForSearch(results) {
    for (const item of results) {
        const div = document.createElement("div");
        div.style = "background-color: #37c884; color: #000000; padding: 10px;"
        div.innerText = (await getInfo(await getProductDetail(item))) + "kg of carbon";
        item.node.appendChild(div);
    }
}

async function showCarbonForProduct(product) {
    const info = await getInfo(product)
    const div = document.createElement("div");
    div.style = "background-color: #37c884; color: #000000; padding: 10px;"
    div.innerText = info + "kg of carbon";
    const priceDisplay = document.getElementById("corePrice_desktop") ?? document.getElementById("corePriceDisplay_desktop_feature_div");
    priceDisplay.appendChild(div)
}

function getOrderConfirmationResults() {
    if (window.location.pathname.startsWith("/gp/buy/thankyou/handlers/display.html")) {
        // this is an order confirmation page !! store the products bought
        // find all products purchased
        const result = document.evaluate("//span[contains(concat(' ', normalize-space(@class), ' '), ' checkout-quantity-badge ')]/..", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

        let node = null;
        const items = [];
        while (node = result.iterateNext()) {
            items.push({ title: node.firstElementChild.alt, url: node.parentElement.href, count: parseInt(node.lastElementChild.innerText) });
        }
        return items || null;
    } else {
        return null;
    }
}

async function sendOrderConfirmationData(items) {
    let carbonTotal = 0
    for (const item of items){
        const productDetails = getProductDetail(item)
        const carbonInfo = getInfo(productDetails)
        if (carbonInfo === null) {
            continue;
        }
        carbonTotal += carbonInfo["Carbon"]
    }
    const base = "http://localhost:3000/api/v1/saveToLeaderboard";
    const url = new URL(base);
    url.searchParams.append("token", localStorage.getItem("token"));
    url.searchParams.append("carbonForOrder", carbonTotal);
    const response = await fetch(url);
    if (response.ok) {
        return true;
    } else {
        console.error(response)
        return false;
    }

}

async function showCartCarbon(cart) {
    for (const item of cart) {
        const div = document.createElement("div");
        div.style = "background-color: #37c884; color: #000000; padding: 10px;"
        div.innerText = (await getInfo(await getProductDetail(item))) + "kg of carbon";
        item.node.appendChild(div);
    }
}

export default async function Amazon() {
    // entrypoint
    const thisProduct = getCurrentResult();
    console.log(thisProduct)
    if (thisProduct !== null) {
        await showCarbonForProduct(thisProduct)
    }
    const results = getSearchResults();
    console.log(results);
    if (results !== null) {
        await showCarbonForSearch(results)
    }
    const confirmation = getOrderConfirmationResults();
    console.log(confirmation);
    if (confirmation !== null) {
        await sendOrderConfirmationData(confirmation)
    }
    const cart = parseCart();
    console.log(cart);
    if (cart !== null) {
        await showCartCarbon(cart);
    }

}
