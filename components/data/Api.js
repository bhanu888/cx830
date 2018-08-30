import {oauth, net} from 'react-native-force';
import store from 'react-native-simple-store';

const STORE_SDFC_CREDENTIALS = 'sdfcCredentials';

export const Api = {
  getAuthCredentials: () => new Promise((res, rej) => {
    oauth.getAuthCredentials(
      (credentials) => {
        store.save(STORE_SDFC_CREDENTIALS, credentials)
        res(credentials);
      },
      () => {
        authenticate()
          .then(res)
          .catch(rej);
      }
    );
  }),

  authenticate: () => new Promise((res, rej) => {
    oauth.authenticate(
      (credentials) => {
        store.save(STORE_SDFC_CREDENTIALS, credentials)
        res(credentials);
      }, rej
    );
  }),

  logout: () => {
    store.delete(STORE_SDFC_CREDENTIALS);
    oauth.logout();
  },

  sdfcOpenLeads: () => new Promise((res, rej) => {
    store.get(STORE_SDFC_CREDENTIALS)
      .then((credentials) => {
        const query = 'SELECT Id, FirstName, LastName, ' +
          'mobilephone, phone, email, ' +
          'company, address, status, ' +
          'lead.owner.firstname, lead.owner.lastname, ' +
          'productinterest__c FROM Lead ' +
          `WHERE lead.owner.Id='${credentials.userId}' ` +
          'AND status<>\'Open-Not Contacted\'';
        net.query(query, res, rej);
      })
      .catch(rej);
  })
};
