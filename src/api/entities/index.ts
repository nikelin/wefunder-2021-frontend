export type Id<T> = {
    value: number;
}

export type PresentationResource = {};

export type PresentationPage = {
    pageId: Id<PresentationPage>;
    resourceId: Id<PresentationResource>
    pageNum: number;
}

export type Presentation = {
    title: string;
    author: string;
    description: string;
}

export type PresentationData = {
    id: Id<Presentation>;
    presentation: Presentation,
    pages: PresentationPage[];
}