/**
 * JSON API to read/write the React Native Workshop users backend.
 */

var SCRIPT_VERSION = "1.0.0";
var SHEET_ID = "1w9w6j2nRn0tuBuomkujXJyeH4a5kESOVGCa_5H6UX3Y";
var PERSONS_SHEET = "PersonsData";
var LOG_SHEET = "Logs";

var logger = null;
var doc = null;
var personsSheet = null;
var personsArray = [];


/**
 * Initialize global variables.
 */
function initVars() {
  // check that main variables are set, otherwise log an error (using the
  // standard Logger class)
  if (SHEET_ID === '' || PERSONS_SHEET === '') {
    Logger.log('main global variables not initialized');
    return false;
  }

  // obtain Spreadsheet instance
  try {
    doc = SpreadsheetApp.openById(SHEET_ID);
  }
  catch (err) {
    Logger.log('cannot open the spreadsheet with the specified id');
    return false;
  }

  // initialize BetterLog logger
  try {
    logger = BetterLog.useSpreadsheet(SHEET_ID, LOG_SHEET);
  }
  catch (err) {
    Logger.log('cannot find BetterLog object (did you install the library?)');
    return false;
  }

  // this shouldn't happen
  if (doc === null || logger === null) {
    Logger.log('cannot initialize variables');
    return false;
  }

  // from this moment on we can use the logger object to log on the
  // users spreadsheet inside the 'Logs' sheet
  return true;
}


/**
 * Fill the global "personsSheet" variable.
 */
function findPersonsSheet() {
  var sheets = doc.getSheets();
  for (var i = 0; i < sheets.length; ++i) {
    if (sheets[i].getName() === PERSONS_SHEET) {
      personsSheet = sheets[i];
      return true;
    }
  }

  logger.log('cannot find sheet: ' + PERSONS_SHEET);
  return false;
}


/**
 * Read all persons from sheet.
 */
function readPersons() {
  personsArray = personsSheet.getSheetValues(2,1,-1,-1);
  return true;
}


/**
 * Execute get or post request.
 */
function executeRequest() {
  var ok = initVars() && findPersonsSheet() && readPersons();
  var result = ok ? personsArray : [];

  return ContentService.createTextOutput(JSON.stringify(result, null, 2))
                       .setMimeType(ContentService.MimeType.JSON);
}


/**
 * Web application POST endpoint
 */
function doPost(e) {
  return executeRequest();
}


/**
 * Web application GET endpoint.
 */
function doGet(e) {
  return executeRequest();
};
