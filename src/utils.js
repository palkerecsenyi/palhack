// TODO


export async function getProductDetail(product) {
    const response = await fetch(product.url);
    if (response.ok) {
        const responseXml = DOMParser.parseFromString(await response.text(), "text/html");
        return getCurrentResult(responseXml);
    } else {
        console.error(response)
        return null;
    }
}

export function getCurrentResult(dom = document) {
    // get the title and url of current page, if it is a product
    const title = dom.getElementById("productTitle");
    const manufacturer = dom.getElementsByClassName("po-brand")[0].lastElementChild.innerText;
    const series = dom.getElementsByClassName("po-model_name")[0].lastElementChild.innerText;
    const itemWeight = dom.getElementsByClassName("po-item_weight")
    let weight = null;
    if (itemWeight.length) {
        const weightStr = itemWeight[0].lastElementChild.innerText;
        if (weightStr.endsWith(" grams")) {
            weight = parseFloat(weightStr);
        }
    }
    if (weight === null) {
        const unitCount = dom.getElementsByClassName("po-unit_count");
        if (unitCount.length) {
            const weightStr = unitCount[0].lastElementChild.innerText;
            if (weightStr.endsWith(" gram")) {
                weight = parseFloat(weightStr);
            }
        }
    }
    const originalPrice = dom.getElementsByClassName("a-text-price");
    const price = originalPrice.length ? originalPrice[0].innerText : dom.getElementById("corePrice_feature_div").getElementsByClassName("a-offscreen")[0].innerText;

    if (title === null) {
        return null;
    } else {
        return { title: dom.getElementById("productTitle"), manufacturer: manufacturer, series: series, weight: weight, url: window.location.href, price: price.replace(/^[0-9]/, "") };
    }
}

export function getCart(dom = document) {
    const result = document.evaluate("//div[contains(concat(' ', normalize-space(@class), ' '), ' sc-list-body ')]/div[@data-itemid!='']", dom, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let node = null;
    const items = [];
    while (node = result.iterateNext()) {
        const title = node.getElementsByClassName("sc-list-item-content")[0].getElementsByTagName("a")[0];
        items.push({ title: title.getElementsByClassName("a-truncate-full").innerText, url: title.href, node: node });
    }
    return items || null;
}
