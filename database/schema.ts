import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'posts',
            columns: [
                { name: 'title', type: 'string', isIndexed: true }, // enable database indexing
                { name: 'subtitle', type: 'string', isOptional: true },
                { name: 'body', type: 'string' },
            ],
        }),
    ],
});
