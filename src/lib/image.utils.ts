function getItemImageUrl(name: string) {
    return new URL(`../assets/${name}.png`, import.meta.url).href;
}

export { getItemImageUrl };
