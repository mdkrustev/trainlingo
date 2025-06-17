"use client";

import ProtectedRoute from "@/contexts/ProtectedRoute";
import { useTranslations } from "@/hooks/useTranslations";
import { HomeIcon, PlusCircleIcon } from "lucide-react";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/BreadCrumb";
import CustomButton from "@/components/ui/CustomButton";
import ClientModalForm, { NotificationType } from "@/components/ui/ClientModalForm";
import { useEffect, useState } from "react";
import { notification, Pagination } from "antd";
import { Topic } from "@prisma/client";
import YouTubeThumbnail from "@/components/youtube/YouTubeThumbnail";
import { useSearchParams, useRouter } from "next/navigation";


export const dynamic = 'force-static';

// --- Hook за ръчно управление на пагинирана заявка ---
const useManualPaginatedRequest = <T,>(
    url: string,
    pageSize: number
): {
    data: T[];
    pageCount: number;
    loading: boolean;
    refresh: (page: number) => void;
} => {
    const [data, setData] = useState<T[]>([]);
    const [pageCount, setPageCount] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const refresh = async (page: number) => {
        setLoading(true);
        try {
            const res = await fetch(`${url}?page=${page}&limit=${pageSize}`);
            const result = await res.json();
            if (res.ok) {
                setData(result.data || []);
                setPageCount(result.pageCount || Math.ceil((result.total || 0) / pageSize));
            } else {
                setData([]);
                setPageCount(1);
            }
        } catch (error) {
            console.error('Error fetching paginated data:', error);
            setData([]);
            setPageCount(1);
        } finally {
            setLoading(false);
        }
    };

    return { data, pageCount, loading, refresh };
};

// --- Основен компонент ---
export default function Topics() {
    const searchParams = useSearchParams();
    const pageString = searchParams.get('page');
    const router = useRouter();
    const { t, locale } = useTranslations();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [page, setPage] = useState<number | null>(null); // null до готовност
    const [isReady, setIsReady] = useState<boolean>(false);

    const pageSize = 10;

    const items: BreadcrumbItem[] = [
        ['/', t.navi.home, <HomeIcon key="home_ico" size={16} />],
        t.navi.topics
    ];

    const fields = {
        name: {
            label: t.form.name,
            type: 'text',
            required: true,
            value: '',
        },
        categoryKey: {
            label: t.form.category,
            required: true,
            data: (Object.keys(t.categories) as Array<keyof typeof t.categories>).map((key) => ({
                label: t.categories[key],
                value: key,
            })),
            value: '',
        },
        languageKey: {
            label: t.lng,
            required: true,
            data: (Object.keys(t.lg) as Array<keyof typeof t.lg>).map((key) => ({
                label: t.lg[key],
                value: key,
            })),
            value: '',
        },
        youtubeVideoId: {
            label: t.youtubeVideoId,
            type: 'text',
            required: true,
            value: '',
        },
    };

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message: string, description?: string) => {
        api[type]({
            message,
            description
        });
    };

    // --- Ръчно управляема заявка ---
    const { data, pageCount, refresh } = useManualPaginatedRequest<Topic>(
        '/api/topics',
        pageSize
    );

    // --- Инициализация на page при монтиране ---
    useEffect(() => {
        const newPage = pageString ? parseInt(pageString) : 1;
        if (!isNaN(newPage)) {
            setPage(newPage);
            setIsReady(true);
            refresh(newPage);
        }
    }, [pageString, refresh]);

    // --- Обновяване при промяна на page ---
    useEffect(() => {
        if (isReady && page) {
            refresh(page);
        }
    }, [isReady, page, refresh]);

    // --- Обновяване на URL при промяна на страницата ---
    const handlePageChange = (newPage: number) => {
        try {
            const url = new URL(window.location.href);
            url.searchParams.set('page', newPage.toString());
            window.history.pushState({}, '', url.toString());
            setPage(newPage);
        } catch (e) {
            console.error("Failed to update URL with new page", e);
        }
    };

    if (!isReady) {
        return null; // или покажи loader
    }


    return (
        <ProtectedRoute>
            {contextHolder}
            <div className="w-[80%] m-auto">
                <div className="flex justify-between border-b items-center pb-[5px]">
                    <div className="text-1xl font-bold">{t.navi.topics}</div>
                    <Breadcrumb items={items} size={16} type="link" separator="chevron" alignment="right" />
                </div>

                <div className="flex justify-end">
                    <CustomButton
                        onClick={() => setModalOpen(true)}
                        className="cursor-pointer mt-2.5"
                        size={14}
                        icon={<PlusCircleIcon />}
                        type="success"
                    >
                        {t.action.addItem}
                    </CustomButton>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-2.5">
                    {data.map((topic) => (
                        <div
                            key={topic.id}
                            className="flex flex-col items-center text-center bg-white shadow-md transition-transform hover:scale-105"
                        >
                            <YouTubeThumbnail
                                youtubeVideoId={topic.youtubeVideoId}
                                className="rounded-lg w-full"
                                onClick={() => { router.push(`/${locale}/topics/${topic.id}`) }}
                            />
                            <p className="mt-2 text-sm font-bold text-gray-700 truncate w-full p-2">
                                {topic.name}
                            </p>
                        </div>
                    ))}
                </div>



                {pageCount > 1 &&
                    <div className="mt-6 flex justify-center">
                        <Pagination
                            current={page!}
                            pageSize={pageSize}
                            total={pageCount * pageSize}
                            onChange={handlePageChange}
                            className="custom-pagination"
                        />
                    </div>
                }
            </div>

            <ClientModalForm
                title={t.title.newTopic}
                onClose={() => setModalOpen(false)}
                type="window"
                url="/api/topics/new"
                fields={fields}
                open={modalOpen}
                openNotificationWithIcon={openNotificationWithIcon}
            />
        </ProtectedRoute>
    );
}