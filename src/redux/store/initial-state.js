export default {
  user: {
    data: null,
    authToken: null,
    sessionId: null,
    settings: null,
    activeProfile: null,
  },
  bookings: {
    data: [],
    loading: false
  },
  bookingWizard: {
    timeWanted: null,
    timeType: null,
    legitimation: null,
    pickupAddress: null,
    dropAddress: null,
    ticketType: null,
    seatingType: undefined,
    assistancePickup: undefined,
    assistanceDrop: undefined,
    coTravellers: undefined,
    equipment: undefined,
    editMode: false,
    findBooking: false,
    isReturn: false
  },
  addresses: {
    data: [],
    nearbyAddresses: [],
    prevUsedAddresses: [],
    loading: false
  },
  misc: {
    activeProfilePopupShown: false
  },
  notifications: {
    data: [],
    unreadNotificationIds: [],
    pushNotification: null,
    loading: false,
    popupOpen: false
  },
  sessions:{
    loading:false,
    error:undefined,
    devices:[]
  }
}
