import { useProxy } from "@lib/storage";
import { BundleUpdaterManager } from "@lib/native";
import settings, { cafeConfig } from "@lib/settings";
import { ErrorBoundary } from "@ui/components";

export default function CafeSwitcher() {
    useProxy(settings);

    cafeConfig.useProdDiscord = !cafeConfig.useProdDiscord;
    setTimeout(() => {
        BundleUpdaterManager.reload();
    }, 500);

    return (
        <ErrorBoundary>
        </ErrorBoundary>
    );
}