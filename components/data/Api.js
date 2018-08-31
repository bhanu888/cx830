import {oauth, net} from 'react-native-force';
import store from 'react-native-simple-store';

const STORE_SFDC_CREDENTIALS = 'SFDCCredentials';

export const Api = {
  getSfdcCredentials: () => new Promise((res, rej) => {
    store.get(STORE_SFDC_CREDENTIALS).then(res).catch(rej);
  }),

  getAuthCredentials: () => new Promise((res, rej) => {
    oauth.getAuthCredentials(
      (credentials) => {
        store.save(STORE_SFDC_CREDENTIALS, credentials)
        res(credentials);
      },
      () => {
        Api.authenticate()
          .then(res)
          .catch(rej);
      }
    );
  }),

  authenticate: () => new Promise((res, rej) => {
    oauth.authenticate(
      (credentials) => {
        store.save(STORE_SFDC_CREDENTIALS, credentials)
        res(credentials);
      }, rej
    );
  }),

  logout: () => {
    store.delete(STORE_SFDC_CREDENTIALS);
    oauth.logout();
  },

  sfdcOpenLeads: () => new Promise((res, rej) => {
    store.get(STORE_SFDC_CREDENTIALS)
      .then((credentials) => {
        const query = 'SELECT Id, FirstName, LastName, ' +
          'mobilephone, phone, email, ' +
          'company, address, status, ' +
          'lead.owner.Id, lead.owner.firstname, lead.owner.lastname, ' +
          'productinterest__c FROM Lead ' +
          'WHERE status=\'Open - Not Contacted\'';
        net.query(query, res, rej);
      })
      .catch(rej);
  }),

  sfdcMyLeads: () => new Promise((res, rej) => {
    store.get(STORE_SFDC_CREDENTIALS)
      .then((credentials) => {
        const query = 'SELECT Id, FirstName, LastName, ' +
          'mobilephone, phone, email, ' +
          'company, address, status, ' +
          'lead.owner.Id, lead.owner.firstname, lead.owner.lastname, ' +
          'productinterest__c FROM Lead ' +
          `WHERE lead.owner.Id='${credentials.userId}' ` +
          'AND status=\'Working - Contacted\'';
        net.query(query, res, rej);
      })
      .catch(rej);
  }),

  sfdcRetrieveLead: (id) => new Promise((res, rej) => {
    store.get(STORE_SFDC_CREDENTIALS)
      .then((credentials) => {
        net.retrieve('Lead', id, null, res, rej);
      })
      .catch(rej);
  }),

  sfdcUpdateLead: (id, status, ownerId) => new Promise((res, rej) => {
    const data = {}
    if (status) data['status'] = status;
    if (ownerId) data['OwnerId'] = ownerId;
    store.get(STORE_SFDC_CREDENTIALS)
      .then((credentials) => {
        net.update('Lead', id, data, res, rej);
      })
      .catch(rej);
  }),
};
