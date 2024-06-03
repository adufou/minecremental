export enum BuildingTypes {
    HOUSE,
}

export type BuildingsType = {
    OAK_HOUSE: Building;
};

export type Building = {
    displayName: string;
    name: keyof BuildingsType;
    type: BuildingTypes;
};

export type VillageBuilding = {
    building: Building;
    quantity: number;
    perSecond?: number;
};

export type Village = Partial<Record<keyof BuildingsType, VillageBuilding>>;
