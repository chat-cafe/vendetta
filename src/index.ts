import { patchLogHook } from "@lib/debug";
import { patchCommands } from "@lib/commands";
import { initPlugins } from "@lib/plugins";
import { patchChatBackground } from "@lib/themes";
import { getAssetIDByName, patchAssets } from "@ui/assets";
import initQuickInstall from "@ui/quickInstall";
import initSafeMode from "@ui/safeMode";
import initSettings from "@ui/settings";
import initFixes from "@lib/fixes";
import logger, { cafe_logger } from "@lib/logger";
import windowObject from "@lib/windowObject";
import { showToast } from "@ui/toasts";

export const __cafe_mod_version = "1.0.0";

export default async () => {
    cafe_logger.log(`Cafe mod v${__cafe_mod_version}`);

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
    cafe_logger.log("Cafe is ready too! :D");

    // Cafe watermark
    showToast("You are using Cafe", getAssetIDByName("ic_badge_staff"));
}
