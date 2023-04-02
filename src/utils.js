/**
 * get carbon info
 * @param product output from [getProductDetail]
 * @returns {Promise<any|null>} result from server or null
 */
export async function getInfo(product) {
    if (product == null) {
        return null;
    }
    const base = "http://localhost:3000/api/v1/getCarbon";
    const url = new URL(base);
    url.searchParams.append("name", product.name);
    url.searchParams.append("manufacturer", product.manufacturer);
    url.searchParams.append("categoryName", product.category);
    url.searchParams.append("price_cents", product.price ? product.price : "");
    url.searchParams.append("price_currency", product.currency ? product.currency : "")
    const response = await fetch(url);
    if (response.ok) {
        return (await response.json()).carbon
    } else {
        console.error(response)
        return null;
    }
}

export async function getProductDetail(product) {
    const response = await fetch(product.url);
    if (response.ok) {
        const responseXml = new DOMParser().parseFromString(await response.text(), "text/html");
        return getCurrentResult(responseXml, product.url);
    } else {
        console.error(response)
        return null;
    }
}

function getCurrency(currencySymbol) {
    switch(currencySymbol) {
        case "\xa3":
        case "\xc2\xa3":
            return "GBP"
        case "$":
            return "USD"
    }
    return ""
}

export function getCurrentResult(dom = document, baseURI = dom.baseURI) {
    // get the title and url of current page, if it is a product
    let title = dom.getElementById("productTitle");
    if (title == null) {
        return null;
    }
    title = title.innerText;
    let manufacturer = dom.getElementsByClassName("po-brand");
    if (manufacturer.length) {
        manufacturer = manufacturer[0].lastElementChild.innerText;
    } else {
        manufacturer = title.split(/\s/g)[0];
    }
    let series = dom.getElementsByClassName("po-model_name");
    if (series.length) {
        series = series[0].lastElementChild.innerText;
    } else {
        series = null;
    }
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
    let price = dom.getElementsByClassName("basisPrice");
    if (!price.length) {
        price = dom.getElementsByClassName("priceToPay");
    }
    if (!price.length) {
        price = dom.getElementsByClassName("apexPriceToPay");
    }
    if (!price.length) {
        return null;
    }
    price = price[0].getElementsByClassName("a-offscreen")[0].innerText;
    const categoryNumber = dom.getElementById("searchDropdownBox").dataset.navSelected;
    const category = dom.getElementById("searchDropdownBox").children[categoryNumber].innerText
    if (title === null) {
        return null;
    } else {
        return { title: dom.getElementById("productTitle").innerText, manufacturer: manufacturer, name: series ? series : title, category: category, series: series, weight: weight, url: baseURI, price: price.replaceAll(/[^0-9]/g, ""), currency: getCurrency(price[0]) };
    }
}

/**
 * return output of parseCart
 */
export async function getCart() {
    const url = "https://www.amazon.co.uk/gp/cart/view.html";
    const response = await fetch(url);
    if (response.ok) {
        const responseXml = new DOMParser().parseFromString(await response.text(), "text/html");
        return parseCart(responseXml, url);
    } else {
        console.error(response)
        return null;
    }
}

/**
 * returns a list of {title, url, node}
 * get the full details via [getInfo] compose [getProductDetail]
 */
export function parseCart(dom = document, baseURI = dom.baseURI) {
    const result = dom.evaluate("//div[contains(concat(' ', normalize-space(@class), ' '), ' sc-list-body ')]/div[@data-itemid!='']", dom, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    let node = null;
    const items = [];
    while (node = result.iterateNext()) {
        const title = node.getElementsByClassName("sc-list-item-content")[0].getElementsByTagName("a")[0];
        items.push({ title: title.getElementsByClassName("a-truncate-full").innerText, url: new URL(title.getAttribute("href"), baseURI), node: node });
    }
    return items || null;
}
