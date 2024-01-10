export const emojiHydration = {
    keyMapping: {
        _id: "id",
        creator_id: "creatorId",
    },
    functions: {
        id: (emoji) => emoji._id,
        parent: (emoji) => emoji.parent,
        creatorId: (emoji) => emoji.creator_id,
        name: (emoji) => emoji.name,
        animated: (emoji) => emoji.animated || false,
        nsfw: (emoji) => emoji.nsfw || false,
    },
    initialHydration: () => ({}),
};
