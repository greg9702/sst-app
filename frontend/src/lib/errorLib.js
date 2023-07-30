export function onError(error) {
  let message = error.toString();
  console.log(error.details);
  // Auth errors
  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }

  alert(message);
}
