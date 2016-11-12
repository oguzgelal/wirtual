// <meta http-equiv="X-UA-Compatible" content="IE=edge">
let metaXUACompatible = document.createElement('meta');
metaXUACompatible.httpEquiv = "X-UA-Compatible";
metaXUACompatible.content = "IE=edge";
document.getElementsByTagName('head')[0].appendChild(metaXUACompatible);

// <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
let metaContentType = document.createElement('meta');
metaContentType.httpEquiv = "Content-Type";
metaContentType.content = "text/html; charset=utf-8";
document.getElementsByTagName('head')[0].appendChild(metaContentType);

// <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=no">    
let metaViewport = document.createElement('meta');
metaViewport.name = "viewport";
metaViewport.content = "width=device-width, height=device-height, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=no";
document.getElementsByTagName('head')[0].appendChild(metaViewport);

// <meta name="mobile-web-app-capable" content="yes">    
let metaMobileWebAppCapable = document.createElement('meta');
metaMobileWebAppCapable.name = "mobile-web-app-capable";
metaMobileWebAppCapable.content = "yes";
document.getElementsByTagName('head')[0].appendChild(metaMobileWebAppCapable);

// <meta name="apple-mobile-web-app-capable" content="yes" />
let metaAppleMobileWebAppCapable = document.createElement('meta');
metaAppleMobileWebAppCapable.name = "apple-mobile-web-app-capable";
metaAppleMobileWebAppCapable.content = "yes";
document.getElementsByTagName('head')[0].appendChild(metaAppleMobileWebAppCapable);

// <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
let metaAppleStatusBarStyle = document.createElement('meta');
metaAppleStatusBarStyle.name = "apple-mobile-web-app-status-bar-style";
metaAppleStatusBarStyle.content = "black-translucent";
document.getElementsByTagName('head')[0].appendChild(metaAppleStatusBarStyle);  