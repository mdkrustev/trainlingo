"use client";
import { useSession, signIn } from "next-auth/react";
import { useTranslationContext } from "@/i18n/TranslationContext";
import GoogleIcon from "./ui/icons/GoogleIcon";
import HeaderProfile from "./HeaderProfile";
import { useDynamicValue } from "@/contexts/DynamicValueContext";
import { Button, Modal, Spin } from "antd";

export default function HeaderAuth() {

    const { data: session, status } = useSession();
    const { t } = useTranslationContext()
    const { values, setValue } = useDynamicValue()
    const showModal = () => {
        setValue('openLoginForm', true);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setValue('openLoginForm', false);
    };

    if (status === "loading") return <div className="p-[5px]"><Spin spinning={true} /></div>;
    return (
        <>
            {session ? (
                <HeaderProfile />
            ) : (
                <div className="">
                    <Button onClick={showModal}>{t('logIn')}</Button>
                </div>
            )}

            <Modal
                title={<div className="text-center">{`${t('appTitle')} - ${t('logIn')}`}</div>}
                open={values.openLoginForm}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="text-center pt-[30px] pb-[30px]">
                    <Button style={{ height: '40px' }} onClick={() => signIn('google')}><GoogleIcon />{t('logInGoogle')}</Button>
                </div>
            </Modal>
        </>
    );
}