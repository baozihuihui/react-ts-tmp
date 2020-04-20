if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.log("Cantnot apply HMR updtae .", err);
    }
  });
}
