"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIdsForEquality = void 0;
const checkIdsForEquality = (arr1, arr2) => arr1.sort().toString() === arr2.sort().toString();
exports.checkIdsForEquality = checkIdsForEquality;
