export class Comic {
    id: number;
    title: string;
    description: string;
    format: string;
    thumbnail: {
        path: string,
        extension: string
    };
    issueNumber: number;
}
