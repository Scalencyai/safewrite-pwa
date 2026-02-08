package com.safewrite.app;

import android.content.Context;
import android.media.MediaPlayer;
import android.speech.tts.TextToSpeech;
import java.util.Locale;

public class AudioHelper {
    private TextToSpeech tts;
    private Context context;
    private boolean ttsReady = false;

    public AudioHelper(Context context) {
        this.context = context;
        initTTS();
    }

    private void initTTS() {
        tts = new TextToSpeech(context, status -> {
            if (status == TextToSpeech.SUCCESS) {
                int result = tts.setLanguage(Locale.GERMAN);
                if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                    tts.setLanguage(Locale.US); // Fallback to English
                }
                tts.setPitch(1.3f); // Higher for children
                tts.setSpeechRate(1.0f);
                ttsReady = true;
            }
        });
    }

    public void speak(String text) {
        if (ttsReady && tts != null) {
            tts.stop();
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, null);
        }
    }

    public void shutdown() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
    }
}
