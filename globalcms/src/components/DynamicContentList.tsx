import React, { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { Message } from 'primereact/message';

interface ContentItem {
  id: number;
  type: string;
  slug: string;
  title: string;
  data: string; // JSON string from backend
}

export const DynamicContentList: React.FC = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const data = await apiFetch('/Content');
        setContents(data);
      } catch (err) {
        setError('Failed to load dynamic content');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  if (loading) {
    return (
      <div className="grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="col-12 md:col-6 lg:col-4">
            <Skeleton height="150px" className="mb-2"></Skeleton>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <Message severity="error" text={error} />;
  }

  if (contents.length === 0) {
    return <p className="text-center text-500">No content available for this tenant.</p>;
  }

  return (
    <div className="grid">
      {contents.map((item) => {
        let parsedData = {};
        try {
          parsedData = JSON.parse(item.data);
        } catch (e) {
          console.error('Failed to parse content data', e);
        }

        return (
          <div key={item.id} className="col-12 md:col-6 lg:col-4">
            <Card title={item.title} subTitle={item.type} className="h-full shadow-2">
              <div className="text-700">
                {(parsedData as any).body || 'No description available.'}
              </div>
              <div className="mt-3 text-sm text-500">
                Slug: {item.slug}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
