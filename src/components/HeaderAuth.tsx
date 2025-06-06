"use client";
import { useSession, signIn } from "next-auth/react";
import GoogleIcon from "./ui/icons/GoogleIcon";
import HeaderProfile from "./HeaderProfile";
import { useDynamicValue } from "@/contexts/DynamicValueContext";
import { Button, Modal, Spin } from "antd";
import { LogInIcon } from "lucide-react";
//import { useTranslations } from "@/hooks/useTranslations";

export default function HeaderAuth() {

    const { data: session, status } = useSession();
    //const {t} = useTranslations()

    const { values, setValue } = useDynamicValue()
    const showModal = () => {
        setValue('openLoginForm', true);
    };

    const handleCancel = () => {
        setValue('openLoginForm', false);
    };

    if (status === "loading") return <div className="pr-[5px]"><Spin spinning={true} /></div>;
    return (
        <>
            {session ? (
                <HeaderProfile />
            ) : (
                <div className="">
                    <Button onClick={showModal}><LogInIcon size={16} /> {'logIn'}</Button>
                </div>
            )}

            <Modal
                title={<div className="text-center">{`Login`}</div>}
                open={values.openLoginForm}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="text-center pt-[30px] pb-[30px]">
                    <Button style={{ height: '40px' }} onClick={() => signIn('google')}><GoogleIcon />{'gog'}</Button>
                </div>
            </Modal>
        </>
    );
}