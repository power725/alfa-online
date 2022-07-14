export function getBookingParams(bookingWizard) {
  const {
    legitimation,
    timeWanted,
    timeType,
    pickupAddress,
    dropAddress,
    ticketType,
    seatingType,
    assistancePickup,
    assistanceDrop,
    coTravellers,
    equipment
  } = bookingWizard;
  const coTravellersParams = {}, luggageParams = {};

  if (coTravellers) {
    coTravellers.forEach((value, key) => {
      if (value > 0)
        coTravellersParams[key] = value;
    })
  }

  if (equipment) {
    equipment.forEach((value, key) => {
      if (value > 0)
        luggageParams[key] = value;
    })
  }

  const bookingRequestParams = {
    TimeType: timeType,
    LegId: legitimation ? legitimation.LegitimationId : null,
    RoutineId: legitimation ? legitimation.Routine.RoutineId : null,
    AddressFrom: pickupAddress ? (pickupAddress.Address ? pickupAddress.Address.Id : pickupAddress.Id) : null,
    AddressTo: dropAddress ? (dropAddress.Address ? dropAddress.Address.Id : dropAddress.Id) : null,
    TicketType: 'Single',
    SeatingType: seatingType ? seatingType.Id : 0,
    AssistancePickup: assistancePickup ? assistancePickup.Id : 0,
    AssistanceDrop: assistanceDrop ? assistanceDrop.Id : 0,
  };

  if (timeType !== 'DepartureEarliest')
    bookingRequestParams['TimeWanted'] = timeWanted;

  if (coTravellers)
    bookingRequestParams['CoTravellers'] = coTravellersParams;

  if (equipment)
    bookingRequestParams['Equipment'] = luggageParams;

  return bookingRequestParams;
}
