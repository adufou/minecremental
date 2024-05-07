import { Item } from '@/constants/items.ts';

function getAssetImageUrl(name: string) {
    // BASE_URL is a special variable that Vite will replace with the base URL of your project
    // see 'base' in vite.config.ts
    return `${import.meta.env.BASE_URL}/assets/${name}.png`;
}

function getImageOfItem(item: Item) {
    return getAssetImageUrl(item.name.toLowerCase());
}

export { getAssetImageUrl, getImageOfItem };
