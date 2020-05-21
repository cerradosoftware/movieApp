package com.moviesapp.MoviesRest;

import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;



import java.util.Map;
import java.util.HashMap;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MoviesRestModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    MoviesRestModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void makeRequest(String endpoint, Promise promise) {
        try{
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url(endpoint)
                    .build();
            Response response = client.newCall(request).execute();
            promise.resolve(response.body().string());
        }
        catch (Exception e){
            promise.reject(e);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "MoviesRest";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        return constants;
    }
}
