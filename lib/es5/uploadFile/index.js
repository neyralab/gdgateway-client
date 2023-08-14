"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
var chunkFile_1 = require("../chunkFile");
var sendChunk_1 = require("../sendChunk");
var uploadFile = function (file, startTime, oneTimeToken, endpoint, dispatch, updateProgressCallback, getProgressFromLSCallback, setProgressToLSCallback, clearProgressCallback) { return __awaiter(void 0, void 0, void 0, function () {
    var arrayBuffer, chunks, result, _loop_1, _i, chunks_1, chunk, state_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, file.arrayBuffer()];
            case 1:
                arrayBuffer = _a.sent();
                chunks = (0, chunkFile_1.chunkFile)(arrayBuffer);
                _loop_1 = function (chunk) {
                    var currentIndex;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                currentIndex = chunks.findIndex(function (el) { return el === chunk; });
                                return [4 /*yield*/, (0, sendChunk_1.sendChunk)(chunk, currentIndex, chunks.length - 1, file, startTime, oneTimeToken, endpoint, null, null, dispatch, updateProgressCallback, getProgressFromLSCallback, setProgressToLSCallback)];
                            case 1:
                                result = _b.sent();
                                if (result === null || result === void 0 ? void 0 : result.failed) {
                                    clearProgressCallback();
                                    return [2 /*return*/, { value: void 0 }];
                                }
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, chunks_1 = chunks;
                _a.label = 2;
            case 2:
                if (!(_i < chunks_1.length)) return [3 /*break*/, 5];
                chunk = chunks_1[_i];
                return [5 /*yield**/, _loop_1(chunk)];
            case 3:
                state_1 = _a.sent();
                if (typeof state_1 === "object")
                    return [2 /*return*/, state_1.value];
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                clearProgressCallback();
                return [2 /*return*/, result];
        }
    });
}); };
exports.uploadFile = uploadFile;