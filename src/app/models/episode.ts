import { Links } from './links';
import { Show } from "./show";

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
    show?: Show;
    _links?: Links;
}
