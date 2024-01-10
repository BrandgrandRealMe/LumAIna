import { ReactiveSet } from "@solid-primitives/set";
export const channelUnreadHydration = {
    keyMapping: {
        _id: "id",
        last_id: "lastMessageId",
        mentions: "messageMentionIds",
    },
    functions: {
        id: (unread) => unread._id.channel,
        lastMessageId: (unread) => unread.last_id,
        messageMentionIds: (unread) => new ReactiveSet(unread.mentions),
    },
    initialHydration: () => ({
        messageMentionIds: new ReactiveSet(),
    }),
};
