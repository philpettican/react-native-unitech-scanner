package com.unitech.scanner;

import android.content.IntentFilter;
import android.device.ScanManager;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;

public class ScannerManager {
  private ScanManager scanManager;
  private ReactApplicationContext reactContext;
  private static final String TAG = "UTScannerManager";
  private BarcodeBroadcastReceiver barcodeBroadcastReceiver;
  private IntentFilter intentFilter = new IntentFilter(ScanManager.ACTION_DECODE);

  private final LifecycleEventListener lifecycleEventListener = new LifecycleEventListener() {
    @Override
    public void onHostResume() {
      Log.d(TAG, "onHostResume");
      reactContext.registerReceiver(barcodeBroadcastReceiver, intentFilter);
    }

    @Override
    public void onHostPause() {
      Log.d(TAG, "onHostPause");
      reactContext.unregisterReceiver(barcodeBroadcastReceiver);
    }

    @Override
    public void onHostDestroy() {
      Log.d(TAG, "onHostDestroy");
      reactContext.unregisterReceiver(barcodeBroadcastReceiver);
    }
  };

  public ScannerManager(ReactApplicationContext reactContext) {
    this.reactContext = reactContext;
    this.scanManager = new ScanManager();
    this.barcodeBroadcastReceiver = new BarcodeBroadcastReceiver(reactContext);
    this.reactContext.registerReceiver(this.barcodeBroadcastReceiver, this.intentFilter);
    this.reactContext.addLifecycleEventListener(lifecycleEventListener);
  }

  public boolean openScanner() {
    boolean result = scanManager.openScanner();
    Log.d(TAG, "openScanner: " + result);
    return result;
  }

  public boolean closeScanner() {
    boolean result = scanManager.closeScanner();
    Log.d(TAG, "closeScanner: " + result);
    return result;
  }

  public boolean startDecode() {
    boolean result = scanManager.startDecode();
    Log.d(TAG, "startDecode: " + result);
    return result;
  }

  public boolean stopDecode() {
    boolean result = scanManager.stopDecode();
    Log.d(TAG, "stopDecode: " + result);
    return result;
  }
}
