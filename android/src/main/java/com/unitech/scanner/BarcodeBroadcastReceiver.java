package com.unitech.scanner;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.device.ScanManager;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class BarcodeBroadcastReceiver extends BroadcastReceiver {

    private static final String TAG = "UTBroadcastReceiver";
    private final ReactApplicationContext reactContext;

    BarcodeBroadcastReceiver(ReactApplicationContext reactContext){
      this.reactContext = reactContext;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        if (!intent.getAction().equals(ScanManager.ACTION_DECODE)) {
            return;
        }

        byte[] barcode = intent.getByteArrayExtra(ScanManager.DECODE_DATA_TAG);
        String barcodeString = intent.getStringExtra(ScanManager.BARCODE_STRING_TAG);
        int length = intent.getIntExtra(ScanManager.BARCODE_LENGTH_TAG,0);
        byte type = intent.getByteExtra(ScanManager.BARCODE_TYPE_TAG,(byte)0);

        Log.w(TAG, "onReceive barcode: " + barcode);
        Log.w(TAG, "onReceive barcode_string: " + barcodeString);
        Log.w(TAG, "onReceive length: " + length);
        Log.w(TAG, "onReceive barcodeType: " + type);

        android.device.scanner.configuration.Symbology.fromInt(type);

        WritableMap map = new WritableNativeMap();
        map.putString("barcodeString", barcodeString);
        map.putInt("length", length);
        map.putInt("type", type);
        sendEvent("scanner-barcode", map);
    }

    private void sendEvent(String eventName, WritableMap map) {
        try{
            //ReactContext reactContext = UnitechScannerModule.reactContext;
            this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, map);
        }
        catch(Exception e){
            Log.d(TAG,"Exception in sendEvent:" + e.toString());
        }
    }
}
