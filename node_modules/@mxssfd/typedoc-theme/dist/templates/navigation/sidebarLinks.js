"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sidebarLinks = void 0;
const typedoc_1 = require("typedoc");
function sidebarLinks(context) {
    const links = Object.entries(context.options.getValue('sidebarLinks'));
    if (!links.length)
        return null;
    console.log('ccccc', context);
    return (typedoc_1.JSX.createElement("nav", { id: "tsd-sidebar-links", class: "tsd-navigation" }, links.map(([label, url]) => (typedoc_1.JSX.createElement("a", { href: url, target: "_blank" }, label)))));
}
exports.sidebarLinks = sidebarLinks;
//# sourceMappingURL=sidebarLinks.js.map