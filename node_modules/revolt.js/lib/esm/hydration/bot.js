export const botHydration = {
    keyMapping: {
        _id: "id",
        owner: "ownerId",
        interactions_url: "interactionsUrl",
        terms_of_service_url: "termsOfServiceUrl",
        privacy_policy_url: "privacyPolicyUrl",
    },
    functions: {
        id: (bot) => bot._id,
        ownerId: (bot) => bot.owner,
        token: (bot) => bot.token,
        public: (bot) => bot.public,
        analytics: (bot) => bot.analytics,
        discoverable: (bot) => bot.discoverable,
        interactionsUrl: (bot) => bot.interactions_url,
        termsOfServiceUrl: (bot) => bot.terms_of_service_url,
        privacyPolicyUrl: (bot) => bot.privacy_policy_url,
        flags: (bot) => bot.flags,
    },
    initialHydration: () => ({}),
};
/**
 * Flags attributed to users
 */
export var BotFlags;
(function (BotFlags) {
})(BotFlags || (BotFlags = {}));
