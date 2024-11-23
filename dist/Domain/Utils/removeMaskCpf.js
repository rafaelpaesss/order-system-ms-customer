"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMaskCpf = removeMaskCpf;
function removeMaskCpf(ObjCPF) {
    return ObjCPF.replace(/\D/g, '');
}
//# sourceMappingURL=removeMaskCpf.js.map