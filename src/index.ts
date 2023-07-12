import { patchLogHook } from "@lib/debug";
import { patchCommands } from "@lib/commands";
import { initPlugins } from "@lib/plugins";
import { patchChatBackground } from "@lib/themes";
import { getAssetIDByName, patchAssets } from "@ui/assets";
import initQuickInstall from "@ui/quickInstall";
import initSafeMode from "@ui/safeMode";
import initSettings from "@ui/settings";
import initFixes from "@lib/fixes";
import logger from "@lib/logger";
import windowObject from "@lib/windowObject";
import { showToast } from "@ui/toasts";
import { BundleUpdaterManager } from "@lib/native";

export const __cafe_mod_version = "1.0.0";
export let global_env_patched = false;

export default async () => {
    logger.log(`Cafe mod v${__cafe_mod_version}`);

    // Override global env
    if(!global_env_patched) {
        BundleUpdaterManager.reload()
        window.GLOBAL_ENV = {
            "API_ENDPOINT": "//cafe.jb0s.dev/api",
            "API_VERSION": 9,
            "GATEWAY_ENDPOINT": "wss://cafe.jb0s.dev/gateway",
            "WEBAPP_ENDPOINT": "//cafe.jb0s.dev",
            "CDN_HOST": "cafe.jb0s.dev",
            "ASSET_ENDPOINT": "//canary.discord.com",
            "MEDIA_PROXY_ENDPOINT": "//media.discordapp.net",
            "WIDGET_ENDPOINT": "//cafe.jb0s.dev/widget",
            "INVITE_HOST": "discord.gg",
            "GUILD_TEMPLATE_HOST": "discord.new",
            "GIFT_CODE_HOST": "discord.gift",
            "RELEASE_CHANNEL": "cafe",
            "MARKETING_ENDPOINT": "//cafe.jb0s.dev",
            "BRAINTREE_KEY": null,
            "STRIPE_KEY": null,
            "NETWORKING_ENDPOINT": "//router.discordapp.net",
            "RTC_LATENCY_ENDPOINT": "//latency.discord.media/rtc",
            "ACTIVITY_APPLICATION_HOST": "discordsays.com",
            "PROJECT_ENV": "production",
            "REMOTE_AUTH_ENDPOINT": "//remote-auth-gateway.discord.gg",
            "SENTRY_TAGS": null,
            "MIGRATION_SOURCE_ORIGIN": "https://canary.discordapp.com",
            "MIGRATION_DESTINATION_ORIGIN": "https://cafe.jb0s.dev",
            "HTML_TIMESTAMP": 1688857866123,
            "ALGOLIA_KEY": null,
            "PUBLIC_PATH": "/assets/"
        };

        global_env_patched = true;
    }

    // Load everything in parallel
    const unloads = await Promise.all([
        patchLogHook(),
        patchAssets(),
        patchCommands(),
        patchChatBackground(),
        initFixes(),
        initSafeMode(),
        initSettings(),
        initQuickInstall(),
    ]);

    // Assign window object
    window.vendetta = await windowObject(unloads);

    // Once done, load plugins
    unloads.push(await initPlugins());

    // We good :)
    logger.log("Vendetta is ready!");

    // Cafe watermark
    showToast("You are using Cafe", getAssetIDByName("coffee@3x"));
}
