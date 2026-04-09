import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // Disabilitiamo Turbopack perché causa loop di caricamento e 404 con Payload 3 Admin UI
};

export default withPayload(nextConfig);
