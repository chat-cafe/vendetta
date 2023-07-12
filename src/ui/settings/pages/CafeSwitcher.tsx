import { useProxy } from "@lib/storage";
import { BundleUpdaterManager } from "@lib/native";
import { ErrorBoundary } from "@ui/components";
import { Text } from "react-native";
import settings, { loaderConfig } from "@lib/settings";

export default function CafeSwitcher() {
    useProxy(settings);

    loaderConfig.useProdDiscord = !loaderConfig.useProdDiscord;
    BundleUpdaterManager.reload();

    return (
        <ErrorBoundary>
            <Text>Please wait...</Text>
        </ErrorBoundary>
    );
}