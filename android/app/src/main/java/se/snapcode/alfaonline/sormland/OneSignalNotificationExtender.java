// package se.snapcode.alfaonline.sormland;

// import android.os.AsyncTask;
// import android.util.Log;

// //import com.onesignal.OSNotificationPayload;
// import com.onesignal.NotificationExtenderService;
// import com.onesignal.OSNotificationReceivedResult;

// import org.json.JSONArray;
// import org.json.JSONException;
// import org.json.JSONObject;

// import java.io.DataOutputStream;
// import java.io.InputStream;
// import java.io.InputStreamReader;
// import java.io.OutputStreamWriter;
// import java.net.HttpURLConnection;
// import java.net.URL;
// import se.snapcode.alfaonline.sormland.BuildConfig;

// public class OneSignalNotificationExtender extends NotificationExtenderService {
//   private class SendDeviceDetails extends AsyncTask<String, Void, String> {
//     @Override
//     protected String doInBackground(String... params) {
//       String data = "";
//       HttpURLConnection httpURLConnection = null;
//       try {
//         String versionName = BuildConfig.VERSION_NAME;
//         httpURLConnection = (HttpURLConnection) new URL(params[0]).openConnection();
//         httpURLConnection.setRequestMethod("POST");
//         httpURLConnection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
//         httpURLConnection.setRequestProperty("AppVersionCode", versionName);
//         httpURLConnection.setDoOutput(true);

//         DataOutputStream wr = new DataOutputStream(httpURLConnection.getOutputStream());
//         wr.writeBytes(params[1]);
//         wr.flush();
//         wr.close();

//         InputStream in = httpURLConnection.getInputStream();
//         InputStreamReader inputStreamReader = new InputStreamReader(in);

//         int inputStreamData = inputStreamReader.read();
//         while (inputStreamData != -1) {
//           char current = (char) inputStreamData;
//           inputStreamData = inputStreamReader.read();
//           data += current;
//         }
//       } catch (Exception e) {
//         e.printStackTrace();
//       } finally {
//         if (httpURLConnection != null) {
//           httpURLConnection.disconnect();
//         }
//       }

//       return data;
//     }

//     @Override
//     protected void onPostExecute(String result) {
//       super.onPostExecute(result);
//     }
//   }

//   @Override
//   protected boolean onNotificationProcessing(OSNotificationReceivedResult receivedResult) {
//     JSONObject additionalData = receivedResult.payload.additionalData;
//     JSONObject postData = new JSONObject();
//     JSONArray notificationMessageIds = new JSONArray();
//     notificationMessageIds.put(additionalData.optString("actorNotificationMessageId"));

//     try {
//       postData.put("NotificationMessageIds", notificationMessageIds );

//       new SendDeviceDetails().execute(BuildConfig.SERVER_URL + "/alfaonline/notifications/", postData.toString());
//     } catch (JSONException e) {
//       e.printStackTrace();
//     }

//     // Return true to stop the notification from displaying.
//     return false;
//   }
// }
