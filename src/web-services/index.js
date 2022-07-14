import { API } from '@helpers';
// const SERVER_URL = 'http://213.222.149.124:8081';
import Config from 'react-native-config';
const SERVER_URL = Config.SERVER_URL;

export function startBankIdAuthentication(authParams) {
  return API.request({
    method: 'post',
    url: `${SERVER_URL}/alfaonline/sessions/startbankidauthentication`,
    data: authParams
  });
}

export function fetchBankIdAuthenticationResult(SessionId) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/sessions/fetchbankidauthenticationresult`,
    params: {
      SessionId
    },
    silent: true
  });
}

export function checkCustomerSession(authToken) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/sessions/checkcustomersession`,
    headers: {
      AuthToken: authToken
    }
  });
}

export function closeCustomerSession(authToken) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/sessions/closecustomersession`,
    headers: {
      AuthToken: authToken
    },
  });
}

export function getDashboardBookings(authToken) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/bookings/getdashboardbookings`,
    headers: {
      AuthToken: authToken
    }
  });
}

export function getNextJob(authToken) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/bookings/getnextjob`,
    headers: {
      AuthToken: authToken
    }
  });
}

export function getCustomerSettings(authToken) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/users/settings`,
    headers: {
      AuthToken: authToken
    }
  });
}

export function changeActiveProfile(authToken, CustomerId) {
  return API.request({
    method: 'put',
    url: `${SERVER_URL}/alfaonline/users/profile/active`,
    headers: {
      AuthToken: authToken
    },
    data: {
      CustomerId
    }
  });
}

export function getBooking(authToken, BookingId, params) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/bookings/${BookingId}`,
    headers: {
      AuthToken: authToken
    },
    params
  });
}

export function getRouteNodes(authToken, BookingId) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/bookings/${BookingId}/getroutenodes`,
    headers: {
      AuthToken: authToken
    }
  });
}

export function cancelBooking(authToken, BookingId) {
  return API.request({
    method: 'put',
    url: `${SERVER_URL}/alfaonline/bookings/${BookingId}/cancel`,
    headers: {
      AuthToken: authToken
    }
  });
}

export function getCustomerAddresses(authToken) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/users/addresses/`,
    headers: {
      AuthToken: authToken
    }
  });
}

export function searchAddresses(authToken, SearchText) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/geo/address/search/${SearchText}`,
    headers: {
      AuthToken: authToken
    }
  });
}

export function updateCustomerSettings(authToken, params) {
  return API.request({
    method: 'put',
    url: `${SERVER_URL}/alfaonline/users/settings/`,
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      AuthToken: authToken
    }
  });
}

export function createCustomerAddress(authToken, params) {
  return API.request({
    method: 'post',
    url: `${SERVER_URL}/alfaonline/users/addresses/`,
    data: params,
    headers: {
      AuthToken: authToken
    }
  });
}

export function updateCustomerAddress(authToken, params) {
  return API.request({
    method: 'put',
    url: `${SERVER_URL}/alfaonline/users/addresses/`,
    data: params,
    headers: {
      AuthToken: authToken
    }
  });
}

export function getCallCenterInfo(authToken) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/misc/getcallcenterinfo`,
    headers: {
      AuthToken: authToken
    }
  });
}

export function updateProfile(authToken, params) {
  return API.request({
    method: 'put',
    url: `${SERVER_URL}/alfaonline/users/profile`,
    data: params,
    headers: {
      AuthToken: authToken
    }
  });
}

export function getActiveProfile(authToken) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/users/profile/active`,
    headers: {
      AuthToken: authToken
    }
  });
}

export function getClosestAddresses(authToken, GeoLocation) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/geo/address/closest`,
    headers: {
      AuthToken: authToken
    },
    params: GeoLocation
  });
}

export function getSuitableLegitimation(authToken, queryParams) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/bookings/wizard/getsuitablelegitimation`,
    headers: {
      AuthToken: authToken
    },
    params: queryParams
  });
}

export function getBookingSolution(authToken, params) {
  return API.request({
    method: 'post',
    url: `${SERVER_URL}/alfaonline/bookings/wizard/getbookingsolution`,
    headers: {
      AuthToken: authToken
    },
    data: params
  });
}

export function confirmBooking(authToken, params) {
  return API.request({
    method: 'post',
    url: `${SERVER_URL}/alfaonline/bookings/wizard/confirmbooking`,
    headers: {
      AuthToken: authToken
    },
    data: params
  });
}

export function updatePushNotificationToken(authToken, params) {
  return API.request({
    method: 'put',
    url: `${SERVER_URL}/alfaonline/users/pushtoken/`,
    data: params,
    headers: {
      AuthToken: authToken
    }
  });
}

export function sendTextMessage(authToken, params) {
  return API.request({
    method: 'put',
    url: `${SERVER_URL}/alfaonline/debug/sendtextmessage`,
    data: params,
    headers: {
      AuthToken: authToken
    }
  });
}

export function getNextInvoice(authToken) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/economy/nextinvoice`,
    headers: {
      AuthToken: authToken
    }
  });
}

export function getActorNotifications(authToken) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/notifications/`,
    headers: {
      AuthToken: authToken
    }
  });
}

export function sendNotification(authToken, params) {
  return API.request({
    method: 'post',
    url: `${SERVER_URL}/alfaonline/debug/sendtextmessage`,
    headers: {
      AuthToken: authToken
    },
    data: params
  });
}

export function markNotificationsRead(authToken, params) {
  return API.request({
    method: 'put',
    url: `${SERVER_URL}/alfaonline/notifications/`,
    headers: {
      AuthToken: authToken
    },
    data: params
  });
}

export function getVehiclePosition(authToken, BookingId) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/bookings/${BookingId}/vehiclelocation`,
    headers: {
      AuthToken: authToken
    },
    silent: true
  });
}

export function getDevices(authToken) {
  return API.request({
    method: 'get',
    url: `${SERVER_URL}/alfaonline/sessions`,
    headers: {
      AuthToken: authToken
    }
  });
}
export function deleteDevice(authToken,device) {
  return API.request({
    method: 'delete',
    url: `${SERVER_URL}/alfaonline/sessions/closecustomersession?DeviceUuid=${device}`,
    headers: {
      AuthToken: authToken,
    }
  });
}
