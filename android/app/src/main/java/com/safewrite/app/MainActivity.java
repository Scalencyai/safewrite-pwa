package com.safewrite.app;

import android.app.ActivityManager;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import androidx.appcompat.app.AppCompatActivity;
import com.google.androidbrowserhelper.trusted.TwaLauncher;

public class MainActivity extends AppCompatActivity {
    
    private static final String TWA_URL = "https://your-domain.com";
    // For local testing: "http://10.0.2.2:8080" (Android emulator)
    // or "http://YOUR_LOCAL_IP:8080" (physical device)
    
    private WebView webView;
    private boolean isKioskMode = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Keep screen on
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        
        // Fullscreen
        setupFullscreen();
        
        // Launch TWA
        TwaLauncher twaLauncher = new TwaLauncher(this);
        twaLauncher.launch(
            getTwaBuilder()
                .setUrl(TWA_URL)
                .build(),
            null
        );
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
                    startLockTask();
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
                        stopLockTask();
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
        if (!isKioskMode) {
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

    private TwaLauncher.Builder getTwaBuilder() {
        return new TwaLauncher.Builder(this)
            .setLaunchMode(TwaLauncher.CCT_LAUNCH_MODE_TRUSTED_WEB_ACTIVITY);
    }
}
