import rawServices from './services.json';

export type Service = {
    slug: string;
    title: string;
    description: string;
    tagline?: string;
    longDescription?: string;
    imageSrc: string;
    highlights: string[];
    deliverables?: string[];
    process?: string[];
    sections?: {
        title: string;
        content: string[];
    }[];
};

export const services = rawServices as Service[];

export function getServiceBySlug(slug: string) {
    return services.find((s) => s.slug === slug);
}
