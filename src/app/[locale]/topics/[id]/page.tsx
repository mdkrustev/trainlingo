"use client";

import { Breadcrumb, BreadcrumbItem } from '@/components/ui/BreadCrumb';
import { useSingleItemRequest } from '@/hooks/useSingleItemRequest';
import { HomeIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTranslations } from '@/hooks/useTranslations';
import YouTubePlayer from '@/components/youtube/YouTubePlayer';
import { Topic } from '@prisma/client';

export interface TopicResponse {
    id: string;
    name: string | null;
    youtubeVideoId: string | null;
    categoryKey: string | null;
    languageKey: string | null;
}

export default function TopicDetailPage() {
    const { id } = useParams(); // id е string | string[]
    const { t, locale } = useTranslations();

    // Уверяваме се, че id е string
    const topicId = typeof id === 'string' ? id : null;

    const { data, loading, error } = useSingleItemRequest<Topic>(
        '/api/topics/one',
        topicId
    );

    // Сега инициализираме items след като имаме data
    const items: BreadcrumbItem[] = [
        [`/${locale}`, t.navi.home, <HomeIcon key="home_ico" size={16} />],
        [`/${locale}/topics`, t.navi.topics],
        ['', data?.name || t.navi.topic], // сега data е налично
    ];

    if (loading) return <p>{t.loading}...</p>;
    if (error) return <p>{t.error}: {error.message}</p>;
    if (!data) return <p>{t.noDataFound}</p>;

    return (
        <div className="w-[80%] m-auto">
            {/* Заглавие и breadcrumb */}
            <div className="flex justify-between border-b items-center pb-[5px]">
                <div
                    className="text-1xl font-bold whitespace-nowrap overflow-hidden max-w-[300px] text-ellipsis"
                    title={data.name || ''}
                >
                    {data.name}
                </div>
                <Breadcrumb items={items} size={16} type="link" separator="chevron" alignment="right" />
            </div>

            {/* Разпределение на видеото и списъка */}
            <div className="flex mt-6 space-x-6">
                {/* Лява страна - YouTube видео */}
                <div className="w-1/2">
                    <YouTubePlayer youtubeVideoId={data.youtubeVideoId} />
                    <ul className="space-y-3 text-sm text-gray-700 mt-3 bg-white p-2.5 border-2 rounded-[10px]">
                        <li className="flex items-center border-b pb-2">
                            <span className="text-gray-500 w-1/4">ID</span>
                            <span className="font-medium text-gray-900 ml-auto text-right min-w-[150px]">
                                {topicId}
                            </span>
                        </li>
                        <li className="flex items-center border-b pb-2">
                            <span className="text-gray-500 w-1/4">{t.form.name}</span>
                            <span className="font-medium text-gray-900 ml-auto text-right min-w-[150px]">
                                {data.name}
                            </span>
                        </li>
                        <li className="flex items-center border-b pb-2">
                            <span className="text-gray-500 w-1/4">YouTube ID</span>
                            <span className="font-medium text-gray-900 ml-auto text-right min-w-[150px] truncate" title={data.youtubeVideoId || ''}>
                                {data.youtubeVideoId}
                            </span>
                        </li>
                        <li className="flex items-center border-b pb-2">
                            <span className="text-gray-500 w-1/4">{t.topic.category}</span>
                            <span className="font-medium text-gray-900 ml-auto text-right min-w-[150px]">
                                {data.categoryKey}
                            </span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-gray-500 w-1/4">{t.topic.language}</span>
                            <span className="font-medium text-gray-900 ml-auto text-right min-w-[150px]">
                                {data.languageKey}
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Дясна страна - Списък с думи */}
                <div className="w-1/2 bg-gray-50 p-4 rounded-md shadow-inner">
                    <h3 className="text-lg font-semibold mb-4">{t.topic.words}</h3>
                    <p className="text-gray-500">{t.topic.noWordsFound}</p>
                </div>
            </div>
        </div>
    );
}