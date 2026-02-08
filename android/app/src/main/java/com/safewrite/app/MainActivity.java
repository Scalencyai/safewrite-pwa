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
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    
    private static final String PWA_URL = "http://10.40.1.107:8082";
    
    private WebView webView;
    private boolean isKioskMode = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Keep screen on
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        
        // Fullscreen
        setupFullscreen();
        
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
        settings.setMediaPlaybackRequiresUserGesture(false); // Allow autoplay audio
        
        // Add JavaScript interface for Kiosk control
        webView.addJavascriptInterface(new KioskInterface(), "AndroidKiosk");
        
        // Load PWA
        webView.setWebViewClient(new WebViewClient());
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
        // Disable back button in kiosk mode
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
}
