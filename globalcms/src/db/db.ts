import Dexie, { type Table } from 'dexie';

export interface CMSContent {
  id?: number;
  tenantId: string;
  type: string; // e.g., 'page', 'post'
  slug: string;
  title: string;
  content: any; // Dynamic JSON content
  lastUpdated: number;
}

export class GlobalCMSDatabase extends Dexie {
  cmsContent!: Table<CMSContent>;

  constructor() {
    super('GlobalCMSDB');
    this.version(1).stores({
      cmsContent: '++id, tenantId, type, slug, [tenantId+slug]' // primary key and indexes
    });
  }
}

export const db = new GlobalCMSDatabase();
