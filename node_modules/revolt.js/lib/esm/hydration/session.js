export const sessionHydration = {
    keyMapping: {
        _id: "id",
    },
    functions: {
        id: (server) => server._id,
        name: (server) => server.name,
    },
    initialHydration: () => ({}),
};
