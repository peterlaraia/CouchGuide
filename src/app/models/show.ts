import { Externals } from './externals';
import { ImageLinks } from './image-links';
import { Links } from './links';
import { Network } from './network';
import { Rating } from './rating';
import { Schedule } from './schedule';

export interface Show {
    id: number;
    url?: string;
    name?: string;
    type?: string;
    language?: string;
    genres?: string[];
    status?: string;
    runtime?: number;
    premiered?: string;
    schedule?: Schedule;
    rating?: Rating;
    weight?: number;
    network?: Network;
    webChannel?: Network;
    externals?: Externals;
    image?: ImageLinks;
    summary?: string;
    updated?: number;
    _links?: Links;
}
