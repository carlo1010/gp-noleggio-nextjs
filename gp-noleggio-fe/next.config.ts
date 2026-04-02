import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    turbopack: {
        root: __dirname,
    },
};

export default withPayload(nextConfig);

