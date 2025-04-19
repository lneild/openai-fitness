"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FitnessForm } from "./FitnessForm";

// Create a client
const queryClient = new QueryClient();

export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <FitnessForm />
        </QueryClientProvider>
    );
}
