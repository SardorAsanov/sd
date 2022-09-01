const mineflayer = require('mineflayer')
const bot = mineflayer.createBot({
    host: "ir.skyblock.uz",
    port: 25566,
    username: 'WE_77',
})

bot.once("spawn", () => {
    bot.chat("/l kotlarr");
});
async function dig() {
    if (!bot.heldItem || !bot.heldItem.name.includes('pickaxe')) {
        var pickaxe = bot.inventory.items().filter(i => i.name.includes('pickaxe'))[0];
        if (pickaxe) await bot.equip(pickaxe, 'hand')
        if (!pickaxe) bot.quit(); // TMP : QUIT IF NO PICKAXES.
    }
    var block = bot.blockAtCursor(6);
    if (!block) return setTimeout(function() {
        dig();
    }, 100);
    await bot.dig(block, 'ignore', 'raycast') // 2nd param: true to 'snap at block' or 'ignore' to just not turn head
    dig()
}

bot.on('chat', (username, message) => {
    if (username === 'FELIX_717') {
        if (message.indexOf('#') !== -1) {
            var replacement = "#",
                toReplace = "",
                str = message

            str = str.replace(replacement, toReplace)
            bot.chat(str)
        }
    }
})
bot.on('chat', async(username, message) => {
    if (username == 'FELIX_717')
        switch (message) {
            case 'loaded':
                await bot.waitForChunksToLoad()
                bot.chat('Ready!')
                break
            case 'WE_77':
                dig()
                break

        }
})