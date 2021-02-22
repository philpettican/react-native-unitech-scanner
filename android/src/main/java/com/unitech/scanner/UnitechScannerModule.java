package com.unitech.scanner;

import android.device.ScanManager;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class UnitechScannerModule extends ReactContextBaseJavaModule {

    private static final String REACT_CLASS = "UnitechScanner";
    public final ReactApplicationContext reactContext;
    private ScanManager _scanManager;
    private ScannerManager scannerManager;

    UnitechScannerModule(ReactApplicationContext reactContext) {
      super(reactContext);
      this.reactContext = reactContext;
      this.scannerManager = new ScannerManager(reactContext);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void openScanner(Callback callback) {
      boolean result = scannerManager.openScanner();
      callback.invoke(result);
    }

    @ReactMethod
    public void closeScanner(Callback callback) {
      boolean result = scannerManager.closeScanner();
      callback.invoke(result);
    }

    @ReactMethod
    public void startDecode(Callback callback) {
      boolean result = scannerManager.startDecode();
      callback.invoke(result);
    }

    @ReactMethod
    public void stopDecode(Callback callback) {
      boolean result = scannerManager.stopDecode();
      callback.invoke(result);
    }
}
