package se.snapcode.alfaonline.sormland;

import android.widget.ImageView;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;

import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {
  @Override
  protected void addDefaultSplashLayout() {
    setContentView(R.layout.splash);
  }
}
