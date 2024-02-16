export default function get_fingerprint() {
    var fingerprint = [];
    //用户代理
    fingerprint.push({
        key: "user_agent",
        value: navigator.userAgent
    });
    //语言
    fingerprint.push({
        key: "language",
        value: navigator.language
    });
    //设备像素比：物理像素和设备独立像素的比例
    fingerprint.push({
        key: "pixel_ratio",
        value: window.devicePixelRatio
    });
    //硬件并发数，即：几核CPU
    fingerprint.push({
        key: "hardware_concurrency",
        value: navigator.hardwareConcurrency
    });
    //屏幕的宽度、高度
    fingerprint.push({
        key: "resolution",
        value: [screen.width, screen.height]
    });
    //屏幕分辨率的高、宽
    fingerprint.push({
        key: "available_resolution",
        value: [screen.availHeight, screen.availWidth]
    });
    //格林威治时间与本地时间的差值，单位是分钟
    fingerprint.push({
        key: "timezone_offset",
        value: new Date()
            .getTimezoneOffset()
    });
    //本地存储支持度识别，例：window.openDatabase被IE、Google Chrome支持、但FireFox不支持
    fingerprint.push({
        key: "session_storage",
        value: !window.sessionStorage
    });
    fingerprint.push({
        key: "local_storage",
        value: !window.localStorage
    });
    fingerprint.push({
        key: "indexed_db",
        value: !window.indexedDB
    });
    fingerprint.push({
        key: "open_database",
        value: !window.openDatabase
    });
    //系统平台类型，如:win32
    fingerprint.push({
        key: "navigator_platform",
        value: navigator.platform
    });
    //系统类型及版，如：Windows NT 10.0; Win64; x64
    fingerprint.push({
        key: "navigator_oscpu",
        value: navigator.oscpu
    });
    //浏览器是否开启隐私保护
    fingerprint.push({
        key: "do_not_track",
        value: navigator.doNotTrack
    });
    //屏幕是否支持触摸
    fingerprint.push({
        key: "touch_support",
        value: navigator.maxTouchPoints
    });
    //浏览器插件
    for (let i = 0; i < navigator.plugins.length; i++) {
        fingerprint.push({
            key: "navigator_plugin_" + i,
            value: navigator.plugins[i].name
        });
    }
    //是否支持cookie
    fingerprint.push({
        key: "cookie_enabled",
        value: navigator.cookieEnabled
    });
    // 简化指纹
    var short_fingerprint = "";
    for (let j = 0; j < fingerprint.length; j++) {
        short_fingerprint += String(fingerprint[j].value)
            .toLowerCase()
            .substring(0, 1);
    }
    short_fingerprint += fingerprint.length;
    short_fingerprint += navigator.plugins.length;
    return short_fingerprint;
}
