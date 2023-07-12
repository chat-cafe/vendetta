import { useProxy } from "@lib/storage";
import { BundleUpdaterManager } from "@lib/native";
import settings, { cafeConfig } from "@lib/settings";
import { ErrorBoundary } from "@ui/components";

export default function CafeSwitcher() {
    useProxy(settings);

    cafeConfig.useProdDiscord = !cafeConfig.useProdDiscord;
    BundleUpdaterManager.reload();

    return (
        <ErrorBoundary>
        </ErrorBoundary>
    );
}