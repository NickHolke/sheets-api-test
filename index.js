const {google} = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
  keys.client_email, 
  null, 
  keys.private_key, 
  ['https://www.googleapis.com/auth/spreadsheets'],
);

client.authorize()
.then((tokens) => {
  gsrun(client);
})
.catch((err) => console.log(err));

async function gsrun(cl) {
  const gsapi = google.sheets({version: 'v4', auth: cl});

  const request = {
    // The ID of the spreadsheet to update.
    spreadsheetId: '1shKZoN1BPjwVcYcmXV7lmGtXLEzCvjWw7Uqb6Ak_ND0',  // TODO: Update placeholder value.

    // The A1 notation of a range to search for a logical table of data.
    // Values are appended after the last row of the table.
    range: 'Data!A1',  

    // How the input data should be interpreted.
    valueInputOption: 'USER_ENTERED', 

    resource: {
      majorDimension: 'ROWS',
      values: [['1', 'Nick', 'Holke'],['2', 'Jake', 'Holke']],
    },

    auth: authClient
  };

  const response = await gsapi.spreadsheets.values.append(request);
  console.log(response);
}