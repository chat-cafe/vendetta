import { ClientInfoManager } from "@lib/native";

// This logs in the native logging implementation, e.g. logcat
console.log("Hello from Vendetta!");

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

import(".").then((m) => m.default()).catch((e) => {
    console.log(e?.stack ?? e.toString());
    alert([
        "Failed to load Vendetta!\n",
        `Build Number: ${ClientInfoManager.Build}`,
        `Vendetta: ${__vendettaVersion}`,
        e?.stack || e.toString(),
    ].join("\n"));
});
