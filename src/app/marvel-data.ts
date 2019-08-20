import { Comic } from './comic/comic';

export class MarvelData {
    data: {
        count: number;
        limit: number;
        offset: number;
        results: Comic[];
        total: number;
    };
    code: number;
}
