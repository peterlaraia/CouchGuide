export interface Links {
    self: Link;
    nextepisode?: Link;
    previousepisode?: Link;
}

interface Link {
    href: string;
}
