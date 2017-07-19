import { Links } from './links';

export interface Episode {
    id: number;
    url?: string;
    name?: string;
    season?: number;
    number?: number;
    airdate?: string;
    airtime?: string;
    airstamp?: string;
    runtime?: number;
    image?: string;
    summary?: string;
    _links?: Links;
}
