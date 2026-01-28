// ✅ 保存原始 btoa（关键）
const originalBtoa = window.btoa;

// ✅ 中文安全 Base64
function base64EncodeUnicode(str) {
    return originalBtoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (_, p1) {
            return String.fromCharCode('0x' + p1);
        })
    );
}

// ❌ 不要再全局替换 btoa
// window.btoa = base64EncodeUnicode;   ← 删除这行

// 如果某处需要支持中文，请改用：base64EncodeUnicode()

// 页面加载提示
window.onload = function () {
    console.log("页面已安全加载（支持中文注册）");
};

// 恢复按钮
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
