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
import { cafeConfig, loaderConfig } from "@lib/settings";

export const __cafe_mod_version = "1.0.0";

export default async () => {
    cafe_logger.log(`Cafe mod v${__cafe_mod_version}`);

    // Idk why this happens.
    if(cafeConfig.useProdDiscord === undefined) {
        cafeConfig.useProdDiscord = false;
        cafe_logger.warn("cafeConfig.useProdDiscord is undefined!? set to false");
        cafe_logger.log(`Use loader config\n${JSON.stringify(loaderConfig, null, 4)}`);
    }

    cafe_logger.log(`Use config\n${JSON.stringify(cafeConfig, null, 4)}`);

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
    if(cafeConfig.useProdDiscord) {
        showToast("You are using Discord", getAssetIDByName("ic_badge_staff"));
    }
    else {
        showToast("You are using Cafe", getAssetIDByName("ic_badge_staff"));
    }
}
