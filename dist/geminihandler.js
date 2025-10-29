(() => {
  // node_modules/@google/genai/dist/web/index.mjs
  var Outcome;
  (function(Outcome2) {
    Outcome2["OUTCOME_UNSPECIFIED"] = "OUTCOME_UNSPECIFIED";
    Outcome2["OUTCOME_OK"] = "OUTCOME_OK";
    Outcome2["OUTCOME_FAILED"] = "OUTCOME_FAILED";
    Outcome2["OUTCOME_DEADLINE_EXCEEDED"] = "OUTCOME_DEADLINE_EXCEEDED";
  })(Outcome || (Outcome = {}));
  var Language;
  (function(Language2) {
    Language2["LANGUAGE_UNSPECIFIED"] = "LANGUAGE_UNSPECIFIED";
    Language2["PYTHON"] = "PYTHON";
  })(Language || (Language = {}));
  var FunctionResponseScheduling;
  (function(FunctionResponseScheduling2) {
    FunctionResponseScheduling2["SCHEDULING_UNSPECIFIED"] = "SCHEDULING_UNSPECIFIED";
    FunctionResponseScheduling2["SILENT"] = "SILENT";
    FunctionResponseScheduling2["WHEN_IDLE"] = "WHEN_IDLE";
    FunctionResponseScheduling2["INTERRUPT"] = "INTERRUPT";
  })(FunctionResponseScheduling || (FunctionResponseScheduling = {}));
  var Type;
  (function(Type2) {
    Type2["TYPE_UNSPECIFIED"] = "TYPE_UNSPECIFIED";
    Type2["STRING"] = "STRING";
    Type2["NUMBER"] = "NUMBER";
    Type2["INTEGER"] = "INTEGER";
    Type2["BOOLEAN"] = "BOOLEAN";
    Type2["ARRAY"] = "ARRAY";
    Type2["OBJECT"] = "OBJECT";
    Type2["NULL"] = "NULL";
  })(Type || (Type = {}));
  var HarmCategory;
  (function(HarmCategory2) {
    HarmCategory2["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
    HarmCategory2["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
    HarmCategory2["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
    HarmCategory2["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
    HarmCategory2["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
    HarmCategory2["HARM_CATEGORY_CIVIC_INTEGRITY"] = "HARM_CATEGORY_CIVIC_INTEGRITY";
    HarmCategory2["HARM_CATEGORY_IMAGE_HATE"] = "HARM_CATEGORY_IMAGE_HATE";
    HarmCategory2["HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT"] = "HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT";
    HarmCategory2["HARM_CATEGORY_IMAGE_HARASSMENT"] = "HARM_CATEGORY_IMAGE_HARASSMENT";
    HarmCategory2["HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT";
    HarmCategory2["HARM_CATEGORY_JAILBREAK"] = "HARM_CATEGORY_JAILBREAK";
  })(HarmCategory || (HarmCategory = {}));
  var HarmBlockMethod;
  (function(HarmBlockMethod2) {
    HarmBlockMethod2["HARM_BLOCK_METHOD_UNSPECIFIED"] = "HARM_BLOCK_METHOD_UNSPECIFIED";
    HarmBlockMethod2["SEVERITY"] = "SEVERITY";
    HarmBlockMethod2["PROBABILITY"] = "PROBABILITY";
  })(HarmBlockMethod || (HarmBlockMethod = {}));
  var HarmBlockThreshold;
  (function(HarmBlockThreshold2) {
    HarmBlockThreshold2["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
    HarmBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
    HarmBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
    HarmBlockThreshold2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
    HarmBlockThreshold2["BLOCK_NONE"] = "BLOCK_NONE";
    HarmBlockThreshold2["OFF"] = "OFF";
  })(HarmBlockThreshold || (HarmBlockThreshold = {}));
  var Mode;
  (function(Mode2) {
    Mode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
    Mode2["MODE_DYNAMIC"] = "MODE_DYNAMIC";
  })(Mode || (Mode = {}));
  var AuthType;
  (function(AuthType2) {
    AuthType2["AUTH_TYPE_UNSPECIFIED"] = "AUTH_TYPE_UNSPECIFIED";
    AuthType2["NO_AUTH"] = "NO_AUTH";
    AuthType2["API_KEY_AUTH"] = "API_KEY_AUTH";
    AuthType2["HTTP_BASIC_AUTH"] = "HTTP_BASIC_AUTH";
    AuthType2["GOOGLE_SERVICE_ACCOUNT_AUTH"] = "GOOGLE_SERVICE_ACCOUNT_AUTH";
    AuthType2["OAUTH"] = "OAUTH";
    AuthType2["OIDC_AUTH"] = "OIDC_AUTH";
  })(AuthType || (AuthType = {}));
  var ApiSpec;
  (function(ApiSpec2) {
    ApiSpec2["API_SPEC_UNSPECIFIED"] = "API_SPEC_UNSPECIFIED";
    ApiSpec2["SIMPLE_SEARCH"] = "SIMPLE_SEARCH";
    ApiSpec2["ELASTIC_SEARCH"] = "ELASTIC_SEARCH";
  })(ApiSpec || (ApiSpec = {}));
  var UrlRetrievalStatus;
  (function(UrlRetrievalStatus2) {
    UrlRetrievalStatus2["URL_RETRIEVAL_STATUS_UNSPECIFIED"] = "URL_RETRIEVAL_STATUS_UNSPECIFIED";
    UrlRetrievalStatus2["URL_RETRIEVAL_STATUS_SUCCESS"] = "URL_RETRIEVAL_STATUS_SUCCESS";
    UrlRetrievalStatus2["URL_RETRIEVAL_STATUS_ERROR"] = "URL_RETRIEVAL_STATUS_ERROR";
    UrlRetrievalStatus2["URL_RETRIEVAL_STATUS_PAYWALL"] = "URL_RETRIEVAL_STATUS_PAYWALL";
    UrlRetrievalStatus2["URL_RETRIEVAL_STATUS_UNSAFE"] = "URL_RETRIEVAL_STATUS_UNSAFE";
  })(UrlRetrievalStatus || (UrlRetrievalStatus = {}));
  var FinishReason;
  (function(FinishReason2) {
    FinishReason2["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
    FinishReason2["STOP"] = "STOP";
    FinishReason2["MAX_TOKENS"] = "MAX_TOKENS";
    FinishReason2["SAFETY"] = "SAFETY";
    FinishReason2["RECITATION"] = "RECITATION";
    FinishReason2["LANGUAGE"] = "LANGUAGE";
    FinishReason2["OTHER"] = "OTHER";
    FinishReason2["BLOCKLIST"] = "BLOCKLIST";
    FinishReason2["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
    FinishReason2["SPII"] = "SPII";
    FinishReason2["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
    FinishReason2["IMAGE_SAFETY"] = "IMAGE_SAFETY";
    FinishReason2["UNEXPECTED_TOOL_CALL"] = "UNEXPECTED_TOOL_CALL";
    FinishReason2["IMAGE_PROHIBITED_CONTENT"] = "IMAGE_PROHIBITED_CONTENT";
    FinishReason2["NO_IMAGE"] = "NO_IMAGE";
  })(FinishReason || (FinishReason = {}));
  var HarmProbability;
  (function(HarmProbability2) {
    HarmProbability2["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
    HarmProbability2["NEGLIGIBLE"] = "NEGLIGIBLE";
    HarmProbability2["LOW"] = "LOW";
    HarmProbability2["MEDIUM"] = "MEDIUM";
    HarmProbability2["HIGH"] = "HIGH";
  })(HarmProbability || (HarmProbability = {}));
  var HarmSeverity;
  (function(HarmSeverity2) {
    HarmSeverity2["HARM_SEVERITY_UNSPECIFIED"] = "HARM_SEVERITY_UNSPECIFIED";
    HarmSeverity2["HARM_SEVERITY_NEGLIGIBLE"] = "HARM_SEVERITY_NEGLIGIBLE";
    HarmSeverity2["HARM_SEVERITY_LOW"] = "HARM_SEVERITY_LOW";
    HarmSeverity2["HARM_SEVERITY_MEDIUM"] = "HARM_SEVERITY_MEDIUM";
    HarmSeverity2["HARM_SEVERITY_HIGH"] = "HARM_SEVERITY_HIGH";
  })(HarmSeverity || (HarmSeverity = {}));
  var BlockedReason;
  (function(BlockedReason2) {
    BlockedReason2["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
    BlockedReason2["SAFETY"] = "SAFETY";
    BlockedReason2["OTHER"] = "OTHER";
    BlockedReason2["BLOCKLIST"] = "BLOCKLIST";
    BlockedReason2["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
    BlockedReason2["IMAGE_SAFETY"] = "IMAGE_SAFETY";
    BlockedReason2["MODEL_ARMOR"] = "MODEL_ARMOR";
    BlockedReason2["JAILBREAK"] = "JAILBREAK";
  })(BlockedReason || (BlockedReason = {}));
  var TrafficType;
  (function(TrafficType2) {
    TrafficType2["TRAFFIC_TYPE_UNSPECIFIED"] = "TRAFFIC_TYPE_UNSPECIFIED";
    TrafficType2["ON_DEMAND"] = "ON_DEMAND";
    TrafficType2["PROVISIONED_THROUGHPUT"] = "PROVISIONED_THROUGHPUT";
  })(TrafficType || (TrafficType = {}));
  var Modality;
  (function(Modality2) {
    Modality2["MODALITY_UNSPECIFIED"] = "MODALITY_UNSPECIFIED";
    Modality2["TEXT"] = "TEXT";
    Modality2["IMAGE"] = "IMAGE";
    Modality2["AUDIO"] = "AUDIO";
  })(Modality || (Modality = {}));
  var MediaResolution;
  (function(MediaResolution2) {
    MediaResolution2["MEDIA_RESOLUTION_UNSPECIFIED"] = "MEDIA_RESOLUTION_UNSPECIFIED";
    MediaResolution2["MEDIA_RESOLUTION_LOW"] = "MEDIA_RESOLUTION_LOW";
    MediaResolution2["MEDIA_RESOLUTION_MEDIUM"] = "MEDIA_RESOLUTION_MEDIUM";
    MediaResolution2["MEDIA_RESOLUTION_HIGH"] = "MEDIA_RESOLUTION_HIGH";
  })(MediaResolution || (MediaResolution = {}));
  var JobState;
  (function(JobState2) {
    JobState2["JOB_STATE_UNSPECIFIED"] = "JOB_STATE_UNSPECIFIED";
    JobState2["JOB_STATE_QUEUED"] = "JOB_STATE_QUEUED";
    JobState2["JOB_STATE_PENDING"] = "JOB_STATE_PENDING";
    JobState2["JOB_STATE_RUNNING"] = "JOB_STATE_RUNNING";
    JobState2["JOB_STATE_SUCCEEDED"] = "JOB_STATE_SUCCEEDED";
    JobState2["JOB_STATE_FAILED"] = "JOB_STATE_FAILED";
    JobState2["JOB_STATE_CANCELLING"] = "JOB_STATE_CANCELLING";
    JobState2["JOB_STATE_CANCELLED"] = "JOB_STATE_CANCELLED";
    JobState2["JOB_STATE_PAUSED"] = "JOB_STATE_PAUSED";
    JobState2["JOB_STATE_EXPIRED"] = "JOB_STATE_EXPIRED";
    JobState2["JOB_STATE_UPDATING"] = "JOB_STATE_UPDATING";
    JobState2["JOB_STATE_PARTIALLY_SUCCEEDED"] = "JOB_STATE_PARTIALLY_SUCCEEDED";
  })(JobState || (JobState = {}));
  var TuningMode;
  (function(TuningMode2) {
    TuningMode2["TUNING_MODE_UNSPECIFIED"] = "TUNING_MODE_UNSPECIFIED";
    TuningMode2["TUNING_MODE_FULL"] = "TUNING_MODE_FULL";
    TuningMode2["TUNING_MODE_PEFT_ADAPTER"] = "TUNING_MODE_PEFT_ADAPTER";
  })(TuningMode || (TuningMode = {}));
  var AdapterSize;
  (function(AdapterSize2) {
    AdapterSize2["ADAPTER_SIZE_UNSPECIFIED"] = "ADAPTER_SIZE_UNSPECIFIED";
    AdapterSize2["ADAPTER_SIZE_ONE"] = "ADAPTER_SIZE_ONE";
    AdapterSize2["ADAPTER_SIZE_TWO"] = "ADAPTER_SIZE_TWO";
    AdapterSize2["ADAPTER_SIZE_FOUR"] = "ADAPTER_SIZE_FOUR";
    AdapterSize2["ADAPTER_SIZE_EIGHT"] = "ADAPTER_SIZE_EIGHT";
    AdapterSize2["ADAPTER_SIZE_SIXTEEN"] = "ADAPTER_SIZE_SIXTEEN";
    AdapterSize2["ADAPTER_SIZE_THIRTY_TWO"] = "ADAPTER_SIZE_THIRTY_TWO";
  })(AdapterSize || (AdapterSize = {}));
  var TuningTask;
  (function(TuningTask2) {
    TuningTask2["TUNING_TASK_UNSPECIFIED"] = "TUNING_TASK_UNSPECIFIED";
    TuningTask2["TUNING_TASK_I2V"] = "TUNING_TASK_I2V";
    TuningTask2["TUNING_TASK_T2V"] = "TUNING_TASK_T2V";
  })(TuningTask || (TuningTask = {}));
  var FeatureSelectionPreference;
  (function(FeatureSelectionPreference2) {
    FeatureSelectionPreference2["FEATURE_SELECTION_PREFERENCE_UNSPECIFIED"] = "FEATURE_SELECTION_PREFERENCE_UNSPECIFIED";
    FeatureSelectionPreference2["PRIORITIZE_QUALITY"] = "PRIORITIZE_QUALITY";
    FeatureSelectionPreference2["BALANCED"] = "BALANCED";
    FeatureSelectionPreference2["PRIORITIZE_COST"] = "PRIORITIZE_COST";
  })(FeatureSelectionPreference || (FeatureSelectionPreference = {}));
  var Behavior;
  (function(Behavior2) {
    Behavior2["UNSPECIFIED"] = "UNSPECIFIED";
    Behavior2["BLOCKING"] = "BLOCKING";
    Behavior2["NON_BLOCKING"] = "NON_BLOCKING";
  })(Behavior || (Behavior = {}));
  var DynamicRetrievalConfigMode;
  (function(DynamicRetrievalConfigMode2) {
    DynamicRetrievalConfigMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
    DynamicRetrievalConfigMode2["MODE_DYNAMIC"] = "MODE_DYNAMIC";
  })(DynamicRetrievalConfigMode || (DynamicRetrievalConfigMode = {}));
  var Environment;
  (function(Environment2) {
    Environment2["ENVIRONMENT_UNSPECIFIED"] = "ENVIRONMENT_UNSPECIFIED";
    Environment2["ENVIRONMENT_BROWSER"] = "ENVIRONMENT_BROWSER";
  })(Environment || (Environment = {}));
  var FunctionCallingConfigMode;
  (function(FunctionCallingConfigMode2) {
    FunctionCallingConfigMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
    FunctionCallingConfigMode2["AUTO"] = "AUTO";
    FunctionCallingConfigMode2["ANY"] = "ANY";
    FunctionCallingConfigMode2["NONE"] = "NONE";
    FunctionCallingConfigMode2["VALIDATED"] = "VALIDATED";
  })(FunctionCallingConfigMode || (FunctionCallingConfigMode = {}));
  var SafetyFilterLevel;
  (function(SafetyFilterLevel2) {
    SafetyFilterLevel2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
    SafetyFilterLevel2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
    SafetyFilterLevel2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
    SafetyFilterLevel2["BLOCK_NONE"] = "BLOCK_NONE";
  })(SafetyFilterLevel || (SafetyFilterLevel = {}));
  var PersonGeneration;
  (function(PersonGeneration2) {
    PersonGeneration2["DONT_ALLOW"] = "DONT_ALLOW";
    PersonGeneration2["ALLOW_ADULT"] = "ALLOW_ADULT";
    PersonGeneration2["ALLOW_ALL"] = "ALLOW_ALL";
  })(PersonGeneration || (PersonGeneration = {}));
  var ImagePromptLanguage;
  (function(ImagePromptLanguage2) {
    ImagePromptLanguage2["auto"] = "auto";
    ImagePromptLanguage2["en"] = "en";
    ImagePromptLanguage2["ja"] = "ja";
    ImagePromptLanguage2["ko"] = "ko";
    ImagePromptLanguage2["hi"] = "hi";
    ImagePromptLanguage2["zh"] = "zh";
    ImagePromptLanguage2["pt"] = "pt";
    ImagePromptLanguage2["es"] = "es";
  })(ImagePromptLanguage || (ImagePromptLanguage = {}));
  var MaskReferenceMode;
  (function(MaskReferenceMode2) {
    MaskReferenceMode2["MASK_MODE_DEFAULT"] = "MASK_MODE_DEFAULT";
    MaskReferenceMode2["MASK_MODE_USER_PROVIDED"] = "MASK_MODE_USER_PROVIDED";
    MaskReferenceMode2["MASK_MODE_BACKGROUND"] = "MASK_MODE_BACKGROUND";
    MaskReferenceMode2["MASK_MODE_FOREGROUND"] = "MASK_MODE_FOREGROUND";
    MaskReferenceMode2["MASK_MODE_SEMANTIC"] = "MASK_MODE_SEMANTIC";
  })(MaskReferenceMode || (MaskReferenceMode = {}));
  var ControlReferenceType;
  (function(ControlReferenceType2) {
    ControlReferenceType2["CONTROL_TYPE_DEFAULT"] = "CONTROL_TYPE_DEFAULT";
    ControlReferenceType2["CONTROL_TYPE_CANNY"] = "CONTROL_TYPE_CANNY";
    ControlReferenceType2["CONTROL_TYPE_SCRIBBLE"] = "CONTROL_TYPE_SCRIBBLE";
    ControlReferenceType2["CONTROL_TYPE_FACE_MESH"] = "CONTROL_TYPE_FACE_MESH";
  })(ControlReferenceType || (ControlReferenceType = {}));
  var SubjectReferenceType;
  (function(SubjectReferenceType2) {
    SubjectReferenceType2["SUBJECT_TYPE_DEFAULT"] = "SUBJECT_TYPE_DEFAULT";
    SubjectReferenceType2["SUBJECT_TYPE_PERSON"] = "SUBJECT_TYPE_PERSON";
    SubjectReferenceType2["SUBJECT_TYPE_ANIMAL"] = "SUBJECT_TYPE_ANIMAL";
    SubjectReferenceType2["SUBJECT_TYPE_PRODUCT"] = "SUBJECT_TYPE_PRODUCT";
  })(SubjectReferenceType || (SubjectReferenceType = {}));
  var EditMode;
  (function(EditMode2) {
    EditMode2["EDIT_MODE_DEFAULT"] = "EDIT_MODE_DEFAULT";
    EditMode2["EDIT_MODE_INPAINT_REMOVAL"] = "EDIT_MODE_INPAINT_REMOVAL";
    EditMode2["EDIT_MODE_INPAINT_INSERTION"] = "EDIT_MODE_INPAINT_INSERTION";
    EditMode2["EDIT_MODE_OUTPAINT"] = "EDIT_MODE_OUTPAINT";
    EditMode2["EDIT_MODE_CONTROLLED_EDITING"] = "EDIT_MODE_CONTROLLED_EDITING";
    EditMode2["EDIT_MODE_STYLE"] = "EDIT_MODE_STYLE";
    EditMode2["EDIT_MODE_BGSWAP"] = "EDIT_MODE_BGSWAP";
    EditMode2["EDIT_MODE_PRODUCT_IMAGE"] = "EDIT_MODE_PRODUCT_IMAGE";
  })(EditMode || (EditMode = {}));
  var SegmentMode;
  (function(SegmentMode2) {
    SegmentMode2["FOREGROUND"] = "FOREGROUND";
    SegmentMode2["BACKGROUND"] = "BACKGROUND";
    SegmentMode2["PROMPT"] = "PROMPT";
    SegmentMode2["SEMANTIC"] = "SEMANTIC";
    SegmentMode2["INTERACTIVE"] = "INTERACTIVE";
  })(SegmentMode || (SegmentMode = {}));
  var VideoGenerationReferenceType;
  (function(VideoGenerationReferenceType2) {
    VideoGenerationReferenceType2["ASSET"] = "ASSET";
    VideoGenerationReferenceType2["STYLE"] = "STYLE";
  })(VideoGenerationReferenceType || (VideoGenerationReferenceType = {}));
  var VideoGenerationMaskMode;
  (function(VideoGenerationMaskMode2) {
    VideoGenerationMaskMode2["INSERT"] = "INSERT";
    VideoGenerationMaskMode2["REMOVE"] = "REMOVE";
    VideoGenerationMaskMode2["REMOVE_STATIC"] = "REMOVE_STATIC";
    VideoGenerationMaskMode2["OUTPAINT"] = "OUTPAINT";
  })(VideoGenerationMaskMode || (VideoGenerationMaskMode = {}));
  var VideoCompressionQuality;
  (function(VideoCompressionQuality2) {
    VideoCompressionQuality2["OPTIMIZED"] = "OPTIMIZED";
    VideoCompressionQuality2["LOSSLESS"] = "LOSSLESS";
  })(VideoCompressionQuality || (VideoCompressionQuality = {}));
  var FileState;
  (function(FileState2) {
    FileState2["STATE_UNSPECIFIED"] = "STATE_UNSPECIFIED";
    FileState2["PROCESSING"] = "PROCESSING";
    FileState2["ACTIVE"] = "ACTIVE";
    FileState2["FAILED"] = "FAILED";
  })(FileState || (FileState = {}));
  var FileSource;
  (function(FileSource2) {
    FileSource2["SOURCE_UNSPECIFIED"] = "SOURCE_UNSPECIFIED";
    FileSource2["UPLOADED"] = "UPLOADED";
    FileSource2["GENERATED"] = "GENERATED";
  })(FileSource || (FileSource = {}));
  var TurnCompleteReason;
  (function(TurnCompleteReason2) {
    TurnCompleteReason2["TURN_COMPLETE_REASON_UNSPECIFIED"] = "TURN_COMPLETE_REASON_UNSPECIFIED";
    TurnCompleteReason2["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
    TurnCompleteReason2["RESPONSE_REJECTED"] = "RESPONSE_REJECTED";
    TurnCompleteReason2["NEED_MORE_INPUT"] = "NEED_MORE_INPUT";
  })(TurnCompleteReason || (TurnCompleteReason = {}));
  var MediaModality;
  (function(MediaModality2) {
    MediaModality2["MODALITY_UNSPECIFIED"] = "MODALITY_UNSPECIFIED";
    MediaModality2["TEXT"] = "TEXT";
    MediaModality2["IMAGE"] = "IMAGE";
    MediaModality2["VIDEO"] = "VIDEO";
    MediaModality2["AUDIO"] = "AUDIO";
    MediaModality2["DOCUMENT"] = "DOCUMENT";
  })(MediaModality || (MediaModality = {}));
  var StartSensitivity;
  (function(StartSensitivity2) {
    StartSensitivity2["START_SENSITIVITY_UNSPECIFIED"] = "START_SENSITIVITY_UNSPECIFIED";
    StartSensitivity2["START_SENSITIVITY_HIGH"] = "START_SENSITIVITY_HIGH";
    StartSensitivity2["START_SENSITIVITY_LOW"] = "START_SENSITIVITY_LOW";
  })(StartSensitivity || (StartSensitivity = {}));
  var EndSensitivity;
  (function(EndSensitivity2) {
    EndSensitivity2["END_SENSITIVITY_UNSPECIFIED"] = "END_SENSITIVITY_UNSPECIFIED";
    EndSensitivity2["END_SENSITIVITY_HIGH"] = "END_SENSITIVITY_HIGH";
    EndSensitivity2["END_SENSITIVITY_LOW"] = "END_SENSITIVITY_LOW";
  })(EndSensitivity || (EndSensitivity = {}));
  var ActivityHandling;
  (function(ActivityHandling2) {
    ActivityHandling2["ACTIVITY_HANDLING_UNSPECIFIED"] = "ACTIVITY_HANDLING_UNSPECIFIED";
    ActivityHandling2["START_OF_ACTIVITY_INTERRUPTS"] = "START_OF_ACTIVITY_INTERRUPTS";
    ActivityHandling2["NO_INTERRUPTION"] = "NO_INTERRUPTION";
  })(ActivityHandling || (ActivityHandling = {}));
  var TurnCoverage;
  (function(TurnCoverage2) {
    TurnCoverage2["TURN_COVERAGE_UNSPECIFIED"] = "TURN_COVERAGE_UNSPECIFIED";
    TurnCoverage2["TURN_INCLUDES_ONLY_ACTIVITY"] = "TURN_INCLUDES_ONLY_ACTIVITY";
    TurnCoverage2["TURN_INCLUDES_ALL_INPUT"] = "TURN_INCLUDES_ALL_INPUT";
  })(TurnCoverage || (TurnCoverage = {}));
  var Scale;
  (function(Scale2) {
    Scale2["SCALE_UNSPECIFIED"] = "SCALE_UNSPECIFIED";
    Scale2["C_MAJOR_A_MINOR"] = "C_MAJOR_A_MINOR";
    Scale2["D_FLAT_MAJOR_B_FLAT_MINOR"] = "D_FLAT_MAJOR_B_FLAT_MINOR";
    Scale2["D_MAJOR_B_MINOR"] = "D_MAJOR_B_MINOR";
    Scale2["E_FLAT_MAJOR_C_MINOR"] = "E_FLAT_MAJOR_C_MINOR";
    Scale2["E_MAJOR_D_FLAT_MINOR"] = "E_MAJOR_D_FLAT_MINOR";
    Scale2["F_MAJOR_D_MINOR"] = "F_MAJOR_D_MINOR";
    Scale2["G_FLAT_MAJOR_E_FLAT_MINOR"] = "G_FLAT_MAJOR_E_FLAT_MINOR";
    Scale2["G_MAJOR_E_MINOR"] = "G_MAJOR_E_MINOR";
    Scale2["A_FLAT_MAJOR_F_MINOR"] = "A_FLAT_MAJOR_F_MINOR";
    Scale2["A_MAJOR_G_FLAT_MINOR"] = "A_MAJOR_G_FLAT_MINOR";
    Scale2["B_FLAT_MAJOR_G_MINOR"] = "B_FLAT_MAJOR_G_MINOR";
    Scale2["B_MAJOR_A_FLAT_MINOR"] = "B_MAJOR_A_FLAT_MINOR";
  })(Scale || (Scale = {}));
  var MusicGenerationMode;
  (function(MusicGenerationMode2) {
    MusicGenerationMode2["MUSIC_GENERATION_MODE_UNSPECIFIED"] = "MUSIC_GENERATION_MODE_UNSPECIFIED";
    MusicGenerationMode2["QUALITY"] = "QUALITY";
    MusicGenerationMode2["DIVERSITY"] = "DIVERSITY";
    MusicGenerationMode2["VOCALIZATION"] = "VOCALIZATION";
  })(MusicGenerationMode || (MusicGenerationMode = {}));
  var LiveMusicPlaybackControl;
  (function(LiveMusicPlaybackControl2) {
    LiveMusicPlaybackControl2["PLAYBACK_CONTROL_UNSPECIFIED"] = "PLAYBACK_CONTROL_UNSPECIFIED";
    LiveMusicPlaybackControl2["PLAY"] = "PLAY";
    LiveMusicPlaybackControl2["PAUSE"] = "PAUSE";
    LiveMusicPlaybackControl2["STOP"] = "STOP";
    LiveMusicPlaybackControl2["RESET_CONTEXT"] = "RESET_CONTEXT";
  })(LiveMusicPlaybackControl || (LiveMusicPlaybackControl = {}));
  var PagedItem;
  (function(PagedItem2) {
    PagedItem2["PAGED_ITEM_BATCH_JOBS"] = "batchJobs";
    PagedItem2["PAGED_ITEM_MODELS"] = "models";
    PagedItem2["PAGED_ITEM_TUNING_JOBS"] = "tuningJobs";
    PagedItem2["PAGED_ITEM_FILES"] = "files";
    PagedItem2["PAGED_ITEM_CACHED_CONTENTS"] = "cachedContents";
  })(PagedItem || (PagedItem = {}));
  var SDK_VERSION = "1.27.0";
  var LIBRARY_LABEL = `google-genai-sdk/${SDK_VERSION}`;
  var MAX_CHUNK_SIZE = 1024 * 1024 * 8;

  // src/geminihandler.js
  document.getElementById("submit_key").addEventListener("click", get_gemini_key);
  async function get_gemini_key() {
    console.log("FUCK YOU ");
    var forminput = document.getElementById("forminput");
    console.log(forminput.value);
    try {
      const data = { "contents": [{ "parts": [{ "text": "This is a test query to see if API key works" }] }] };
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
        method: "POST",
        headers: {
          "x-goog-api-key": forminput.text,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ input: data })
      });
      if (!response.ok) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      console.log("WRONG KEY");
    }
    console.log("AI");
  }
})();
/*! Bundled license information:

@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
@google/genai/dist/web/index.mjs:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
