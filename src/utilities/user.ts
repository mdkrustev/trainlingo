// app/api/user/route.ts

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

const getUser = async () => {

    const session = await getServerSession();
    if (session?.user.email) {
        const user = await prisma.user.findUnique({
            where: { email: session?.user.email }
        });
        return user
    }
    return null;

}

export default getUser;