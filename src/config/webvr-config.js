WebVRConfig = {
    /***** Webvr-polyfill configuration *****/
    
    // Flag to disabled the UI in VR Mode.
    CARDBOARD_UI_DISABLED: false, // Default: false
    
    // Forces availability of VR mode, even for non-mobile devices.
    FORCE_ENABLE_VR: false, // Default: false.
    
    // Complementary filter coefficient. 0 for accelerometer, 1 for gyro.
    K_FILTER: 0.98, // Default: 0.98.
    
    // Flag to disable the instructions to rotate your device.
    ROTATE_INSTRUCTIONS_DISABLED: false, // Default: false.
    
    // How far into the future to predict during fast motion (in seconds).
    PREDICTION_TIME_S: 0.040, // Default: 0.040.
    
    // Flag to disable touch panner. In case you have your own touch controls.
    TOUCH_PANNER_DISABLED: false, // Default: true.
    
    // Enable yaw panning only, disabling roll and pitch. This can be useful for panoramas with nothing interesting above or below.
    YAW_ONLY: false, // Default: false.
    
    // To disable keyboard and mouse controls, if you want to use your own implementation.
    MOUSE_KEYBOARD_CONTROLS_DISABLED: false, // Default: false.
    
    // Prevent the polyfill from initializing immediately. Requires the app to call InitializeWebVRPolyfill() before it can be used.
    DEFER_INITIALIZATION: false, // Default: false.

    // Enable the deprecated version of the API (navigator.getVRDevices).
    ENABLE_DEPRECATED_API: true, // Default: false.

    // Scales the recommended buffer size reported by WebVR, which can improve performance.
    BUFFER_SCALE: 0.5, // Default: 0.5.

    // Allow VRDisplay.submitFrame to change gl bindings, which is more
    // efficient if the application code will re-bind its resources on the
    // next frame anyway. This has been seen to cause rendering glitches with
    // THREE.js.
    // Dirty bindings include: gl.FRAMEBUFFER_BINDING, gl.CURRENT_PROGRAM,
    // gl.ARRAY_BUFFER_BINDING, gl.ELEMENT_ARRAY_BUFFER_BINDING,
    // and gl.TEXTURE_BINDING_2D for texture unit 0.
    DIRTY_SUBMIT_FRAME_BINDINGS: false, // Default: false.
    
    /*** Webvr-boilerplate configuration ***/
    
    // Forces distortion in VR mode.
    FORCE_DISTORTION: false, // Default: false.
    
    // Override the distortion background color.
    DISTORTION_BGCOLOR: {x: 0, y: 0, z: 0, w: 1}, // Default: (0,0,0,1).
    
    // Prevent distortion from happening.
    PREVENT_DISTORTION: false, // Default: false.
    
    // Show eye centers for debugging.
    SHOW_EYE_CENTERS: false, // Default: false.
    
    // Prevent the online DPDB from being fetched.
    NO_DPDB_FETCH: false,  // Default: false.
};