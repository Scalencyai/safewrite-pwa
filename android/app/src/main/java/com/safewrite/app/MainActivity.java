package com.safewrite.app;

import android.app.ActivityManager;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.PermissionRequest;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    
    private static final String PWA_URL = "https://scalencyai.github.io/safewrite-pwa/";
    
    private WebView webView;
    private boolean isKioskMode = false;
    private SimpleTTS simpleTTS;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Keep screen on
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        
        // Fullscreen
        setupFullscreen();
        
        // Initialize Simple TTS
        simpleTTS = new SimpleTTS(this);
        
        // Create WebView
        webView = new WebView(this);
        setContentView(webView);
        
        // Configure WebView
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        
        // Enable localStorage properly
        String databasePath = this.getApplicationContext().getDir("database", Context.MODE_PRIVATE).getPath();
        settings.setDatabasePath(databasePath);
        
        // Add JavaScript interfaces BEFORE loading URL
        webView.addJavascriptInterface(new KioskInterface(), "AndroidKiosk");
        webView.addJavascriptInterface(new AudioInterface(), "AndroidAudio");
        
        // Set WebViewClient
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                view.evaluateJavascript(
                    "console.log('AndroidAudio available:', typeof AndroidAudio !== 'undefined');",
                    null
                );
            }
        });
        
        // Set WebChromeClient for media permissions
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                runOnUiThread(() -> {
                    request.grant(request.getResources());
                });
            }
        });
        
        // Load PWA
        webView.loadUrl(PWA_URL);
        
        // Auto-start Lock Task Mode after 2 seconds
        webView.postDelayed(() -> {
            try {
                startLockTask();
                isKioskMode = true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }, 2000);
    }

    private void setupFullscreen() {
        View decorView = getWindow().getDecorView();
        int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
        decorView.setSystemUiVisibility(uiOptions);
    }

    // JavaScript Interface for Kiosk Mode Control
    public class KioskInterface {
        
        @JavascriptInterface
        public void startLockTask() {
            runOnUiThread(() -> {
                try {
                    MainActivity.this.startLockTask();
                    isKioskMode = true;
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        }

        @JavascriptInterface
        public void stopLockTask() {
            runOnUiThread(() -> {
                try {
                    if (isKioskMode) {
                        MainActivity.this.stopLockTask();
                        isKioskMode = false;
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        }

        @JavascriptInterface
        public boolean isInKioskMode() {
            ActivityManager am = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
            return am != null && am.getLockTaskModeState() != ActivityManager.LOCK_TASK_MODE_NONE;
        }
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack() && !isKioskMode) {
            webView.goBack();
        } else if (!isKioskMode) {
            super.onBackPressed();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        setupFullscreen();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            setupFullscreen();
        }
    }
    
    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (simpleTTS != null) {
            simpleTTS.shutdown();
        }
    }
    
    // JavaScript Interface for Audio (Native TTS)
    public class AudioInterface {
        
        @JavascriptInterface
        public void speak(String text) {
            android.util.Log.d("AudioInterface", "speak() called with: " + text);
            if (simpleTTS != null) {
                simpleTTS.speak(text);
            } else {
                android.util.Log.e("AudioInterface", "simpleTTS is null!");
            }
        }
        
        @JavascriptInterface
        public boolean isAvailable() {
            boolean available = simpleTTS != null && simpleTTS.isReady();
            android.util.Log.d("AudioInterface", "isAvailable: " + available);
            return available;
        }
    }
}
