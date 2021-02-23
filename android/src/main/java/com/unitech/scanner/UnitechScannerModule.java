package com.unitech.scanner;

import android.device.ScanManager;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
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
    public void getScannerState(Promise promise) {
      try {
        boolean result = scannerManager.getScannerState();
        promise.resolve(result);
      } catch (RuntimeException ex) {
        promise.resolve(false);
      }
    }

    @ReactMethod
    public void openScanner(Promise promise) {
      try {
        boolean result = scannerManager.openScanner();
        promise.resolve(result);
      } catch (RuntimeException ex) {
        promise.resolve(false);
      }
    }

    @ReactMethod
    public void closeScanner(Promise promise) {
      try {
        boolean result = scannerManager.closeScanner();
        promise.resolve(result);
      } catch (RuntimeException ex) {
        promise.resolve(false);
      }
    }

    @ReactMethod
    public void startDecode(Promise promise) {
      try {
        boolean result = scannerManager.startDecode();
        promise.resolve(result);
      } catch (RuntimeException ex) {
        promise.resolve(false);
      }
    }

    @ReactMethod
    public void stopDecode(Promise promise) {
      try {
        boolean result = scannerManager.stopDecode();
        promise.resolve(result);
      } catch (RuntimeException ex) {
        promise.resolve(false);
      }
    }

    @ReactMethod
    public void getTriggerLockState(Promise promise) {
      try {
        boolean result = scannerManager.getTriggerLockState();
        promise.resolve(result);
      } catch (RuntimeException ex) {
        promise.resolve(false);
      }
    }

    @ReactMethod
    public void lockTrigger(Promise promise) {
      try {
        boolean result = scannerManager.lockTrigger();
        promise.resolve(result);
      } catch (RuntimeException ex) {
        promise.resolve(false);
      }
    }

    @ReactMethod
    public void unlockTrigger(Promise promise) {
      try {
        boolean result = scannerManager.unlockTrigger();
        promise.resolve(result);
      } catch (RuntimeException ex) {
        promise.resolve(false);
      }
    }
}
