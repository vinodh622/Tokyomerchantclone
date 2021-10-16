package com.tokyosecret;

import android.content.DialogInterface;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.os.StrictMode;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;

import com.dantsu.escposprinter.EscPosPrinter;
import com.dantsu.escposprinter.connection.tcp.TcpConnection;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
// import com.google.zxing.BarcodeFormat;
// import com.google.zxing.EncodeHintType;
// import com.google.zxing.common.BitMatrix;
// import com.google.zxing.qrcode.QRCodeWriter;
// import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import java.io.IOException;
import java.io.OutputStream;
import java.net.ConnectException;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Hashtable;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class PrinterModule extends ReactContextBaseJavaModule {

    int QRCODE_IMAGE_HEIGHT = 255;
    int QRCODE_IMAGE_WIDTH = 255;

    Bitmap bmOverlay;
    OutputStream oStream;

    byte[] INIT = {27, 64};
    byte[] FEED_LINE = {10};
    byte[] SELECT_FONT_A = {27, 33, 0};
    byte[] ALLINEA_CT = {0x1B, 0x61, 0x01};
    byte[] ALLINEA_SELECT = {0x1b, 0x3d, 0x01};
    byte[] FONT_1X = {0x1D, 0x21, 0x00};
    byte[] printformat = {0x1B,0x21,0x03};


    public PrinterModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }

    @NonNull
    @Override
    public String getName() {
        return "PrinterModule";
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }

    @ReactMethod
    public void printQR(String ipAddress, String portNumber, String strQr, String strTable) {


        // try {
        //     // successCallback.invoke("Callback : Greetings from Printer");
        //     createQR(ipAddress, portNumber, strQr, strTable);
        // } catch (IllegalViewOperationException e) {
        //     // errorCallback.invoke(e.getMessage());
        // }



new Thread(new Runnable() {
            public void run() {
                try {
                    TcpConnection deviceConnection = new TcpConnection(ipAddress, Integer.parseInt(portNumber));

                    EscPosPrinter printer = new EscPosPrinter(deviceConnection, 203, 48f, 32);
                    printer
                            .printFormattedText(
                                    "[C]<qrcode size='50'>"+strQr+"</qrcode>\n" +
                                            "[C]\n" +
                                            "[C]<font size='tall'>Table No : "+strTable+"</font>\n"
                            );
                    deviceConnection.write(new byte[]{ 0x1D,
                            0x56,
                            66,
                            0x00});
                    deviceConnection.send();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();

    }

    // private void createQR(String stripAddress, String portNumber, String strQr, String strTable) {
    //     StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
    //     StrictMode.setThreadPolicy(policy);

    //     try{
    //         Hashtable<EncodeHintType, ErrorCorrectionLevel> hints = new Hashtable<EncodeHintType, ErrorCorrectionLevel>();
    //         hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
    //         BitMatrix bitMatrix = qrWriter.encode(strQr,
    //                 BarcodeFormat.QR_CODE,
    //                 QRCODE_IMAGE_WIDTH,
    //                 QRCODE_IMAGE_HEIGHT, hints);

    //         int bitMatrixWidth = bitMatrix.getWidth();

    //         int bitMatrixHeight = bitMatrix.getHeight();

    //         int[] pixels = new int[bitMatrixWidth * bitMatrixHeight];
    //         for (int y = 0; y < bitMatrixHeight; y++) {
    //             int offset = y * bitMatrixWidth;

    //             for (int x = 0; x < bitMatrixWidth; x++) {
    //                 pixels[offset + x] = bitMatrix.get(x, y) ?
    //                         Color.BLACK:Color.WHITE;
    //             }
    //         }

    //         bmOverlay = Bitmap.createBitmap(bitMatrixWidth, bitMatrixHeight, Bitmap.Config.ARGB_4444);

    //         bmOverlay.setPixels(pixels, 0, 255, 0, 0, bitMatrixWidth, bitMatrixHeight);

    //         // Bitmap bmp = BitmapFactory.decodeResource(getResources(), R.drawable.app_logo_large);

    //         //bmOverlay = Bitmap.createBitmap(bitmap.getWidth(), bitmap.getHeight(), bitmap.getConfig());

    //         byte[] command = Utils.decodeBitmap(bmOverlay);
    //         Canvas canvas = new Canvas(bmOverlay);
    //         canvas.drawBitmap(bmOverlay, new Matrix(), null);

    //         callQrPrint(strTable, stripAddress, portNumber);

    //     }catch (Exception e){

    //     }
    // }

    // private void callQrPrint(String strTable, String ipAddress, String portNumber) {


    //     Runnable runnable = new Runnable() {
    //         public void run() {

    //             try {

    //                 Socket sock = new Socket(ipAddress, Integer.parseInt(portNumber));
    //                 oStream = sock.getOutputStream();

    //                 if(bmOverlay!=null) {

    //                     oStream.write(INIT);
    //                     oStream.write(ALLINEA_CT);
    //                     byte[] command = Utils.decodeBitmap(bmOverlay);
    //                     oStream.write(printformat);
    //                     oStream.write(ALLINEA_CT);
    //                     oStream.write(ALLINEA_SELECT);
    //                     oStream.write(command);
    //                     oStream.write(FEED_LINE);
    //                     oStream.write(ALLINEA_CT); //text to center
    //                     oStream.write(SELECT_FONT_A);
    //                     oStream.write(FONT_1X);
    //                     oStream.write("TABLE : ".getBytes());
    //                     oStream.write(strTable.getBytes());
    //                     oStream.write(FEED_LINE);
    //                     oStream.write(FEED_LINE);




    //                 }

    //                 oStream.write(new byte[]{0x1D, 0x56, 0x41, 0x10});
    //                 oStream.flush();
    //                 oStream.close();
    //                 sock.close();

    //             } catch (ConnectException connectException){
    //                 runOnUiThread(new Runnable()
    //                 {
    //                     public void run()
    //                     {
    //                         showAlert(connectException.toString(), getReactApplicationContextIfActiveOrWarn());
    //                     }
    //                 });

    //                 Log.e("ERROR_ONE", connectException.toString(), connectException);
    //             } catch (UnknownHostException e) {
    //                 e.printStackTrace();
    //             } catch (IOException e) {
    //                 e.printStackTrace();
    //             }
    //         }
    //     };
    //     Thread mythread = new Thread(runnable);
    //     mythread.start();

    // }

    // private void showAlert(String msg, ReactApplicationContext context) {
    //     final AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(PrinterModule.this.getCurrentActivity());
    //     alertDialogBuilder.setMessage(msg);
    //     alertDialogBuilder.setTitle("No device found!");
    //     alertDialogBuilder.setPositiveButton("Close",
    //             new DialogInterface.OnClickListener() {
    //                 @Override
    //                 public void onClick(DialogInterface arg0, int arg1) {
    //                     arg0.dismiss();
    //                 }
    //             });
    //     AlertDialog alertDialog = alertDialogBuilder.create();
    //     alertDialog.show();
    // }

}
