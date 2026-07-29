import type { Auth } from '@/types/auth';
import type { Company } from '@/types/companies';

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            currentCompany: Company | null;
            companies: Company[];
            timezones: string[];
            currencies: { code: string; symbol: string }[];
            [key: string]: unknown;
        };
    }
}
