export const templates = {
  workout: Handlebars.compile(
    document.querySelector('#workout-summary-template').innerHTML
  ),
};
