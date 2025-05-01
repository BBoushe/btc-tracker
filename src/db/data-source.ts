// src/db/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { Investment } from '@/db/entity/Investment';

let ds: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
    // 1) If already initialized, return it
    if (ds?.isInitialized) {
        return ds;
    }

    // 2) Otherwise, point at a file in your project root
    const file = join(process.cwd(), 'sqlite.db');
    ds = new DataSource({
        type: 'sqlite',
        database: file,
        synchronize: true,
        logging: ['error'],
        entities: [Investment],
    });

    try {
        await ds.initialize();
        console.log(`✅ SQLite initialized at ${file}`);
        return ds;
    } catch (err) {
        // 3) Log the real error to your terminal
        console.error('❌ Failed to initialize DataSource:', err);
        throw err;  // rethrow so Next.js will still know things failed
    }
}