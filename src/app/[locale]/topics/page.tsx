"use client"

import ProtectedRoute from "@/contexts/ProtectedRoute";
import { useTranslations } from "@/hooks/useTranslations"
import { HomeIcon, PlusCircleIcon } from "lucide-react";
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/BreadCrumb';
import CustomButton from "@/components/ui/CustomButton";
import ClientModalForm, { NotificationType } from "@/components/ui/ClientModalForm";
import { useEffect, useState } from "react";
import { notification, Pagination } from "antd"

import { usePaginatedRequest } from "@/hooks/usePaginatedRequest"

import { Topic } from "@prisma/client";
import YouTubeThumbnail from "@/components/youtube/YouTubeThumbnail";

export default function Topics() {
    const { t } = useTranslations();
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const items: BreadcrumbItem[] = [
        ['/', t.navi.home, <HomeIcon key={'home_ico'} size={16} />],
        t.navi.topics
    ]

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

    const [page, setPage] = useState(1);
    const { data, pageCount, pageSize } = usePaginatedRequest<Topic>(
        '/api/topics',
        page,
        5
    );


    useEffect(() => {
        console.log(data)
    }, [data])

    const handleClick = (videoId: string | null) => {
        console.log("Кликнато видео:", videoId);
        // Можеш да добавиш допълнителна логика като navigate или modal
    };

    const handlePageChange = (page: number) => {
        setPage(page)
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
                    <CustomButton onClick={() => { setModalOpen(true) }} className="cursor-pointer mt-2.5" size={14} icon={<PlusCircleIcon />} type="success">
                    {t.action.addItem}
                </CustomButton>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-2.5">
                    {data.map((topic) => (
                        <div key={topic.id} className="flex flex-col items-center text-center bg-white shadow-md transition-transform hover:scale-102">
                            <YouTubeThumbnail
                                youtubeVideoId={topic.youtubeVideoId}
                                className="rounded-lg w-full"
                                onClick={() => handleClick(topic.youtubeVideoId)}
                            />
                            <p className="mt-2 text-sm font-bold text-gray-700 truncate w-full p-2">{topic.name}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-center">
                    <Pagination
                        current={page}
                        pageSize={pageSize}
                        total={pageCount * pageSize}
                        onChange={handlePageChange}
                        className="custom-pagination"
                    />
                </div>
            </div>
            <ClientModalForm title={t.title.newTopic} onClose={() => { setModalOpen(false) }} type="window" url="/api/topics/new" fields={fields} open={modalOpen} openNotificationWithIcon={openNotificationWithIcon} />
        </ProtectedRoute>
    )
}