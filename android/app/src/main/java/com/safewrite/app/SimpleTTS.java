package com.safewrite.app;

import android.content.Context;
import android.speech.tts.TextToSpeech;
import android.util.Log;
import java.util.Locale;

public class SimpleTTS {
    private static final String TAG = "SimpleTTS";
    private TextToSpeech tts;
    private boolean isReady = false;

    public SimpleTTS(Context context) {
        Log.d(TAG, "Initializing TTS...");
        tts = new TextToSpeech(context, status -> {
            if (status == TextToSpeech.SUCCESS) {
                Log.d(TAG, "TTS initialized successfully");
                
                // Try German first
                int langResult = tts.setLanguage(Locale.GERMAN);
                if (langResult == TextToSpeech.LANG_MISSING_DATA || 
                    langResult == TextToSpeech.LANG_NOT_SUPPORTED) {
                    Log.w(TAG, "German not available, using default");
                    tts.setLanguage(Locale.getDefault());
                }
                
                tts.setPitch(1.3f);
                tts.setSpeechRate(1.0f);
                isReady = true;
                Log.d(TAG, "TTS ready!");
                
                // Test speak
                speak("Bereit");
            } else {
                Log.e(TAG, "TTS initialization failed");
            }
        });
    }

    public void speak(String text) {
        if (!isReady || tts == null) {
            Log.w(TAG, "TTS not ready, can't speak: " + text);
            return;
        }
        
        Log.d(TAG, "Speaking: " + text);
        tts.stop();
        tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "utteranceId");
    }

    public boolean isReady() {
        return isReady;
    }

    public void shutdown() {
        if (tts != null) {
            Log.d(TAG, "Shutting down TTS");
            tts.stop();
            tts.shutdown();
        }
    }
}
