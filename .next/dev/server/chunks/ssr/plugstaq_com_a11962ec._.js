module.exports = [
"[project]/plugstaq.com/app/dashboard/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00ec0e8ebd35aa909e6927a0d95217c809a8db290e":"refreshMetrics"},"",""] */ __turbopack_context__.s([
    "refreshMetrics",
    ()=>refreshMetrics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$plugstaq$2e$com$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/plugstaq.com/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$plugstaq$2e$com$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/plugstaq.com/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$plugstaq$2e$com$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/plugstaq.com/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$plugstaq$2e$com$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/plugstaq.com/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function refreshMetrics() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$plugstaq$2e$com$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // fetch latest metrics from database
    const { data: metrics, error } = await supabase.from('metrics').select('*').order('id', {
        ascending: true
    });
    if (error) {
        return {
            error: error.message,
            data: null
        };
    }
    // revalidate the dashboard page to ensure fresh data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$plugstaq$2e$com$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard');
    return {
        error: null,
        data: metrics
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$plugstaq$2e$com$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    refreshMetrics
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$plugstaq$2e$com$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(refreshMetrics, "00ec0e8ebd35aa909e6927a0d95217c809a8db290e", null);
}),
"[project]/plugstaq.com/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/plugstaq.com/app/dashboard/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$plugstaq$2e$com$2f$app$2f$dashboard$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/plugstaq.com/app/dashboard/actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/plugstaq.com/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/plugstaq.com/app/dashboard/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00ec0e8ebd35aa909e6927a0d95217c809a8db290e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$plugstaq$2e$com$2f$app$2f$dashboard$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshMetrics"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$plugstaq$2e$com$2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$plugstaq$2e$com$2f$app$2f$dashboard$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/plugstaq.com/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/plugstaq.com/app/dashboard/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$plugstaq$2e$com$2f$app$2f$dashboard$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/plugstaq.com/app/dashboard/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=plugstaq_com_a11962ec._.js.map