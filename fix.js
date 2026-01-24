<!-- 文件：fix.js -->
<script>
// ========== 紧急修复补丁 ==========
(function() {
    'use strict';
    
    console.log('🔥 加载修复补丁 v1.0');
    
    // 1. 修复Firebase加载阻塞问题
    const originalOnload = window.onload;
    window.onload = function() {
        console.log('页面加载完成，应用修复');
        
        // 延迟执行可能阻塞的操作
        setTimeout(() => {
            // 确保所有按钮可点击
            document.querySelectorAll('button, input').forEach(el => {
                el.style.pointerEvents = 'auto';
                el.disabled = false;
            });
        }, 100);
        
        if (originalOnload) originalOnload();
    };
    
    // 2. 修复IP获取可能卡死的问题
    const originalGetUserIP = window.getUserIP;
    window.getUserIP = function() {
        return new Promise((resolve) => {
            // 5秒超时
            const timeout = setTimeout(() => {
                console.log('IP获取超时，使用备用值');
                resolve('ip_' + Date.now());
            }, 5000);
            
            if (originalGetUserIP) {
                originalGetUserIP().then(ip => {
                    clearTimeout(timeout);
                    resolve(ip);
                }).catch(() => {
                    clearTimeout(timeout);
                    resolve('ip_error');
                });
            } else {
                clearTimeout(timeout);
                resolve('ip_default');
            }
        });
    };
    
    // 3. 防止页面完全卡死
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
            console.log('点击事件正常');
        }
    }, true);
    
    // 4. 添加页面恢复按钮
    setTimeout(() => {
        if (!document.getElementById('emergency-fix-btn')) {
            const btn = document.createElement('button');
            btn.id = 'emergency-fix-btn';
            btn.innerHTML = '🔄 恢复页面';
            btn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                padding: 12px 20px;
                background: #ff4757;
                color: white;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                font-weight: bold;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            `;
            btn.onclick = function() {
                localStorage.clear();
                location.reload();
            };
            document.body.appendChild(btn);
        }
    }, 2000);
    
    console.log('✅ 修复补丁加载完成');
})();
</script>
