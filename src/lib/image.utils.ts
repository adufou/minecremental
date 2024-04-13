function getItemImageUrl(name: string) {
    return new URL(`../assets/items/${name}.png`, import.meta.url).href
}

export {getItemImageUrl}