"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReadme = exports.getComment = exports.partition = exports.renderName = exports.classNames = exports.wbr = exports.inPath = void 0;
const typedoc_1 = require("typedoc");
function inPath(thisPage, toCheck) {
    while (toCheck) {
        if (toCheck.isProject())
            return false;
        if (thisPage === toCheck)
            return true;
        toCheck = toCheck.parent;
    }
    return false;
}
exports.inPath = inPath;
/**
 * Insert word break tags ``<wbr>`` into the given string.
 *
 * Breaks the given string at ``_``, ``-`` and capital letters.
 *
 * @param str The string that should be split.
 * @return The original string containing ``<wbr>`` tags where possible.
 */
function wbr(str) {
    // TODO surely there is a better way to do this, but I'm tired.
    const ret = [];
    const re = /[\s\S]*?(?:[^_-][_-](?=[^_-])|[^A-Z](?=[A-Z][^A-Z]))/g;
    let match;
    let i = 0;
    while ((match = re.exec(str))) {
        ret.push(match[0], typedoc_1.JSX.createElement("wbr", null));
        i += match[0].length;
    }
    ret.push(str.slice(i));
    return ret;
}
exports.wbr = wbr;
function classNames(names, extraCss) {
    const css = Object.keys(names)
        .filter((key) => names[key])
        .concat(extraCss || '')
        .join(' ')
        .trim()
        .replace(/\s+/g, ' ');
    return css.length ? css : undefined;
}
exports.classNames = classNames;
/**
 * Renders the reflection name with an additional `?` if optional.
 */
function renderName(refl) {
    if (!refl.name) {
        return typedoc_1.JSX.createElement("em", null, wbr(typedoc_1.ReflectionKind.singularString(refl.kind)));
    }
    if (refl.flags.isOptional) {
        return typedoc_1.JSX.createElement(typedoc_1.JSX.Fragment, null,
            wbr(refl.name),
            "?");
    }
    return wbr(refl.name);
}
exports.renderName = renderName;
function partition(iter, predicate) {
    const left = [];
    const right = [];
    for (const item of iter) {
        if (predicate(item)) {
            left.push(item);
        }
        else {
            right.push(item);
        }
    }
    return [left, right];
}
exports.partition = partition;
function getComment(model) {
    const comment = model.comment || model.signatures?.[0].comment;
    const summary = comment?.summary;
    if (!summary || !summary.length)
        return '';
    const content = [];
    for (const line of summary) {
        const lineText = line.text;
        content.push(lineText.trim());
    }
    const textContent = content.join(' ');
    const commentContent = textContent.split(/[\r\n]/)[0] ?? textContent;
    const parsedCommentContent = commentContent
        .replace(/\s,\s/g, ', ')
        .replace(/\s\./g, '.')
        .replace(/(:\s?)?```(tsx?)?$/, '')
        .replace(/^#\s*/, '')
        .replace(/^\[([^\]]+)$/, '$1');
    return parsedCommentContent
        ? typedoc_1.JSX.createElement('div', { class: 'menu-item-desc' }, parsedCommentContent)
        : '';
}
exports.getComment = getComment;
function getReadme(model) {
    const readme = model.readme?.[0]?.text.split(/(\r?\n)+/)[0].replace(/#+\s*/, '');
    return readme ? typedoc_1.JSX.createElement("div", { class: "menu-item-desc" }, readme) : '';
}
exports.getReadme = getReadme;
