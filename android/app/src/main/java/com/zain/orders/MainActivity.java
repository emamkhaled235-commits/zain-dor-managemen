package com.zain.orders;
import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.net.Uri;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.CookieManager;
import android.view.View;
import android.graphics.Color;
import android.os.Build;

public class MainActivity extends Activity {
 private WebView web; private ValueCallback<Uri[]> fileCallback;
 private static final int FILE_REQUEST=1024;
 private static final String URL="https://emamkhaled235-commits.github.io/zain-dor-managemen/";
 @Override public void onCreate(Bundle state){super.onCreate(state);
  getWindow().setStatusBarColor(Color.rgb(18,15,18));getWindow().setNavigationBarColor(Color.rgb(18,15,18));
  web=new WebView(this);setContentView(web);
  WebSettings s=web.getSettings();s.setJavaScriptEnabled(true);s.setDomStorageEnabled(true);s.setAllowFileAccess(false);s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);s.setMediaPlaybackRequiresUserGesture(false);
  CookieManager.getInstance().setAcceptCookie(true);
  web.setWebViewClient(new WebViewClient(){@Override public boolean shouldOverrideUrlLoading(WebView view,android.webkit.WebResourceRequest request){Uri u=request.getUrl();if("https".equals(u.getScheme())&&"emamkhaled235-commits.github.io".equals(u.getHost()))return false;try{startActivity(new Intent(Intent.ACTION_VIEW,u));}catch(Exception ignored){}return true;}});
  web.setWebChromeClient(new WebChromeClient(){@Override public boolean onShowFileChooser(WebView view,ValueCallback<Uri[]> cb,FileChooserParams params){if(fileCallback!=null)fileCallback.onReceiveValue(null);fileCallback=cb;try{startActivityForResult(params.createIntent(),FILE_REQUEST);return true;}catch(Exception ex){fileCallback=null;return false;}}});
  if(state==null)web.loadUrl(URL);else web.restoreState(state);
 }
 @Override protected void onActivityResult(int request,int result,Intent data){super.onActivityResult(request,result,data);if(request==FILE_REQUEST&&fileCallback!=null){fileCallback.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(result,data));fileCallback=null;}}
 @Override protected void onSaveInstanceState(Bundle state){web.saveState(state);super.onSaveInstanceState(state);}
 @Override public void onBackPressed(){if(web!=null&&web.canGoBack())web.goBack();else super.onBackPressed();}
 @Override protected void onDestroy(){if(web!=null){web.destroy();web=null;}super.onDestroy();}
}