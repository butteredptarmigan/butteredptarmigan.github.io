import { Book as BookInterface, Resource } from "./types";

export function getAuthor(data: BookInterface) {
    const agents = data.agents;

    if (Array.isArray(agents)) {
        try {
            const author = agents.find(agent => agent?.type == 'Author')?.person;
            const parts = author
                ?.split(', ')
                .reverse()
                .join(' ');
            return parts;
        } catch (error) { }
    }

    return undefined;
}

export function getCover(data: BookInterface) {
    const resources = data.resources;

    if (Array.isArray(resources)) {
        try {
            return resources.find(resource => (
                resource?.type == 'image/jpeg'
                && resource.uri.includes('medium')
            ))?.uri;
        } catch(error) { }
    }

    return undefined;
}

export function getResource(data?: BookInterface, type: string='text/html'): Resource | undefined {
    const resources = data?.resources;

    if (Array.isArray(resources)) {
        try {
            return resources.find(resource => resource?.type.includes(type));
        } catch(error) { }
    }

    return undefined;
}