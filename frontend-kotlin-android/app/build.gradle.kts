plugins {
    id("com.android.application")
    id("kotlin-android")
}

android {
    compileSdk = 30
    buildToolsVersion = "30.0.3"

    defaultConfig {
        applicationId = "com.example.mynotes"
        minSdk = 21
        targetSdk = 30
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    buildFeatures {
        compose = true
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.0.0-rc02"
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {

    implementation("androidx.core:core-ktx:1.6.0")
    implementation("androidx.appcompat:appcompat:1.3.0")
    implementation("com.google.android.material:material:1.4.0")
    implementation("androidx.constraintlayout:constraintlayout:2.0.4")
    testImplementation("junit:junit:4.+")
    androidTestImplementation("androidx.test.ext:junit:1.1.3")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.4.0")

    // Compose
    implementation ("androidx.compose.ui:ui:1.0.0-rc02")
    implementation ("androidx.compose.ui:ui-util:1.0.0-rc02")

    // Tooling support (Previews, etc.)
    implementation ("androidx.compose.ui:ui-tooling:1.0.0-rc02")

    // Foundation (Border, Background, Box, Image, Scroll, shapes, animations, etc.)
    implementation ("androidx.compose.foundation:foundation:1.0.0-rc02")

    // Material Design
    implementation ("androidx.compose.material:material:1.0.0-rc02")

    // Material design icons
    implementation ("androidx.compose.material:material-icons-core:1.0.0-rc02")
    implementation ("androidx.compose.material:material-icons-extended:1.0.0-rc02")

    // Integration with activities
    implementation ("androidx.activity:activity-compose:1.3.0-rc02")

}