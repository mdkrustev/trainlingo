import { DynamicValueKey } from "@/contexts/DynamicValueContext";

export type MenuItem = {
    label: string;
    href?: string;
    icon?: string;
    func?: DynamicValueKey
    roles?: string[];
    children?: Omit<MenuItem, 'children'>[];
};

export const menuStructure: MenuItem[] = [
    {
        label: 'start',
        href: '/start',
        icon: 'HomeIcon'
    },
    /*
    {
      label: 'projects',
      href: '/projects',
      icon: 'BriefcaseIcon',
      children: [
        { label: 'newProject', href: '/projects/new', roles: ['client'] }
      ]
    },*/
    {
        label: 'workTypes',
        href: '/work-types',
        icon: 'HardHatIcon',
        children: [
            {
                label: 'newWorkType',
                icon: 'PlusIcon',
                func: 'openAddWorkTypeForm',
                roles: ['admin']
            }
        ]
    },
    {
        label: 'users',
        href: '/users',
        icon: 'UsersIcon',
        roles: ['admin']
    }
];