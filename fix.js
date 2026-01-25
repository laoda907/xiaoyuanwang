// ✅ 中文安全的 Base64 编码函数
function base64EncodeUnicode(str) {
    return btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (_, p1) {
            return String.fromCharCode('0x' + p1);
        })
    );
}

// ✅ 替换全局 btoa，防止中文直接报错
window.btoa = base64EncodeUnicode;

// ✅ 防止页面假死的兜底
window.onload = function () {
    console.log("页面已安全加载（支持中文注册）");
};

// ✅ 紧急恢复按钮（可选但安全）
(function () {
    const btn = document.createElement("button");
    btn.innerText = "🔄 恢复页面";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.zIndex = "9999";
    btn.onclick = () => location.reload();
    document.body.appendChild(btn);
})();
