"use client";

import ProtectedRoute from "@/contexts/ProtectedRoute";
import { useTranslations } from "@/hooks/useTranslations";
import { HomeIcon, PlusCircleIcon } from "lucide-react";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/BreadCrumb";
import CustomButton from "@/components/ui/CustomButton";
import ClientModalForm, { NotificationType } from "@/components/ui/ClientModalForm";
import { useState } from "react";
import { notification, Pagination } from "antd";
import { Topic } from "@prisma/client";
import YouTubeThumbnail from "@/components/youtube/YouTubeThumbnail";
import { usePaginatedRequest } from "@/hooks/usePaginatedRequest";
import { useInputFields } from "@/utils/inputFields";
import Link from "next/link";
export const dynamic = 'force-static';



// --- Основен компонент ---
export default function Topics() {
    const { t, linkTo } = useTranslations();
    const { addTopicFields } = useInputFields();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const items: BreadcrumbItem[] = [
        ['/', t.navi.home, <HomeIcon key="home_ico" size={16} />],
        t.navi.topics
    ];

    const { data, page, totalCount, pageSize, onPageChange, refresh } = usePaginatedRequest<Topic>('/api/topics')

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message: string, description?: string) => {
        api[type]({
            message,
            description
        });
    };

 

    return (
        <ProtectedRoute>
            {contextHolder}
            <ClientModalForm
                title={t.title.newTopic}
                onClose={() => {setModalOpen(false); refresh()}}
                type="window"
                url="/api/topics/new"
                fields={addTopicFields}
                open={modalOpen}
                openNotificationWithIcon={openNotificationWithIcon}
            />

            <div className="w-[80%] m-auto">
                <div className="flex justify-between border-b items-center pb-[5px]">
                    <div className="text-1xl font-bold">{t.navi.topics}</div>
                    <Breadcrumb items={items} size={16} type="link" separator="chevron" alignment="right" />
                </div>

                <div className="flex justify-end">
                    <CustomButton onClick={() => setModalOpen(true)} className="cursor-pointer mt-2.5" size={14} icon={<PlusCircleIcon />} type="success">
                        {t.action.addItem}
                    </CustomButton>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-2.5">
                    {data.map((topic) => (
                        <Link href={linkTo(`/topics/${topic.id}`)} key={topic.id} className="flex flex-col items-center text-center bg-white shadow-md transition-transform rounded-[8px] overflow-hidden">
                            <YouTubeThumbnail youtubeVideoId={topic.youtubeVideoId} className="w-full" />
                            <p className="mt-2 text-sm font-bold text-gray-700 truncate w-full p-2">{topic.name}</p>
                        </Link>
                    ))}
                </div>
                {pageSize < totalCount && (
                    <div className="mt-6 flex justify-center">
                        <Pagination
                            current={page!}
                            pageSize={pageSize}
                            total={totalCount}
                            onChange={onPageChange}
                            className="custom-pagination"
                        />
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}