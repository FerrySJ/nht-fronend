// App_Init
export const APP_INIT = "APP_INIT";
export const APP_TITLE = "Developed by";

//////////////// Localization Begin ////////////////
// export const apiUrl = "http://10.121.1.122:1821/locker_management/"; // <<<<< same back end  >>>>>>
// export const apiUrl = "http://localhost:1800/"; // <<<<< same back end  >>>>>>
// netstat -an | find "4100"


// ========== test local ================
// export const apiUrl = "http://localhost:2023/api/"; 
// export const api_Influx = "http://192.168.1.1:4012"; 
// export const Image_apiUrl = "http://192.168.1.107:4012/"; 

// // ========== Server NHT (SPD) ================
// export const apiUrl = "http://192.168.1.107:2009/api/"; 
// export const api_Influx = "http://192.168.1.107:4012"; 
// export const Image_apiUrl = "http://192.168.1.107:4012/"; 

// ========== Server NHT  (New Server) ================
export const apiUrl = "http://10.120.139.25:4009/api/"; //TWN

// export const apiUrl = "http://10.128.16.120:2005/api/"; //Server
// ========== ======================== ================
export const api_Influx = "http://10.128.16.120:8501/"; 
export const Image_apiUrl = "http://192.168.100.125:30001/";


// ========== Server NHT (MAIN) ================
// export const apiUrl = "http://10.128.16.210:30001/"; 
// export const api_Influx = "http://10.128.16.210:30001/"; 
// export const Image_apiUrl = "http://10.128.16.210:30001/"; 

// ========== Server NMB  (MAIN) ================
// export const apiUrl = "http://192.168.100.125:30001/"; 
// export const api_Influx = "http://192.168.100.125:8086"; 
// export const Image_apiUrl = "http://192.168.100.125:30001/";


// ========== Server NHT  (Test Server) ================
// export const apiUrl = "http://192.168.139.11:2005/api/"; 
// export const api_Influx = "http://10.128.16.120:8501/"; 
// export const Image_apiUrl = "http://192.168.100.125:30001/";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";

//backend for realtime
export const MQTT_PATH = {
  ADDRESS_1885: "mqtt://192.168.100.125:1883", // NMB
};

export const server = {
  URL_REGIST: `user/regist`,
  LOGIN_URL: `user/login`,
  LOGIN_EMP: `user/elogin`,
  URL_PASSWORD: `user/password`,
  URL_USER: `user/all`,
  URL_EDITUSER: `user/level`,
  URL_DELETEUSER: `user/delete`,
  USER_QUERY: `user/level_query`,

  //dx ball usage
  realtime_MBRC_Ball_URL: `api_nhtMBR/MBRC_Ball`,
  realtime_MBRC_Ball_Size_MA: `api_nhtMBR/MBRC_Ball_Size_MA`,
  realtime_MBRC_Ball_Size_MD: `api_nhtMBR/MBRC_Ball_Size_MD`,
  realtime_MBRC_Ball_tb_URL: `api_nhtMBR/MBRC_Ball_tb`,
  realtime_MBRC_Ball_tb_URL_MD: `api_nhtMBR/MBRC_Ball_tb_MD`,
  realtime_MBRC_Ball_All_URL: `api_nhtMBR/MBRC_Ball_All`,
  realtime_MBRC_Ball_Stock_URL: `api_nhtMBR/MBRC_Ball_onHand`,
  realtime_MBRC_Ball_Stock_Size_SUJ: `api_nhtMBR/MBRC_Ball_onHand_size_SUJ`,
  realtime_MBRC_Ball_Stock_Size_DD: `api_nhtMBR/MBRC_Ball_onHand_size_DD`,
  realtime_MBRC_Ball_Daily_URL: `api_nhtMBR/MBRC_Ball_Daily`,
  realtime_MBRC_Ball_Size_MD_URL: `api_nhtMBR/MBRC_Ball_Size_MD_Daily`,
  realtime_MBRC_Ball_Size_MA_URL: `api_nhtMBR/MBRC_Ball_Size_MA_Daily`,
  realtime_MBRC_Ball_Size_MA_7DAY_ACCUM: `api_nhtMBR/MBRC_Ball_Size_MA_7Day_Ago`,
  realtime_MBRC_Ball_Size_MD_7DAY_ACCUM: `api_nhtMBR/MBRC_Ball_Size_MD_7Day_Ago`,


  //ball usage
  realtime_MBRC_Ball_turnover_URL: `api_nhtMBR/MBRC_Ball_Turnover`,
  realtime_cost_onHand_URL: `api_nhtMBR/MBRC_Ball_Cost_Turnover`,
  //Monthly MA MD
  realtime_MBRC_Ball_Monthly_MA: `api_nhtMBR/MBRC_Ball_Size_MA_Monthly`,
  realtime_MBRC_Ball_Monthly_MD: `api_nhtMBR/MBRC_Ball_Size_MD_Monthly`,
  
  // MMS MBRC
  realtime_chartPD_MBR_MD24_URL: `api_nhtMBR/MMS_prod_yield_MBRC_MD24`,
  realtime_chartDT_MBR_MD24_URL: `api_nhtMBR/MMS_downtime_MBRC_MD24`,
  realtime_chartPD_MBR_MD_URL: `api_nhtMBR/MMS_prod_yield_MBRC_MD`,
  realtime_chartPD_TOTAL_MBR_URL: `api_nhtMBR/MMS_prod_total_yield_MBRC_MD`,
  realtime_chartPD_ACCUM_TOTAL_MBR_URL: `api_nhtMBR/MMS_accum_prod_total_yield_MBRC_MD`,
  realtime_chartPD_MBR_MD_ALL_URL: `api_nhtMBR/MMS_prod_yield_MBRC_MD_ALL`, // all mc_no
  mms_mbrc_all_tb: `api_nhtMBR/MBRC_mornitoring_all`, // table mornitor

  realtime_chartDT_MBR_MD_URL: `api_nhtMBR/MMS_downtime_MBRC_MD`,
  master_machine: `/api_nhtMaster/master_MC`,
  master_size: `/api_nhtMaster/master_size`,
  master_type: `/api_nhtMaster/master_type`,
  master_process: `/api_nhtMaster/master_process`,
  master_year: `/api_nhtMaster/master_year`,

  Master_mc_URL: `api_nhtGrinding/mms_machine`,
  chart_GD_mms_URL: `api_nhtGrinding/mms`,
  GANTT_MMS_URL: `api_nhtMMS/gantt_MMS`, //ptdChart
  GET_MASTER_MC_GD: `api_nhtGrinding/master_mc_GD`,
  mc_status_log_GD: `api_nhtGrinding/GD_mms_log`,
  TIMELINE_ALARMLIST_GD: `api_nhtGrinding/Timeline_Alarmlist_GD`,
  AlarmTopic_time_TB: `api_nhtGrinding/AlarmTopic_time`,
  AlarmTopic_time_GD2: `api_nhtGrinding/AlarmTopic_time2`,
  ListTopic_time_GD: `api_nhtGrinding/GetTopic_time`,
  Alarm_Non_Operating_GD: `api_nhtGrinding/MC_Status_All`, // show % non and operating
  MC_by_status_GD: `api_nhtGrinding/mc_by_status`, // show % non and operating
  MC_status_daily_GD: `api_nhtGrinding/count_mc_status_daily_GD`, // show count daily by mc
  Topic_Alarmlist_daily_GD: `api_nhtGrinding/compare_alarmlist_daily_GD`, // show count daily by mc
  Total_time_status_daily_GD: `api_nhtGrinding/totaltime_status_daily_GD`, // show count daily by mc
  Realtime_status_daily_GD: `api_nhtGrinding/realtime_status_mc`, // show count daily by mc
  Realtime_status_daily_GD_Table: `api_nhtGrinding/realtime_status_mc_table`, // show count daily by mc
  
  
  // By Hour
  TIMELINE_ALARMLIST_GD_HOUR: `api_nhtGrinding/Timeline_Alarmlist_GD_Hour`,
  mc_status_log_GD_HOUR: `api_nhtGrinding/GD_mms_log_hour`,
  AlarmTopic_time_GD2_HOUR: `api_nhtGrinding/AlarmTopic_time2_hour`,
  ListTopic_time_GD_HOUR: `api_nhtGrinding/GetTopic_time_hour`,
  GET_MASTER_HOUR: `api_nhtGrinding/master_hour`,
  GET_YIELD_EACH_CT: `api_nhtGrinding/get_yr_each`,

  MMS_GD_ICB:`api_nhtGrinding/mms_counter_ICB`,
  API_UPLOAD_STOCK: `api_upload_stock/upload_stock`,
  CHECK_DATE_STOCK: `api_upload_stock/check_date_stock`,
  DEL_STOCK: `api_upload_stock/delete_date_stock`,

  // NEW SERVER
  NEW_SERVER_realtime_MBRC_Ball_tb_URL: `api_nhtMBR/MBRC_Ball_tb_NEW_SERVER`,
  
};

export const key = {
  LOGIN_PASSED: "LOGIN_PASSED",
  USER_LV: "USER_LV",
  USER_NAME: "USER_NAME",
  USER_EMP: "USER_EMP",
  TIME_LOGIN: "TIME_LOGIN",
  EDITTED_USER: "USER_EMP",
};

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";
