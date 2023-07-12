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
import { cafeConfig } from "@lib/settings";

export const __cafe_mod_version = "1.0.0";

export default async () => {
    logger.log(`Cafe mod v${__cafe_mod_version}`);
    logger.log(`Use config\n${JSON.stringify(cafeConfig, null, 4)}`);

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
    if(cafeConfig.useProdDiscord) {
        showToast("You are using Discord", getAssetIDByName("ic_badge_staff"));
    }
    else {
        showToast("You are using Cafe", getAssetIDByName("ic_badge_staff"));
    }
}
