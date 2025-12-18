'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { useState } from 'react';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    );
}
