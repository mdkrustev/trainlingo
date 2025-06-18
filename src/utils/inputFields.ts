import { useTranslations } from "@/hooks/useTranslations";

export function useInputFields() {

    const {t} = useTranslations()

    const addTopicFields = {
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
    return { addTopicFields }

}
