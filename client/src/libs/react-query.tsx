import {
    QueryClient as RCQueryClient,
    QueryClientProvider as RCQueryClientProvider,
} from '@tanstack/react-query'
import * as React from "react";

const queryClient = new RCQueryClient();

type Props = {
    children: React.ReactNode;
}
export const QueryClientProvider: React.FC<Props> = ({ children }) => {
    return <RCQueryClientProvider client={queryClient}>{children}</RCQueryClientProvider>
}
